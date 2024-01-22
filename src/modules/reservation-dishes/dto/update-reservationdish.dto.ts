import { PartialType } from '@nestjs/mapped-types';

import { CreateReservationDishDto } from './create-reservationdish.dto';

export class UpdateReservationDishDto extends PartialType(
  CreateReservationDishDto,
) {}
