import { ConfiguracionTramiteConstanciasM } from "src/domain/entities/configuracionTramiteConstancias";
import { ListaDataType } from "./implementations/listaDataType";
import { RpsDataType } from "./implementations/rpsDataType";
import { StringDataType } from "./implementations/stringDataType";
import { IDataType } from "./interface/iDataType";
import { stateValidationDto } from "../../dto/stateValidation.dto";
import { ColumnsType } from "../../types/columns.type";
import { ConfiguracionMensajeM } from "src/domain/entities/configuracionMensaje";
import { InformationParameterDto } from "../../dto/informationParameter.dto";

type DataTypeMap = Map<string, IDataType>;
export class DataTypeSelector {
  private static dataTypeMap: DataTypeMap;
  private static instance: DataTypeSelector;

  private constructor() {
    this.setupDataTypeMap();
  }

  public static getInstance(): DataTypeSelector {
    if (!DataTypeSelector.instance) {
      DataTypeSelector.instance = new DataTypeSelector();
    }
    return DataTypeSelector.instance;
  }

  private setupDataTypeMap(): void {
    if (DataTypeSelector.dataTypeMap) return;
    // Configuracion del mapeo
    DataTypeSelector.dataTypeMap = new Map([
      ['STRING', new StringDataType()],
      ['LISTA', new ListaDataType()],
      ['RPS', new RpsDataType()]
    ]);
  }

  async parseDataType(
    information: InformationParameterDto,
    configuration: ConfiguracionTramiteConstanciasM,
    messages: ConfiguracionMensajeM[],
    state: stateValidationDto,
    columns: ColumnsType
  ): Promise<void> {
    await DataTypeSelector.dataTypeMap
      .get(configuration.tipoDato.toUpperCase())
      .addValueToColumn(information, configuration, messages, state, columns);
  }
}