import { ConfiguracionTramiteConstanciasM } from "src/domain/entities/configuracionTramiteConstancias";
import { IRestriction } from "./interface/iRestriction";
import { ConfiguracionMensajeM } from "src/domain/entities/configuracionMensaje";
import { stateValidationDto } from "../../dto/stateValidation.dto";
import { ColumnsType } from "../../types/columns.type";
import { InformationParameterDto } from "../../dto/informationParameter.dto";

type RestrictionMap = Map<string, IRestriction>;
export class RestrictionSelector {
  private static restrictionMap: RestrictionMap;
  private static instance: RestrictionSelector;

  private constructor() {
    this.setupRestrictionMap();
  }

  public static getInstance(): RestrictionSelector {
    if (!RestrictionSelector.instance) {
      RestrictionSelector.instance = new RestrictionSelector();
    }
    return RestrictionSelector.instance;
  }

  private setupRestrictionMap(): void {
    if (RestrictionSelector.restrictionMap) return;
    // Configuracion del mapeo
    RestrictionSelector.restrictionMap = new Map([
    ]);
  }

  async parseRestriction(
      information: InformationParameterDto,
      configuration: ConfiguracionTramiteConstanciasM,
      messages: ConfiguracionMensajeM[],
      state: stateValidationDto,
      columns: ColumnsType
    ): Promise<void> {
      await RestrictionSelector.restrictionMap
        .get(configuration.nombreParametro)
        .applyRestriction(information, configuration, messages, state, columns);
    }
}