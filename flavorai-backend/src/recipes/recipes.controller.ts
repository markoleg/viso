import { Controller, Get, Post, Body, UseGuards, Request, Patch, Param } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: any, @Request() req) {
    return this.recipesService.create(data, req.user.userId);
  }

  @Get()
  findAll() {
    return this.recipesService.findAll();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('my')
  findMine(@Request() req) {
    return this.recipesService.findByUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/rate')
  rateRecipe(@Param('id') id: string, @Body('rating') rating: number, @Request() req) {
    return this.recipesService.rateRecipe(id, req.user.userId, rating)
  }
}
