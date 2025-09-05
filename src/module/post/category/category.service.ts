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
  ) {}

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

    // 1. Name uniqueness tekshirish
    if (name) {
      const existName = await this.categoryModel.findOne({ where: { name } });
      if (existName && existName.id !== id) {
        throw new ConflictException(
          `Category with name "${name}" already exists`,
        );
      }
    }

    // 2. Parent category tekshirish
    let parentCategory: Category | undefined = undefined;
    if (parent_id) {
      const existParent = await this.categoryModel.findOne({
        where: { id: parent_id },
      });
      if (!existParent) {
        throw new NotFoundException(
          `Parent category with id ${parent_id} not found`,
        );
      }
      parentCategory = existParent;
    }

    // 3. preload + save ishlatamiz (relationlar bilan ishlaydi)
    const categoryToUpdate = await this.categoryModel.preload({
      id,
      ...updateDto,
      parent: parentCategory,
    });

    if (!categoryToUpdate) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    const updatedCategory = await this.categoryModel.save(categoryToUpdate);

    return successRes(updatedCategory);
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
