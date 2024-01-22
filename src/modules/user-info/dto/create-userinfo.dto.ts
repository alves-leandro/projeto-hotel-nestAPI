import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserInfoDTO {
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsString()
  @IsNotEmpty()
  emergency_contact: string;

  @IsString()
  @IsNotEmpty()
  userId?: string;
}
