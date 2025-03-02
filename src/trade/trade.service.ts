import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { GetTradesDto } from 'src/trades/dto/get-trades.dto';

@Injectable()
export class TradeService {
    constructor(private readonly prisma: PrismaService) {}

    async createTrade(data: Prisma.TradeCreateInput) {
        const trade = await this.prisma.trade.create({ data });

        const holder = await this.prisma.holder.findFirst({
            where: {
                walletAddress: trade.swapperAddress,
                tokenAddress: trade.tokenAddress as any,
            },
            include: {
                Wallet: true,
            },
        });

        if (holder) {
            await this.prisma.holder.update({
                where: { id: holder.id },
                data: {
                    tokenAmount: holder.tokenAmount + trade.tokenAmount,
                },
            });
        } else {
            await this.prisma.holder.create({
                data: {
                    token: {
                        connect: {
                            tokenAddress: trade.tokenAddress as any,
                        },
                    },
                    holder: {
                        connect: {
                            userId: holder.Wallet.userId,
                        },
                    },
                    network: 'Solana',
                    tokenAmount: trade.tokenAmount,
                },
            });
        }

        return trade;
    }

    async getTrades(filter: GetTradesDto) {
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
