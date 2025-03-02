import { IsOptional, IsString, IsBoolean, IsArray, IsObject, IsNumber } from 'class-validator';
import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

class UserWhereInput implements Prisma.UserWhereInput {
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

class UserIncludeInput implements Prisma.UserInclude {
    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, type: Boolean })
    Holder?: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, type: Boolean })
    Token?: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, type: Boolean })
    followers?: boolean;

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
    following?: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, type: Boolean })
    comments?: boolean;

    @IsOptional()
    @IsObject()
    @ApiProperty({ required: false, type: Boolean })
    _count?: boolean;
}

export class GetUsersDto {
    @IsOptional()
    @IsObject()
    @ApiProperty({ required: false, type: UserWhereInput })
    where?: UserWhereInput;

    @IsOptional()
    @IsArray()
    @ApiProperty({ required: false, type: [Object] })
    orderBy?: Prisma.UserOrderByWithRelationInput[];

    @IsOptional()
    @IsObject()
    @ApiProperty({ required: false, type: UserIncludeInput })
    include?: UserIncludeInput;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ required: false, type: Number, default: 10 })
    take: number = 10;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ required: false, type: Number })
    skip?: number;

    @IsOptional()
    @IsArray()
    @ApiProperty({ required: false, type: [String] })
    distinct?: Prisma.UserScalarFieldEnum[];
}
