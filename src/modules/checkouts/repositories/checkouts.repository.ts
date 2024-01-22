import { CreateCheckoutDto } from '../dto/create-checkout.dto';
import { UpdateCheckoutDto } from '../dto/update-checkout.dto';
import { Checkout } from '../entities/checkout.entity';

export abstract class CheckoutsRepository {
  abstract create(data: CreateCheckoutDto): Promise<Checkout> | Checkout;
  abstract findAll(): Promise<Checkout[]> | object;
  abstract findOne(id: string): Promise<Checkout> | Checkout;
  abstract update(
    id: string,
    data: UpdateCheckoutDto,
  ): Promise<Checkout> | Checkout;
  abstract delete(id: string): Promise<void> | void;
}
