import { Injectable } from '@nestjs/common';
import { CvEntity } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private csRepository: Repository<CvEntity>,
  ) {}

  async getCvs(): Promise<CvEntity[]> {
    return await this.csRepository.find();
  }
}
