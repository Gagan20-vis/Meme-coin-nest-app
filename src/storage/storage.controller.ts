import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3StorageService } from './s3-storage.service';

@Controller('storage')
export class StorageController {
    constructor(private readonly s3StorageService: S3StorageService) {}

    @Post('upload-s3')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.s3StorageService.uploadFile(file);
    }
}
