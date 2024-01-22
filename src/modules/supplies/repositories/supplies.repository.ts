import { CreateSupplyDto } from '../dto/create-supply.dto';
import { UpdateSupplyDto } from '../dto/update-supply.dto';
import { Supply } from '../entities/supply.entity';

export abstract class SuppliesRepository {
  abstract create(data: CreateSupplyDto): Promise<Supply> | Supply;
  abstract findAll(): Promise<Supply[]> | Supply[];
  abstract findOne(id: string): Promise<Supply> | Supply;
  abstract update(id: string, data: UpdateSupplyDto): Promise<Supply> | Supply;
  abstract delete(id: string): Promise<void> | void;
}
