import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService],
})
export class UsersModule {}
