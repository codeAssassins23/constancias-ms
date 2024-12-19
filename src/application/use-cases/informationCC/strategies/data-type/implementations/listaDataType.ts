import { ConfiguracionTramiteConstanciasM } from "src/domain/entities/configuracionTramiteConstancias";
import { IDataType } from "../interface/iDataType";
import { ColumnsType } from "../../../types/columns.type";
import { stateValidationDto } from "../../../dto/stateValidation.dto";
import { ConfiguracionMensajeM } from "src/domain/entities/configuracionMensaje";
import { InformationParameterDto } from "../../../dto/informationParameter.dto";

export class ListaDataType implements IDataType {
  async addValueToColumn(_information: InformationParameterDto, configuration: ConfiguracionTramiteConstanciasM, _messages: ConfiguracionMensajeM[], _state: stateValidationDto, columns: ColumnsType): Promise<void> {
    columns[configuration.nombreParametro] = configuration.valor.split('|');
  }
}