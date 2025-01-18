import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
    controllers: [TokenController],
    providers: [TokenService, PrismaService],
})
export class TokenModule {}
