import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({
        description: 'Category name',
        example: 'Electronics'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({
        description: 'Parent category ID, if this category is a subcategory',
        example: 1
    })
    @IsNumber()
    @IsOptional()
    parent_id?: number;
}
