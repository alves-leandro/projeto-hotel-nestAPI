import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { UserInfoModule } from './modules/user-info/user-info.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { PromotionsModule } from './modules/promotions/promotions.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { CheckinModule } from './modules/checkin/checkin.module';
import { CheckoutsModule } from './modules/checkouts/checkouts.module';
import { AuthModule } from './modules/auth/auth.module';
import { SuppliesModule } from './modules/supplies/supplies.module';
import { KitchenDishesModule } from './modules/kitchen-dishes/kitchendishes.module';
import { ReservationsSuppliesModule } from './modules/reservation-supplies/reservationsupplies.module';
import { ReservationsDishesModule } from './modules/reservation-dishes/reservationdishes.module';

@Module({
  imports: [
    UsersModule,
    UserInfoModule,
    RoomsModule,
    AuthModule,
    ReservationsModule,
    PromotionsModule,
    TransactionsModule,
    CheckinModule,
    CheckoutsModule,
    SuppliesModule,
    KitchenDishesModule,
    ReservationsSuppliesModule,
    ReservationsDishesModule,
  ],
})
export class AppModule {}
