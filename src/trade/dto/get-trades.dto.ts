import { IsOptional, IsString, IsBoolean, IsObject, IsNumber } from 'class-validator';
import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

class TradeWhereInput implements Prisma.TradeWhereInput {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, type: String })
    tradeId?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, type: String })
    userId?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, type: String })
    tokenId?: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, type: Boolean })
    completed?: boolean;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, type: String })
    tokenAddress?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, type: String })
    swapperAddress?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, type: String })
    swapperId?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, type: String })
    date?: string;
}

class TradeOrderByRelation implements Prisma.TradeOrderByWithRelationInput {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, type: String })
    date: 'asc' | 'desc';
}

class TradeIncludeInput implements Prisma.TradeInclude {
    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, type: Boolean })
    token?: boolean;

    @IsOptional()
    @IsObject()
    @ApiProperty({ required: false, type: Boolean })
    _count?: boolean;
}

export class GetTradesDto {
    @IsOptional()
    @IsObject()
    @ApiProperty({ required: false, type: TradeOrderByRelation })
    orderBy?: TradeOrderByRelation;

    @IsOptional()
    @IsObject()
    @ApiProperty({ required: false, type: TradeWhereInput })
    where?: TradeWhereInput;

    @IsOptional()
    @IsObject()
    @ApiProperty({ required: false, type: TradeIncludeInput })
    include?: TradeIncludeInput;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ required: false, type: Number, default: 10 })
    take: number = 10;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ required: false, type: Number })
    skip?: number;
}
