import * as joi from 'joi';

export const bookSchema = {
  id: joi.number(),
  title: joi.string(),
  description: joi.string(),
  author: joi.string(),
}