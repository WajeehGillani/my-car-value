import {
  Body,
  Controller,
  Post,
  UseGuards,
  Param,
  Patch,
} from '@nestjs/common';
import { Serialize } from 'src/Interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { AuthGuard } from 'src/users/guards/auth.guards';
import { User } from 'src/users/user.entity';
import { ApproveReportDto } from './dtos/approveReportDto';
import { CreateReportDto } from './dtos/create-report.dtos';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReports(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }

  @Patch('/:id')
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportService.reportStatus(id, body.approved);
  }
}
