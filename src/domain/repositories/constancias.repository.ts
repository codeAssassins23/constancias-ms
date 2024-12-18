import { ConfiguracionMensajeM } from "../entities/configuracionMensaje";
import { ConfiguracionTramiteConstanciasM } from "../entities/configuracionTramiteConstancias";
import { PayM } from "../entities/pay";
import { ProcedureM } from "../entities/procedure";
import { StepM } from "../entities/step";

export interface ConstanciasRepository {
  findInformationCertificate: (procedureCode: number, campusPS: string, emplId: string, isGraduate: string) => Promise<ProcedureM>;
  findMontoCC: (itemNbr: string) => Promise<PayM>;
  findSteps: (typeProcedure: number) => Promise<StepM[]>;
  findConfiguracionTramite: (procedureCode: number) => Promise<ConfiguracionTramiteConstanciasM[]>;
  findConfiguracionMensajes: (procedureCode: number) => Promise<ConfiguracionMensajeM[]>
}
