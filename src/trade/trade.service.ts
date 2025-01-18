import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TradeService {
    constructor(private readonly prisma: PrismaService) {}

    async createTrade(data: Prisma.TradeCreateInput) {
        return this.prisma.trade.create({ data });
    }

    async getTrades(filter: Prisma.TradeFindManyArgs) {
        return this.prisma.trade.findMany(filter);
    }

    async getTradeById(tradeId: number) {
        return this.prisma.trade.findUnique({
            where: { id: tradeId },
            include: {
                user: true,
                wallet: true,
                token: true,
            },
        });
    }

    async updateTrade(tradeId: number, data: Prisma.TradeUpdateInput) {
        return this.prisma.trade.update({
            where: { id: tradeId },
            data,
        });
    }

    async deleteTrade(tradeId: number) {
        return this.prisma.trade.delete({ where: { id: tradeId } });
    }
}
