import { Controller, Get } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponsePresenter } from './presenter/informationCC.presenter';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';

@Controller()
@ApiTags('Constancias')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ResponsePresenter)
export class ConstanciasController {
  constructor() {}

  @Get()
  @ApiResponseType(ResponsePresenter, true)
  async method() {}
}
