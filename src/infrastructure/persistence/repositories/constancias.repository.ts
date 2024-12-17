import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayM } from 'src/domain/entities/pay';
import { ProcedureM } from 'src/domain/entities/procedure';
import { StepM } from 'src/domain/entities/step';
import { ConstanciasRepository } from 'src/domain/repositories/constancias.repository';
import { Tramite } from '../entities/tramite.entity';
import { Repository } from 'typeorm';
import { Cuentatramite } from '../entities/cuentaTramite.entity';
import { SolicitudActualizacion } from '../entities/solicituActualización.entity';
import { EstadosCons } from '../entities/estadosCons.entity';

export class DataBaseConstanciasRepository implements ConstanciasRepository {
  constructor(
    @InjectRepository(Tramite)
    private readonly tramiteRepository: Repository<Tramite>,
    @InjectRepository(Cuentatramite)
    private readonly cuentaTramiteRepository: Repository<Cuentatramite>,
    @InjectRepository(SolicitudActualizacion)
    private readonly solicitudActualizacion: Repository<SolicitudActualizacion>
  ) {}

  async findInformationCertificate(procedureCode: number, campusPS: string, emplId: string, _isGraduate: string): Promise<ProcedureM> {
    try {
      const tramite = await this.tramiteRepository.findOne({ where: { Codigo: procedureCode }});
      const cuentaTramite = await this.cuentaTramiteRepository.findOne({ where: { CodigoTramite: procedureCode, Campus: campusPS }});

      const tramiteM = new ProcedureM();
      tramiteM.typeProcedureId = tramite.Codigo;
      tramiteM.procedureName = tramite.DescripcionCorta;
      tramiteM.typeProcedure = tramite.tipoTramite;
      tramiteM.itemNBR = cuentaTramite.Item ?? undefined;

      tramiteM.idSolicitud = await this.solicitudActualizacion
      .createQueryBuilder("solicitud")
      .innerJoin("solicitud.EstadosCons", "estados")
      .where("solicitud.idTramite = :codigoTramite", { codigoTramite: procedureCode })
      .andWhere("solicitud.emplid = :emplid", { emplid: emplId })
      .andWhere("estados.codigoEstado NOT IN (:...estadosExcluidos)", {
        estadosExcluidos: ["AF", "AN", "ANP", "FI", "NP"],
      })
      .andWhere("estados.titulo != :titulo", { titulo: "Procede" })
      .select("solicitud.idSolicitudAc", "idSolicitudAc")
      .getRawOne();

      return tramiteM;
    } catch (error) {
      throw error;
    }
  }
  findMontoCC(itemNbr: string): Promise<PayM> {
    throw new Error('Method not implemented');
  }
  findSteps(typeProcedure: number): Promise<StepM[]> {
    throw new Error('Method not implemented');
  }
}
