import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly title: string;

  @ApiModelProperty()
  readonly description: string;

  @ApiModelProperty()
  readonly author: string;
}

export class Params {
  @ApiModelProperty()
  readonly id: string;
}