import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { UserService } from './users.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() data: Prisma.UserCreateInput) {
        return this.userService.createUser(data);
    }

    @Get()
    async getUsers(@Query() filter: Prisma.UserFindManyArgs) {
        return this.userService.getUsers(filter);
    }

    @Get(':id')
    async getUserById(@Param('id') userId: string) {
        return this.userService.getUserById(userId);
    }

    @Put(':id')
    async updateUser(@Param('id') userId: string, @Body() data: Prisma.UserUpdateInput) {
        return this.userService.updateUser(userId, data);
    }

    @Delete(':id')
    async deleteUser(@Param('id') userId: string) {
        return this.userService.deleteUser(userId);
    }

    @Post(':id/wallets')
    async addWallet(@Param('id') userId: string, @Body() walletData: Prisma.WalletCreateInput) {
        return this.userService.addWallet(userId, walletData);
    }

    @Get(':id/wallets')
    async getWallets(@Param('id') userId: string) {
        return this.userService.getWallets(userId);
    }

    @Get(':id/wallets/:walletAddress')
    async getWalletByAddress(@Param('id') userId: string, @Param('walletAddress') address: string) {
        return this.userService.getWalletByAddress(userId, address);
    }

    @Put(':id/wallets/:walletAddress')
    async updateWallet(
        @Param('id') userId: string,
        @Param('walletAddress') address: string,
        @Body() walletData: Prisma.WalletUpdateInput,
    ) {
        return this.userService.updateWallet(userId, address, walletData);
    }

    @Delete(':id/wallets/:walletAddress')
    async deleteWallet(@Param('id') userId: string, @Param('walletAddress') address: string) {
        return this.userService.deleteWallet(userId, address);
    }
}
