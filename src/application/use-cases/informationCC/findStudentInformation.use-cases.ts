import { ConstanciasRepository } from 'src/domain/repositories/constancias.repository';
import { StudentInformationDto } from './dto/studentInformation.dto';
import { InformationParameterDto } from './dto/informationParameter.dto';
import { ColumnsType } from './types/columns.type';
import { DataTypeSelector } from './strategies/data-type/dataTypeSelector';
import { stateValidationDto } from './dto/stateValidation.dto';

export class FindStudentInformationUseCases {
  constructor(
    private readonly contanciasRepository: ConstanciasRepository,
  ) {}

  // Main Method
  async execute(information: InformationParameterDto) {
    const procedure =
      await this.contanciasRepository.findInformationCertificate(
        information.procedureCode,
        information.campusPS,
        information.emplId,
        information.isGraduate,
      );

    const pay = await this.contanciasRepository.findMontoCC(procedure.itemNBR);
    const columns = await this.validateProcedure(information);
    const steps = await this.contanciasRepository.findSteps(procedure.typeProcedure);

    const studentInformationDto: StudentInformationDto = {
      name: procedure.procedureName,
      amount: pay.amountProgrammed,
      current: 0,
      columns: columns,
      steps: steps,
    }

    return studentInformationDto;
  }

  // Auxiliar Methods
  private async validateProcedure(information: InformationParameterDto): Promise<ColumnsType> {
    const dataTypeSelector = DataTypeSelector.getInstance();

    let columns: ColumnsType = {};
    const configuracionTramites = await this.contanciasRepository.findConfiguracionTramite(information.procedureCode);
    const configuracionMensajes = await this.contanciasRepository.findConfiguracionMensajes(information.procedureCode);

    const stateValidation: stateValidationDto = {
      error: true,
      esMatriculado: true,
      habilitado: true,
      reshabil: false,
    };

    if (!Array.isArray(configuracionTramites)) return null;

    configuracionTramites.forEach((configuracionTramite) => {
      dataTypeSelector.parseDataType(
        information,
        configuracionTramite,
        configuracionMensajes,
        stateValidation,
        columns
      );

      if (stateValidation.reshabil)
        columns['Habilitado'] = stateValidation.habilitado;

      if (Object.keys(columns).length === 0)
        columns = null;
    });

    return columns;
  }
}
