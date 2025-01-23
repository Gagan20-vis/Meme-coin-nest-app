import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

//Services
import { UserService } from './users.service';

//DTOs
import { UserCreateDto } from './dto/user-create.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async createUser(@Body() data: UserCreateDto) {
        return this.userService.createUser(data);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'List of users.' })
    async getUsers(@Query() filter: Prisma.UserFindManyArgs) {
        return this.userService.getUsers(filter);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiResponse({ status: 200, description: 'User details.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async getUserById(@Param('id') userId: string) {
        return this.userService.getUserById(userId);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a user' })
    @ApiResponse({ status: 200, description: 'User updated successfully.' })
    async updateUser(@Param('id') userId: string, @Body() data: Prisma.UserUpdateInput) {
        return this.userService.updateUser(userId, data);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user' })
    @ApiResponse({ status: 200, description: 'User deleted successfully.' })
    async deleteUser(@Param('id') userId: string) {
        return this.userService.deleteUser(userId);
    }

    @Post(':id/wallets')
    @ApiOperation({ summary: 'Add a wallet to a user' })
    async addWallet(@Param('id') userId: string, @Body() walletData: Prisma.WalletCreateInput) {
        return this.userService.addWallet(userId, walletData);
    }

    @Get(':id/wallets')
    @ApiOperation({ summary: 'Get wallets of a user' })
    async getWallets(@Param('id') userId: string) {
        return this.userService.getWallets(userId);
    }

    @Get('wallets/:walletAddress')
    @ApiOperation({ summary: 'Get a wallet by address for a user' })
    async getWalletByAddress(@Param('walletAddress') address: string) {
        return this.userService.getWalletByAddress(address);
    }

    @Put(':id/wallets/:walletAddress')
    @ApiOperation({ summary: 'Update a wallet for a user' })
    async updateWallet(
        @Param('id') userId: string,
        @Param('walletAddress') address: string,
        @Body() walletData: Prisma.WalletUpdateInput,
    ) {
        return this.userService.updateWallet(userId, address, walletData);
    }

    @Delete(':id/wallets/:walletAddress')
    @ApiOperation({ summary: 'Delete a wallet for a user' })
    async deleteWallet(@Param('id') userId: string, @Param('walletAddress') address: string) {
        return this.userService.deleteWallet(userId, address);
    }

    @Post(':id/follow/:followUserId')
    @ApiOperation({ summary: 'Follow a user' })
    async followUser(@Param('id') userId: string, @Param('followUserId') followUserId: string) {
        return this.userService.followUser(userId, followUserId);
    }

    @Delete(':id/unfollow/:unfollowUserId')
    @ApiOperation({ summary: 'Unfollow a user' })
    async unfollowUser(@Param('id') userId: string, @Param('unfollowUserId') unfollowUserId: string) {
        return this.userService.unfollowUser(userId, unfollowUserId);
    }

    @Get(':id/followers')
    @ApiOperation({ summary: 'Get followers of a user' })
    async getFollowers(@Param('id') userId: string) {
        return this.userService.getFollowers(userId);
    }

    @Get(':id/following')
    @ApiOperation({ summary: 'Get users followed by a user' })
    async getFollowing(@Param('id') userId: string) {
        return this.userService.getFollowing(userId);
    }
}
