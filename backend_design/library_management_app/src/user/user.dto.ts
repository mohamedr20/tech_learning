import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsPhoneNumber,
  IsDateString,
  IsNumber,
  Max,
  Min,
  IsOptional,
  IsNotEmpty
} from "class-validator";

class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @IsString()
  @MinLength(6, { message: "Password is too short" })
  @MaxLength(15, { message: "Password is too long" })
  public password?: string;

  @IsNotEmpty()
  @IsString()
  public first_name!: string;

  @IsNotEmpty()
  @IsString()
  public last_name!: string;

  @IsNotEmpty()
  @IsString()
  public username!: string;

  @IsNotEmpty()
  @IsDateString()
  public date_of_birth!: Date;

  @IsNumber()
  @Min(12)
  @Max(110)
  public age?: number;

  @IsOptional()
  @IsString()
  @IsPhoneNumber("US")
  public phone?: string;
}

export default CreateUserDto;
