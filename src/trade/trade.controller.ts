import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TradeService } from './trade.service';
import { GetTradesDto } from 'src/trade/dto/get-trades.dto';
import { CreateTradeDto } from './dto/create-trade.dto';

@Controller('trades')
export class TradeController {
    constructor(private readonly tradeService: TradeService) {}

    @Post()
    async createTrade(@Body() data: CreateTradeDto) {
        return this.tradeService.createTrade(data);
    }

    @Get()
    async getTrades(@Query() filter: GetTradesDto) {
        return this.tradeService.getTrades(filter);
    }

    @Get(':id')
    async getTradeById(@Param('id') tradeId: string) {
        return this.tradeService.getTradeById(Number(tradeId));
    }

    @Put(':id')
    async updateTrade(@Param('id') tradeId: string, @Body() data: Prisma.TradeUpdateInput) {
        return this.tradeService.updateTrade(Number(tradeId), data);
    }

    @Delete(':id')
    async deleteTrade(@Param('id') tradeId: string) {
        return this.tradeService.deleteTrade(Number(tradeId));
    }
}
