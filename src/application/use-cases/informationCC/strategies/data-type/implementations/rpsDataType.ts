import { ConfiguracionTramiteConstanciasM } from "src/domain/entities/configuracionTramiteConstancias";
import { IDataType } from "../interface/iDataType";
import { ColumnsType } from "../../../types/columns.type";
import { stateValidationDto } from "../../../dto/stateValidation.dto";
import { ConfiguracionMensajeM } from "src/domain/entities/configuracionMensaje";
import { RestrictionSelector } from "../../restriction/restrictionSelector";
import { InformationParameterDto } from "../../../dto/informationParameter.dto";

// Por Terminar
export class RpsDataType implements IDataType {
  async addValueToColumn(information: InformationParameterDto, configuration: ConfiguracionTramiteConstanciasM, messages: ConfiguracionMensajeM[], state: stateValidationDto, columns: ColumnsType): Promise<void> {
    const restrictionSelector = RestrictionSelector.getInstance();
    if (state.error) return;
    restrictionSelector.parseRestriction(information, configuration, messages, state, columns);
  }
}