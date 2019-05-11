import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';

describe('Books Controller', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
    }).compile();
    
    controller = module.get<BooksController>(BooksController);
    console.log('>>>>>controller@!$@#')
  });
  
  it('should be defined', () => {
    console.log('>>>>>controller', controller)
    expect(controller).toBeDefined();
  });
});
