import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { UploadFileDto } from './dto/upload-file.dto';

@Injectable()
export class S3StorageService {
    AWS_S3_BUCKET: string;
    AWS_LOCATION_CONSTRAINT: string;

    constructor(private readonly configService: ConfigService) {
        this.AWS_S3_BUCKET = this.configService.get('AWS_S3_BUCKET');
        this.AWS_LOCATION_CONSTRAINT = this.configService.get('AWS_LOCATION_CONSTRAINT');
    }

    s3 = new S3({
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    });

    async uploadFile(file: Express.Multer.File, uploadFileDto: UploadFileDto): Promise<S3.ManagedUpload.SendData> {
        const { mimetype, buffer } = file;
        const { userId, fileName } = uploadFileDto;
        const s3UploadParams: S3.Types.PutObjectRequest = {
            Bucket: this.AWS_S3_BUCKET,
            Key: `${userId}--${fileName}.${mimetype}`,
            Body: buffer,
            ACL: 'public-read',
            ContentType: mimetype,
            ContentDisposition: 'inline',
        };

        try {
            const s3Response = await this.s3.upload(s3UploadParams).promise();
            return s3Response;
        } catch (e) {
            console.log(e);
        }
    }
}
