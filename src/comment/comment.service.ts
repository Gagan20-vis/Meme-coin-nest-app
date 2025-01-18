import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CommentService {
    constructor(private readonly prisma: PrismaService) {}

    async createComment(data: Prisma.CommentCreateInput) {
        return this.prisma.comment.create({
            data,
        });
    }

    async getComments(filter: Prisma.CommentFindManyArgs) {
        return this.prisma.comment.findMany(filter);
    }

    async getCommentById(commentId: string) {
        const comment = await this.prisma.comment.findUnique({
            where: { id: parseInt(commentId) },
        });
        if (!comment) {
            throw new NotFoundException(`Comment with ID ${commentId} not found`);
        }
        return comment;
    }

    async updateComment(commentId: string, data: Prisma.CommentUpdateInput) {
        const existingComment = await this.prisma.comment.findUnique({
            where: { id: parseInt(commentId) },
        });
        if (!existingComment) {
            throw new NotFoundException(`Comment with ID ${commentId} not found`);
        }

        return this.prisma.comment.update({
            where: { id: parseInt(commentId) },
            data,
        });
    }

    async deleteComment(commentId: string) {
        const existingComment = await this.prisma.comment.findUnique({
            where: { id: parseInt(commentId) },
        });
        if (!existingComment) {
            throw new NotFoundException(`Comment with ID ${commentId} not found`);
        }

        return this.prisma.comment.delete({
            where: { id: parseInt(commentId) },
        });
    }
}
