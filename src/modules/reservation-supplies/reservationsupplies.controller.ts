import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateReservationSupplyDto } from './dto/create-reservationsupply.dto';
import { ReservationsSuppliesService } from './reservationsupplies.service';
import { UpdateReservationSupplyDto } from './dto/update-reservationsupply.dto';

@Controller('reservations-supplies')
export class ReservationsSuppliesController {
  constructor(
    private readonly reservationsSuppliesService: ReservationsSuppliesService,
  ) {}

  @Post()
  create(@Body() createReservationSupplyDto: CreateReservationSupplyDto) {
    return this.reservationsSuppliesService.create(createReservationSupplyDto);
  }

  @Get()
  findAll() {
    return this.reservationsSuppliesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsSuppliesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationSupplyDto: UpdateReservationSupplyDto,
  ) {
    return this.reservationsSuppliesService.update(
      id,
      updateReservationSupplyDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsSuppliesService.remove(id);
  }
}
