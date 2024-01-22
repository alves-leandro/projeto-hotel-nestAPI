import { PartialType } from '@nestjs/mapped-types';
import { CreateKitchenDishDto } from './create-kitchendish.dto';

export class UpdateKitchenDishDto extends PartialType(CreateKitchenDishDto) {}
