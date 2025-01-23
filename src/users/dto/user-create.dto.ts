import { IsOptional, IsString, IsBoolean, IsUrl, IsEmail } from '@nestjs/class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserCreateDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    userId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    username?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    verified?: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    imageUrl?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    coverUrl?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    referralId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    inviteId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    bio?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    socialMedia?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    twitter?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    telegram?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    link?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    kycStatus?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    country?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    documentType?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    documentFrontUrl?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    documentBackUrl?: string;
}
