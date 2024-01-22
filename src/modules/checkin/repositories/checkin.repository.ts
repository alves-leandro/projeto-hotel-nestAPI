import { CreateCheckinDto } from '../dto/create-checkin.dto';
import { UpdateCheckinDto } from '../dto/update-checkin.dto';
import { Checkin } from '../entities/checkin.entity';

export abstract class CheckinRepository {
  abstract create(data: CreateCheckinDto): Promise<Checkin> | Checkin;
  abstract findAll(): Promise<Checkin[]> | object;
  abstract findOne(id: string): Promise<Checkin> | Checkin;
  abstract update(
    id: string,
    data: UpdateCheckinDto,
  ): Promise<Checkin> | Checkin;
  abstract delete(id: string): Promise<void> | void;
}
