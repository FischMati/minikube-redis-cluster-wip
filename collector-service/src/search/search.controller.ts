import { Controller, Post, Body, Get } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) { }

  @Post()
  async createSearch(@Body('query') query: string) {
    return await this.searchService.saveSearch(query);
  }

  @Get()
  async getAll() {
    return await this.searchService.getAll();
  }
}