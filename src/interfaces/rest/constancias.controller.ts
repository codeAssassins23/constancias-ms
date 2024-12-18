import { Controller, Get, Inject, Query, Req, Res } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponsePresenter } from './presenter/informationCC.presenter';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';
import { InformationCCDto } from './dto/informationCC.dto';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { FindStudentInformationUseCases } from 'src/application/use-cases/findStudentInformation.use-cases';
import { LoggerService } from 'src/infrastructure/config/logger/logger.service';

@Controller()
@ApiTags('Constancias')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ResponsePresenter)
export class ConstanciasController {
  constructor(
    @Inject(UseCasesProxyModule.FIND_STUDENT_INFORMATION)
    private readonly findStudentInformation: UseCaseProxy<FindStudentInformationUseCases>,

    private readonly loggerService: LoggerService,
  ) {}

  @Get('tramites/informationCC')
  @ApiResponseType(ResponsePresenter, true)
  async informationCertificates(
    @Query() informationCCDto: InformationCCDto,
    @Res() res: any,
    @Req() req: any,
  ) {
    const useCase = this.findStudentInformation.getInstance();
    const studentInformation = await useCase.execute(
      informationCCDto.codigoTramite,
      informationCCDto.campusPS,
      informationCCDto.emplId,
      informationCCDto.esEgresado,
    );
    this.loggerService.Response(req, res, studentInformation);
    return studentInformation;
  }
}
