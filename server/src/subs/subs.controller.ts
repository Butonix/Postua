import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { SubsService } from './subs.service';
import { CreateSubDto } from './dto/create-sub.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';

@ApiTags('subs')
@Controller('subs')
export class SubsController {
  constructor(private readonly subsService: SubsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: CreateSubDto })
  create(@UserId() id: number, @Body() createSubDto: CreateSubDto) {
    return this.subsService.create(id, createSubDto);
  }

  @Get('user/:userId')
  getSubs(@Param('userId') id: string) {
    return this.subsService.findUserSubs(+id);
  }
}