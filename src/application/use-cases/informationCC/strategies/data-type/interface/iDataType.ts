import { ConfiguracionTramiteConstanciasM } from "src/domain/entities/configuracionTramiteConstancias";
import { ColumnsType } from "../../../types/columns.type";
import { stateValidationDto } from "../../../dto/stateValidation.dto";
import { ConfiguracionMensajeM } from "src/domain/entities/configuracionMensaje";
import { InformationParameterDto } from "../../../dto/informationParameter.dto";

export interface IDataType {
  addValueToColumn: (information: InformationParameterDto, configuration: ConfiguracionTramiteConstanciasM, messages: ConfiguracionMensajeM[], state: stateValidationDto, columns: ColumnsType) => Promise<void>;
}