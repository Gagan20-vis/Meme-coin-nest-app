import { IsString, IsNumber, IsEnum, IsOptional, IsObject } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Network, Prisma, SaleType } from '@prisma/client';

export class CreateTradeDto implements Prisma.TradeCreateInput {
    @IsObject()
    @ApiProperty({ required: true })
    user: Prisma.UserCreateNestedOneWithoutTradeInput;

    @IsObject()
    @ApiProperty({ required: true })
    wallet: Prisma.WalletCreateNestedOneWithoutTradesInput;

    @IsObject()
    @ApiProperty({ required: true })
    token: Prisma.TokenCreateNestedOneWithoutTradeInput;

    @IsEnum(Network)
    @ApiProperty({ enum: Network })
    network: Network;

    @IsEnum(SaleType)
    @ApiProperty({ enum: SaleType })
    type: SaleType;

    @IsNumber()
    @ApiProperty()
    solPrice: number;

    @IsNumber()
    @ApiProperty()
    baseAmount: number;

    @IsNumber()
    @ApiProperty()
    tokenAmount: number;

    @IsNumber()
    @ApiProperty()
    tokenPrice: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    date?: string;

    @IsString()
    @ApiProperty({ required: false })
    txHash: string;
}
