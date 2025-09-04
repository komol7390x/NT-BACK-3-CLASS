import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { successRes } from 'src/utils/succes-res';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly categoryModel: Repository<Category>) { }

  // ===================================== CREATE =====================================
  async create(createDto: CreateCategoryDto) {
    const { name, parent_id } = createDto
    const existName = await this.categoryModel.findOne({ where: { name } })
    if (existName) {
      throw new ConflictException(`this name => ${name} already exist`)
    }
    const existId = await this.categoryModel.findOne({ where: { parent_id } })
    if (!existId) {
      throw new NotFoundException(`not found this id => ${parent_id} on Category`)
    }
    const result = await this.categoryModel.save(createDto)
    return successRes(result, 201)
  }

  // ===================================== FIND ALL =====================================
  async findAll() {
    const result = await this.categoryModel.find()
    return successRes(result)
  }

  // ===================================== FIND ONE =====================================
  async findOne(id: number) {
    const result = await this.categoryModel.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`not found this id => ${id} on Category`)
    }
    return successRes(result)
  }
  // ===================================== UPDATE =====================================
  async update(id: number, updateDto: UpdateCategoryDto) {
    const { name, parent_id } = updateDto
    if (name) {
      const existName = await this.categoryModel.findOne({ where: { name } })
      if (existName) {
        throw new ConflictException(`this name => ${name} already exist`)
      }
    }
    if (parent_id) {
      const existId = await this.categoryModel.findOne({ where: { parent_id } })
      if (!existId) {
        throw new NotFoundException(`not found this id => ${parent_id} on Category`)
      }
    }
    const update=await this.categoryModel.update(updateDto,{id})
    if(update.affected){
      throw new NotFoundException(`not found this id => ${id} on Product`)
    }
    const result = await this.categoryModel.findOne({ where: { id } })
    if(!result){
      throw new NotFoundException(`not found this id => ${id} on Product`)
    }
    return successRes(result)
  }

    // ===================================== REMOVE =====================================
  async remove(id: number) {
    const result=await this.categoryModel.delete({id})
    if(result.affected){
      throw new NotFoundException(`not found this id => ${id} on Category`)
    }
    successRes(result)
  }
}
