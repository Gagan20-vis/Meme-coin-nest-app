import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CommentService } from './comment.service';
import { GetCommentsDto } from './dto/get-comments.dto';

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post()
    async createComment(@Body() data: Prisma.CommentCreateInput) {
        return this.commentService.createComment(data);
    }

    @Get()
    async getComments(@Query() filter: GetCommentsDto) {
        return this.commentService.getComments(filter);
    }

    @Get(':id')
    async getCommentById(@Param('id') commentId: string) {
        return this.commentService.getCommentById(commentId);
    }

    @Put(':id')
    async updateComment(@Param('id') commentId: string, @Body() data: Prisma.CommentUpdateInput) {
        return this.commentService.updateComment(commentId, data);
    }

    @Delete(':id')
    async deleteComment(@Param('id') commentId: string) {
        return this.commentService.deleteComment(commentId);
    }
}
