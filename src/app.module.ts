import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { UsersModule } from './users/users.module';
import { TokenModule } from './token/token.module';
import { TradeModule } from './trade/trade.module';
import { CommentModule } from './comment/comment.module';
import { HolderModule } from './holder/holder.module';
import { StorageModule } from './storage/storage.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        PrismaModule.forRoot(),
        UsersModule,
        TokenModule,
        TradeModule,
        CommentModule,
        HolderModule,
        StorageModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
