import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CvEntity } from './entities/cv.entity';
import { AddcvDto } from './dtos/addcv.dto';
import { UpdatecvDto } from './dtos/updatecv.dto';
import { Delete } from '@nestjs/common/decorators';

@Controller('cv')
export class CvController {
  constructor(private cvService: CvService) {}

  @Get()
  async getAllCvs(): Promise<CvEntity[]> {
    return await this.cvService.getCvs();
  }

  @Get(':id')
  async getCvById(@Param('id', ParseIntPipe) id: number) {
    return await this.cvService.findCvById(id);
  }

  @Get('restore/:id')
  async restore(@Param('id', ParseIntPipe) id: number) {
    return await this.cvService.restoreCv(id);
  }

  @Post()
  async addCV(@Body() newCV: AddcvDto): Promise<CvEntity> {
    return await this.cvService.addCv(newCV);
  }

  @Patch(':id')
  async updateCV(
    @Body() cv: UpdatecvDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CvEntity> {
    return await this.cvService.updateCv(id, cv);
  }

  @Patch(':id')
  async updateCV2(@Body() updatedObject) {
    const { updateCriteria, cv } = updatedObject;
    return await this.cvService.updateCv2(updateCriteria, cv);
  }

  @Delete(':id')
  async deleteCv(@Param('id', ParseIntPipe) id: number) {
    return await this.cvService.deleteCv(id);
  }

  @Delete('soft/:id')
  async softDelete(@Param('id', ParseIntPipe) id: number) {
    return await this.cvService.softDeleteCv(id);
  }
}
