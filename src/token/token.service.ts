import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { GetTokensDto } from './dto/get-tokens.dto';

@Injectable()
export class TokenService {
    constructor(private readonly prisma: PrismaService) {}

    async createToken(data: Prisma.TokenCreateInput) {
        return this.prisma.token.create({ data });
    }

    async getTokens(filter: GetTokensDto) {
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

    async addReaction(tokenId: string, data: Prisma.ReactionCreateInput) {
        return this.prisma.reaction.create({
            data: {
                ...data,
                token: { connect: { tokenAddress: tokenId } },
            },
        });
    }

    async getReactions(tokenId: string) {
        return this.prisma.reaction.findMany({
            where: { tokenAddress: tokenId },
        });
    }

    async getReactionCount(tokenId: string) {
        return this.prisma.reaction.count({
            where: { tokenAddress: tokenId },
        });
    }

    async updateReaction(reactionId: number, data: Prisma.ReactionUpdateInput) {
        return this.prisma.reaction.update({
            where: { id: reactionId },
            data,
        });
    }

    async deleteReaction(reactionId: number) {
        return this.prisma.reaction.delete({ where: { id: reactionId } });
    }
}
