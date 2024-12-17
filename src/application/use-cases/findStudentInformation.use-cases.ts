import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ConstanciasRepository } from "src/domain/repositories/constancias.repository";
import { LoggerService } from "src/infrastructure/config/logger/logger.service";
import { StudentInformationDto } from "../dto/studentInformation.dto";

export class FindStudentInformationUseCases {
  constructor(
    private readonly contanciasRepository: ConstanciasRepository,
    private readonly logger: LoggerService
  ) {}

  // Main Method
  async execute(
    procedureCode: number,
    campusPS: string,
    emplId: string,
    isGraduate: string
  ) {
    try {
      this.logger.log('FindStudentInformationUseCases', 'finding student information');
      const procedure = await this.contanciasRepository.findInformationCertificate(
        procedureCode,
        campusPS,
        emplId,
        isGraduate
      );

      const pay = await this.contanciasRepository.findMontoCC(procedure.itemNBR);
      
      const columns = await this.validateProcedure(
        procedureCode,
        campusPS,
        emplId,
        isGraduate
      );

      const steps = await this.contanciasRepository.findSteps(procedure.typeProcedure);
      this.logger.log('FindStudentInformationUseCases', 'student information found');

      // Adding student information to DTO
      const studentInformationDto = new StudentInformationDto();
      studentInformationDto.name = procedure.procedureName;
      studentInformationDto.amount = pay.amountProgrammed;
      studentInformationDto.current = 0;
      studentInformationDto.columns = columns;
      studentInformationDto.steps = steps;
      return studentInformationDto;
    } catch (error) {
      if (error.status) {
        throw new RpcException({
          status: error.status,
          message: error.message,
        });
      } else {
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
        });
      }
    }
  }

  // Auxiliar Methods
  private async validateProcedure(
    procedureCode: number,
    campusPS: string,
    emplId: string,
    isGraduate: string
  ): Promise<object> {
    return {}
  }
}