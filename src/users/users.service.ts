import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data });
    }

    async getUsers() {
        return this.prisma.user.findMany();
    }

    async getUserById(userId: string) {
        return this.prisma.user.findUnique({ where: { userId } });
    }

    async updateUser(userId: string, data: Prisma.UserUpdateInput) {
        return this.prisma.user.update({
            where: { userId },
            data,
        });
    }

    async deleteUser(userId: string) {
        return this.prisma.user.delete({ where: { userId } });
    }

    // Follow a user
    async followUser(userId: string, followUserId: string): Promise<{ message: string }> {
        const user = await this.prisma.user.findUnique({ where: { userId } });
        const followUser = await this.prisma.user.findUnique({ where: { userId: followUserId } });

        if (!user || !followUser) {
            throw new Error('User not found');
        }

        const existingFollow = await this.prisma.follow.findFirst({
            where: { followerId: userId, followingId: followUserId },
        });

        if (existingFollow) {
            throw new Error('Already following this user');
        }

        await this.prisma.follow.create({
            data: {
                followerId: userId,
                followingId: followUserId,
            },
        });

        return { message: 'Followed successfully' };
    }

    async unfollowUser(userId: string, unfollowUserId: string): Promise<{ message: string }> {
        const user = await this.prisma.user.findUnique({ where: { userId } });
        const unfollowUser = await this.prisma.user.findUnique({ where: { userId: unfollowUserId } });

        if (!user || !unfollowUser) {
            throw new Error('User not found');
        }

        const existingFollow = await this.prisma.follow.findFirst({
            where: { followerId: userId, followingId: unfollowUserId },
        });

        if (!existingFollow) {
            throw new Error('You are not following this user');
        }

        await this.prisma.follow.delete({
            where: {
                followerId_followingId: {
                    followerId: userId,
                    followingId: unfollowUserId,
                },
            },
        });

        return { message: 'Unfollow successful' };
    }
}
