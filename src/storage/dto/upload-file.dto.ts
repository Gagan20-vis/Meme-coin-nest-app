import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadFileDto {
    @ApiProperty({ description: 'User ID' })
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty({ description: 'File name' })
    @IsNotEmpty()
    @IsString()
    fileName: string;
}
