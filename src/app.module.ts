import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { UsersModule } from './users/users.module';
import { TokenModule } from './token/token.module';
import { TradeModule } from './trade/trade.module';
import { CommentModule } from './comment/comment.module';

@Module({
    imports: [PrismaModule.forRoot(), UsersModule, TokenModule, TradeModule, CommentModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
