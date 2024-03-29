import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dtos';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  getEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    return this.repo
    .createQueryBuilder()
    .select('AVG(price)', 'price')
    .where('make = :make', { make })
    .andWhere('model = :model', { model })
    .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
    .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
    .andWhere('year - :year BETWEEN -3 AND 3', { year })
    .orderBy('ABS(mileage - :mileage)', 'DESC')
    .setParameters({ mileage })
    .limit(3)
    .getRawOne();
  }

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  async reportStatus(id: string, approved: boolean) {
    let report = await this.repo.findOne(id);
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    report.approved = approved;
    return this.repo.save(report);
  }
}
