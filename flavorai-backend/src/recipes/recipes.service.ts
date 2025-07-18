import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async create(data: any, userId: string) {
    return this.prisma.recipe.create({
      data: { ...data, userId },
    });
  }

  findAll() {
    return this.prisma.recipe.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: string) {
    return this.prisma.recipe.findUnique({ where: { id } });
  }

  findByUser(userId: string) {
    return this.prisma.recipe.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async rateRecipe(recipeId: string, userId: string, value: number) {
    await this.prisma.rating.upsert({
      where: { userId_recipeId: { userId, recipeId } },
      update: { value },
      create: { value, userId, recipeId },
    })
  
    const avg = await this.prisma.rating.aggregate({
      where: { recipeId },
      _avg: { value: true },
    })
  
    await this.prisma.recipe.update({
      where: { id: recipeId },
      data: { rating: Math.round(avg._avg.value ?? 0) },
    })
  
    return { success: true }
  }
  
}
