import { ConfiguracionMensajeM } from "src/domain/entities/configuracionMensaje";
import { ConfiguracionTramiteConstanciasM } from "src/domain/entities/configuracionTramiteConstancias";
import { stateValidationDto } from "../../../dto/stateValidation.dto";
import { ColumnsType } from "../../../types/columns.type";
import { InformationParameterDto } from "../../../dto/informationParameter.dto";

export interface IRestriction {
  applyRestriction: (information: InformationParameterDto, configuration: ConfiguracionTramiteConstanciasM, messages: ConfiguracionMensajeM[], state: stateValidationDto, columns: ColumnsType) => Promise<void>;
}