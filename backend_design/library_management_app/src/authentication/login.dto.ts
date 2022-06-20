import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

class LogInDtO {
  @IsString()
  @IsEmail()
  public email!: string;

  @IsString()
  @MinLength(6, { message: "Password is too short" })
  @MaxLength(15, { message: "Password is too long" })
  public password!: string;
}

export default LogInDtO;
