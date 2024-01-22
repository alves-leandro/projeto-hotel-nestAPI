import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReservationsDishesService } from './reservationdishes.service';
import { UpdateReservationDishDto } from './dto/update-reservationdish.dto';
import { CreateReservationDishDto } from './dto/create-reservationdish.dto';

@Controller('reservations-dishes')
export class ReservationsDishesController {
  constructor(
    private readonly reservationsDishesService: ReservationsDishesService,
  ) {}

  @Post()
  create(@Body() createReservationDishDto: CreateReservationDishDto) {
    return this.reservationsDishesService.create(createReservationDishDto);
  }

  @Get()
  findAll() {
    return this.reservationsDishesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsDishesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDishDto: UpdateReservationDishDto,
  ) {
    return this.reservationsDishesService.update(id, updateReservationDishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsDishesService.remove(id);
  }
}
