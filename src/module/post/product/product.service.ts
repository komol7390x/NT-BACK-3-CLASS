import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { successRes } from 'src/utils/succes-res';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryModel: Repository<Category>,
    @InjectRepository(Product)
    private readonly productModel: Repository<Product>,
  ) {}

  // ===================================== CREATE =====================================
  async create(createDto: CreateProductDto) {
    const { category_id, ...rest } = createDto;
    const category = await this.categoryModel.findOne({
      where: { id: category_id },
    });
    if (!category) {
      throw new NotFoundException(
        `Category not found with id => ${category_id}`,
      );
    }
    const product = this.productModel.create({
      ...rest,
      category,
    });

    const result = await this.productModel.save(product);

    return successRes(result, 201);
  }

  // ===================================== FIND ALL =====================================
  async findAll() {
    const result = await this.productModel.find({
      relations: { category: true },
    });
    return successRes(result);
  }

  // ===================================== FIND ONE =====================================
  async findOne(id: number) {
    const result = await this.productModel.findOne({
      where: { id },
      relations: { category: true },
    });
    if (!result) {
      throw new NotFoundException(`not found this id => ${id} on Product`);
    }
    return successRes(result);
  }
  // ===================================== UPDATE =====================================
  async update(id: number, updateDto: UpdateProductDto) {
    const { category_id } = updateDto;

    if (category_id) {
      const exist = await this.categoryModel.findOne({
        where: { id: category_id },
      });
      if (!exist) {
        throw new NotFoundException(
          `not found this id => ${category_id} on Category`,
        );
      }
    }

    const update = await this.categoryModel.update(updateDto, { id });
    if (update.affected) {
      throw new NotFoundException(`not found this id => ${id} on Product`);
    }

    const result = await this.categoryModel.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException(`not found this id => ${id} on Product`);
    }

    return successRes(result);
  }

  // ===================================== REMOVE =====================================
  async remove(id: number) {
    const result = await this.productModel.delete({ id });
    if (result.affected) {
      throw new NotFoundException(`not found this id => ${id} on Product`);
    }
    successRes(result);
  }
}
