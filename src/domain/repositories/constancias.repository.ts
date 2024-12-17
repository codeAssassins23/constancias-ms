import { PayM } from "../entities/pay";
import { ProcedureM } from "../entities/procedure";
import { ProcedureAccountM } from "../entities/procedureAccount";
import { StepM } from "../entities/step";

export interface ConstanciasRepository {
  findInformationCertificate: (procedureCode: number, campusPS: string, emplId: string, isGraduate: string) => Promise<ProcedureM>;
  findMontoCC: (itemNbr: string) => Promise<PayM>;
  findSteps: (typeProcedure: number) => Promise<StepM[]>;
}
