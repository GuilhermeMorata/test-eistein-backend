import { Controller } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('rest/report')
export class ReportController {

  constructor(private service: ReportService) { }

}
