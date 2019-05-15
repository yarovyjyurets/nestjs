import * as Joi from 'joi';
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private readonly schema: object) { }

  transform(value: any, metadata: ArgumentMetadata) {
    console.dir(value, { colors: true, depth: 10 });
    console.dir(metadata, { colors: true, depth: 10 });
    const { error }: { error: Error } = Joi.validate(value, this.schema);
    if (error) {
      console.log('>>>>>error', error);
      throw new BadRequestException(error.message);
    }
    return value;
  }
}
