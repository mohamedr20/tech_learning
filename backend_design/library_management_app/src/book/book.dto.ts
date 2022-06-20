import {
  IsString,
  IsDateString,
  IsOptional,
  IsNotEmpty,
  IsBoolean
} from "class-validator";

class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  public title!: string;

  @IsString()
  @IsNotEmpty()
  public description!: string;

  @IsDateString()
  @IsNotEmpty()
  public publication_date!: string;

  @IsString()
  @IsNotEmpty()
  public isbn!: string;

  @IsBoolean()
  @IsOptional()
  public is_best_seller?: boolean;

  @IsOptional()
  @IsBoolean()
  public is_reference?: boolean;
}

export default CreateBookDto;
