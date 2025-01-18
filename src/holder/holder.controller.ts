import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { HolderService } from './holder.service';

@Controller('holders')
export class HolderController {
    constructor(private readonly holderService: HolderService) {}

    @Post()
    async createHolder(@Body() data: Prisma.HolderCreateInput) {
        return this.holderService.createHolder(data);
    }

    @Get()
    async getHolders(@Query() filter: Prisma.HolderFindManyArgs) {
        return this.holderService.getHolders(filter);
    }

    @Get(':id')
    async getHolderById(@Param('id') holderId: string) {
        return this.holderService.getHolderById(Number(holderId));
    }

    @Put(':id')
    async updateHolder(@Param('id') holderId: string, @Body() data: Prisma.HolderUpdateInput) {
        return this.holderService.updateHolder(Number(holderId), data);
    }

    @Delete(':id')
    async deleteHolder(@Param('id') holderId: string) {
        return this.holderService.deleteHolder(Number(holderId));
    }
}
