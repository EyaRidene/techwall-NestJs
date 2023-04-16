import { Injectable, NotFoundException } from '@nestjs/common';
import { CvEntity } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddcvDto } from './dtos/addcv.dto';
import { UpdatecvDto } from './dtos/updatecv.dto';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private cvRepository: Repository<CvEntity>,
  ) {}

  async findCvById(id: number) {
    const cvToRemove = await this.cvRepository.findBy({ id: id });
    if (!cvToRemove) {
      throw new NotFoundException(`Le cv d id ${id} n existe pas`);
    }
    return cvToRemove;
  }
  async getCvs(): Promise<CvEntity[]> {
    return await this.cvRepository.find();
  }

  async addCv(cv: AddcvDto): Promise<CvEntity> {
    return await this.cvRepository.save(cv);
  }

  async updateCv(id: number, cv: UpdatecvDto): Promise<CvEntity> {
    //Récupérer le cv d'id id et ensuite on remplace les anciennes valeurs de ce cv par ceux du cv passé en paramètre
    const newCv = await this.cvRepository.preload({
      id,
      ...cv,
    });
    //tester le cas ou le cv id n'existe pas
    if (!newCv) {
      throw new NotFoundException(`Le cv d id ${id} n existe pas`);
    }
    //sauvegarder la nouvelle entité donc ce nouveau cv
    return await this.cvRepository.save(newCv);
  }

  //modifier un ensemble d'elements selectionnés d après des critères
  async updateCv2(updateCriteria, cv: UpdatecvDto) {
    return await this.cvRepository.update(updateCriteria, cv);
  }

  // En utilisant le REMOVE :
  async removeCv(id: number) {
    const cvToRemove = await this.findCvById(id);
    return await this.cvRepository.remove(cvToRemove);
  }

  async softRemoveCv(id: number) {
    const cvToRemove = await this.findCvById(id);
    return await this.cvRepository.softRemove(cvToRemove);
  }
  async recoverCv(id: number) {
    const cvToRemove = await this.findCvById(id);
    return await this.cvRepository.recover(cvToRemove);
  }

  // En utilisant le DELETE :
  async deleteCv(id: number) {
    return await this.cvRepository.delete(id);
    //return await this.cvRepository.delete({name:'eya'}); pour supprimer les cvs ou le nom est eya
    //return await this.cvRepository.delete([4,5,6]); pour supprimer les cvs d'ids 4 5 et 6
    //le resultat de retour est un ensemble de stat le champ 'affected' nous renseigne sur le nombre de ligne supprimées
  }

  async softDeleteCv(id: number) {
    return await this.cvRepository.softDelete(id);
  }

  async restoreCv(id: number) {
    return await this.cvRepository.restore(id);
  }
}
