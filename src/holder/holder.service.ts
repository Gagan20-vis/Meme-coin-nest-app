import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class HolderService {
    constructor(private readonly prisma: PrismaService) {}

    async createHolder(data: Prisma.HolderCreateInput) {
        return this.prisma.holder.create({
            data,
        });
    }

    async getHolders(filter: Prisma.HolderFindManyArgs) {
        return this.prisma.holder.findMany(filter);
    }

    async getHolderById(holderId: number) {
        const holder = await this.prisma.holder.findUnique({
            where: { id: holderId },
        });
        if (!holder) {
            throw new NotFoundException(`Holder with ID ${holderId} not found`);
        }
        return holder;
    }

    async updateHolder(holderId: number, data: Prisma.HolderUpdateInput) {
        const existingHolder = await this.prisma.holder.findUnique({
            where: { id: holderId },
        });
        if (!existingHolder) {
            throw new NotFoundException(`Holder with ID ${holderId} not found`);
        }

        return this.prisma.holder.update({
            where: { id: holderId },
            data,
        });
    }

    async deleteHolder(holderId: number) {
        const existingHolder = await this.prisma.holder.findUnique({
            where: { id: holderId },
        });
        if (!existingHolder) {
            throw new NotFoundException(`Holder with ID ${holderId} not found`);
        }

        return this.prisma.holder.delete({
            where: { id: holderId },
        });
    }
}
