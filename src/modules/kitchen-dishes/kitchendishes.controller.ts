import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { KitchenDishesService } from './kitchendishes.service';
import { CreateKitchenDishDto } from './dto/create-kitchendish.dto';
import { UpdateKitchenDishDto } from './dto/update-kitchendish.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthKitchenGuard } from '../auth/jwt-authKitchen.guard';

@Controller('kitchen-dishes')
export class KitchenDishesController {
  constructor(private readonly kitchenDishesService: KitchenDishesService) {}

  @Post('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthKitchenGuard)
  create(@Body() createKitchenDishDto: CreateKitchenDishDto) {
    return this.kitchenDishesService.create(createKitchenDishDto);
  }
  @Get()
  findAll() {
    return this.kitchenDishesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kitchenDishesService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthKitchenGuard)
  update(
    @Param('id') id: string,
    @Body() updateKitchenDishDto: UpdateKitchenDishDto,
  ) {
    return this.kitchenDishesService.update(id, updateKitchenDishDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthKitchenGuard)
  remove(@Param('id') id: string) {
    return this.kitchenDishesService.remove(id);
  }
}
