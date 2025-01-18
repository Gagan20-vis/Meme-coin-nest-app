import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { TokenService } from './token.service';

@Controller('tokens')
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @Post()
    async createToken(@Body() data: Prisma.TokenCreateInput) {
        return this.tokenService.createToken(data);
    }

    @Get()
    async getTokens(@Query() filter: Prisma.TokenFindManyArgs) {
        return this.tokenService.getTokens(filter);
    }

    @Get(':id')
    async getTokenById(@Param('id') tokenId: string) {
        return this.tokenService.getTokenById(tokenId);
    }

    @Put(':id')
    async updateToken(@Param('id') tokenId: string, @Body() data: Prisma.TokenUpdateInput) {
        return this.tokenService.updateToken(tokenId, data);
    }

    @Delete(':id')
    async deleteToken(@Param('id') tokenId: string) {
        return this.tokenService.deleteToken(tokenId);
    }

    // Reaction APIs

    @Post(':id/reactions')
    async addReaction(@Param('id') tokenId: string, @Body() data: Prisma.ReactionCreateInput) {
        return this.tokenService.addReaction(tokenId, data);
    }

    @Get(':id/reactions')
    async getReactions(@Param('id') tokenId: string) {
        return this.tokenService.getReactions(tokenId);
    }

    @Get(':id/reactions/count')
    async getReactionCount(@Param('id') tokenId: string) {
        return this.tokenService.getReactionCount(tokenId);
    }

    @Put(':id/reactions/:reactionId')
    async updateReaction(
        @Param('id') tokenId: string,
        @Param('reactionId') reactionId: number,
        @Body() data: Prisma.ReactionUpdateInput,
    ) {
        return this.tokenService.updateReaction(reactionId, data);
    }

    @Delete(':id/reactions/:reactionId')
    async deleteReaction(@Param('id') tokenId: string, @Param('reactionId') reactionId: number) {
        return this.tokenService.deleteReaction(reactionId);
    }
}
