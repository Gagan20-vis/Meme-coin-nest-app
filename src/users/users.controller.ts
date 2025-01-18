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
}
