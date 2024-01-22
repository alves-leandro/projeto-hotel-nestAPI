import { PartialType } from '@nestjs/mapped-types';

import { CreateReservationSupplyDto } from './create-reservationsupply.dto';

export class UpdateReservationSupplyDto extends PartialType(
  CreateReservationSupplyDto,
) {}
