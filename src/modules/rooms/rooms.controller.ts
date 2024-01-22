import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateReservationDto } from '../reservations/dto/create-reservation.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get('available-rooms')
  findAllRoomsAvailable(
    @Query('adults') adults: number,
    @Query('children') children: number,
    @Query('initialDate') initialDate: string,
  ) {
    const data: CreateReservationDto = {
      userId: 'userId',
      roomId: 'roomId',
      promotionId: 'promotionId',
      initialDate: new Date(initialDate),
      endDate: new Date(),
      adults: adults,
      children: children,
      totalValue: 0,
    };

    return this.roomsService.findAllRoomsAvailable(
      data,
      data.adults,
      data.children,
    );
  }

  @Get()
  findAll(@Query('group') group: string | undefined) {
    return this.roomsService.findAll(group);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
