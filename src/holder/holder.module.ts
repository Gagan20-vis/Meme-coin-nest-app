import { Module } from '@nestjs/common';
import { HolderController } from './holder.controller';
import { HolderService } from './holder.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
    controllers: [HolderController],
    providers: [HolderService, PrismaService],
})
export class HolderModule {}
