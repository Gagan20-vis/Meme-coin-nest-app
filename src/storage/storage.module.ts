import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3StorageService } from './s3-storage.service';
import { StorageController } from './storage.controller';

@Module({
    imports: [ConfigModule],
    providers: [S3StorageService],
    exports: [S3StorageService],
    controllers: [StorageController],
})
export class StorageModule {}
