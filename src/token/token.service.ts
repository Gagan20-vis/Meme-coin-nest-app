import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TokenService {
    constructor(private readonly prisma: PrismaService) {}

    async createToken(data: Prisma.TokenCreateInput) {
        return this.prisma.token.create({ data });
    }

    async getTokens(filter: Prisma.TokenFindManyArgs) {
        return this.prisma.token.findMany(filter);
    }

    async getTokenById(tokenId: string) {
        return this.prisma.token.findUnique({ where: { id: tokenId } });
    }

    async updateToken(tokenId: string, data: Prisma.TokenUpdateInput) {
        return this.prisma.token.update({
            where: { id: tokenId },
            data,
        });
    }

    async deleteToken(tokenId: string) {
        return this.prisma.token.delete({ where: { id: tokenId } });
    }
}
