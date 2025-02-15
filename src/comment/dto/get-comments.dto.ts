import { IsBoolean, IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

class CommentWhereInput implements Prisma.CommentWhereInput {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, type: String })
    authorId?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, type: String })
    tokenAddress?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, type: String })
    comment?: string;
}

class CommentIncludeInput implements Prisma.CommentInclude {
    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, type: Boolean })
    author?: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, type: Boolean })
    token?: boolean;
}

export class GetCommentsDto {
    @IsOptional()
    @ApiProperty({ required: false, type: CommentWhereInput })
    where?: CommentWhereInput;

    @IsOptional()
    @ApiProperty({ required: false, type: CommentIncludeInput })
    include?: CommentIncludeInput;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ required: false, type: Number })
    skip?: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ required: false, type: Number, default: 10 })
    take?: number;
}
