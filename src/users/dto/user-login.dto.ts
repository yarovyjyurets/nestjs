import { ApiModelProperty } from '@nestjs/swagger';

export class UserLogin {
  @ApiModelProperty()
  readonly email: string;
  @ApiModelProperty()
  readonly password: string;
}
