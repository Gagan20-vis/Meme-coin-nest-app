import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3StorageService } from './s3-storage.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadFileDto } from './dto/upload-file.dto';

@ApiTags('storage')
@Controller('storage')
export class StorageController {
    constructor(private readonly s3StorageService: S3StorageService) {}

    @Post('upload-s3')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'File upload',
        type: UploadFileDto,
    })
    uploadFile(@UploadedFile() file: Express.Multer.File, @Body() uploadFileDto: UploadFileDto) {
        return this.s3StorageService.uploadFile(file, uploadFileDto);
    }
}
