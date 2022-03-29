import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserJwtAuthGuard extends AuthGuard('jwt') {
  public constructor(private readonly reflector: Reflector) {
    super();
  }
}
