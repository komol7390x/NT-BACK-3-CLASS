import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { successRes } from 'src/utils/succes-res';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryModel: Repository<Category>,
  ) { }

  // ===================================== CREATE =====================================
  async create(createDto: CreateCategoryDto) {
    const { name, parent_id } = createDto;

    // Name tekshirish
    const existingCategory = await this.categoryModel.findOne({
      where: { name },
    });
    if (existingCategory) {
      throw new ConflictException(
        `Category with name "${name}" already exists`,
      );
    }

    // Parent category tekshirish
    let parent: Category | undefined = undefined;
    if (parent_id) {
      const found = await this.categoryModel.findOne({
        where: { id: parent_id },
      });
      if (!found) {
        throw new NotFoundException(
          `Parent category not found with id => ${parent_id}`,
        );
      }
      parent = found ?? undefined;
    }
    const categoryData: Partial<Category> = { name };
    if (parent) {
      categoryData.parent = parent;
    }

    const category = this.categoryModel.create(categoryData);
    const savedCategory = await this.categoryModel.save(category);

    return successRes(savedCategory, 201);
  }

  // ===================================== FIND ALL =====================================
  async findAll() {
    const result = await this.categoryModel.find({
      relations: { children: true, products: true },
    });
    return successRes(result);
  }

  // ===================================== FIND ONE =====================================
  async findOne(id: number) {
    const result = await this.categoryModel.findOne({
      where: { id },
      relations: { children: true, products: true },
    });
    if (!result) {
      throw new NotFoundException(`not found this id => ${id} on Category`);
    }
    return successRes(result);
  }
  // ===================================== UPDATE =====================================
  async update(id: number, updateDto: UpdateCategoryDto) {
    const { name, parent_id } = updateDto;
    if (name) {
      const existName = await this.categoryModel.findOne({ where: { name } });
      if (existName) {
        throw new ConflictException(`this name => ${name} already exist`);
      }
    }
    if (parent_id) {
      const existId = await this.categoryModel.findOne({
        where: { id: parent_id },
      });
      if (!existId) {
        throw new NotFoundException(
          `not found this id => ${parent_id} on Category`,
        );
      }
    }
    const update = await this.categoryModel.update(updateDto, { id });
    if (update.affected) {
      throw new NotFoundException(`not found this id => ${id} on Product`);
    }
    const result = await this.categoryModel.findOne({
      where: { id },
      relations: { parent: true, products: true },
    });
    if (!result) {
      throw new NotFoundException(`not found this id => ${id} on Product`);
    }
    return successRes(result);
  }

  // ===================================== REMOVE =====================================
  async remove(id: number) {
     const category = await this.categoryModel.findOne({
       where: { id },
       relations: ['children', 'products'],
     });

     if (!category) {
       throw new NotFoundException(`Category with id ${id} not found`);
     }
     await this.categoryModel.remove(category);

     return successRes({ message: 'Category deleted successfully' });
  }
}