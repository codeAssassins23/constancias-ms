import { ConfiguracionTramiteConstanciasM } from "src/domain/entities/configuracionTramiteConstancias";
import { IRestriction } from "../interface/iRestriction";
import { ConfiguracionMensajeM } from "src/domain/entities/configuracionMensaje";
import { stateValidationDto } from "../../../dto/stateValidation.dto";
import { ColumnsType } from "../../../types/columns.type";
import { PagoPendiente } from "src/domain/entities/pagoPendiente";
import { InformationParameterDto } from "../../../dto/informationParameter.dto";

export class DeudaRestriction implements IRestriction {
  async applyRestriction(information: InformationParameterDto, configuration: ConfiguracionTramiteConstanciasM, messages: ConfiguracionMensajeM[], state: stateValidationDto, columns: ColumnsType): Promise<void> {
    const deudas: PagoPendiente[] = [/* Funcion de Obtener deuda */];
    const deudasVencidas = deudas.filter((deuda) => deuda.fechaVencimiento.getDate() < new Date().getDate());
    if (deudasVencidas.length > 0) {
      columns['error_deuda'] = {
        titulo: 'Tienes deudas pendientes',
        descripcion: 'Puedes regularizarlas en la seccion de pagos para continuar con este trámite'
      }
      state.error = false;
    }
  }
}