import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsBoolean, IsNumber, IsObject, IsOptional, IsString } from '@nestjs/class-validator';

class TokenWhereInput implements Prisma.TokenWhereInput {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, type: String })
    username?: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, type: Boolean })
    verified?: boolean;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, type: String })
    email?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, type: String })
    referralId?: string;
}

class TokenIncludeInput implements Prisma.TokenInclude {
    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, type: Boolean })
    creator?: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, type: Boolean })
    creatorWallet?: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, type: Boolean })
    Holder?: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, type: Boolean })
    Reaction?: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, type: Boolean })
    Trade?: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, type: Boolean })
    comments?: boolean;

    @IsOptional()
    @IsObject()
    @ApiProperty({ required: false, type: Boolean })
    _count?: boolean;
}

class TokenOrderByRelation implements Prisma.TokenOrderByWithRelationInput {
    @IsOptional()
    @IsObject()
    @ApiProperty({ required: false, type: Object })
    Trade: Prisma.TradeOrderByRelationAggregateInput;
}

export class GetTokensDto {
    @IsOptional()
    @IsObject()
    @ApiProperty({ required: false, type: TokenOrderByRelation })
    orderBy?: TokenOrderByRelation;

    @IsOptional()
    @IsObject()
    @ApiProperty({ required: false, type: TokenWhereInput })
    where?: TokenWhereInput;

    @IsOptional()
    @IsObject()
    @ApiProperty({ required: false, type: TokenIncludeInput })
    include?: TokenIncludeInput;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ required: false, type: Number, default: 10 })
    take: number = 10;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ required: false, type: Number })
    skip?: number;
}
