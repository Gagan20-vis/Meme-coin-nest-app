import { Module } from '@nestjs/common';
import { TradeController } from './trade.controller';
import { TradeService } from './trade.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
    controllers: [TradeController],
    providers: [TradeService, PrismaService],
})
export class TradeModule {}
