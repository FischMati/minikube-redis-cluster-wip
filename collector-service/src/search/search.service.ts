import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchDocument } from './search.model';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(@InjectModel('Search') private readonly searchModel: Model<SearchDocument>) { }

  async saveSearch(query: string): Promise<SearchDocument> {
    try {
      const newSearch = new this.searchModel({
        query,
        timestamp: new Date(),
      });
      const savedSearch = await newSearch.save();
      this.logger.log(`Search saved: ${query}`);
      return savedSearch;
    } catch (error) {
      this.logger.error('Error saving search:', error);
      throw error;
    }
  }
}