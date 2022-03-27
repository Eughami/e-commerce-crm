import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { requestFromContext } from '@shopping/service-libs';
import { getValue, setValue } from 'express-ctx';
import { Observable } from 'rxjs';

@Injectable()
export class UserJwtAuthGuard extends AuthGuard('jwt') {
  public constructor(private readonly reflector: Reflector) {
    super();
  }

  // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
  //   const req = requestFromContext(context);

  //   if (!req) {
  //     return true; // websocket upgrade
  //   }

  //   const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());

  //   const requestPayload = getValue('req') || {};
  //   requestPayload.user = req.user;
  //   setValue('req', requestPayload);

  //   if (isPublic) {
  //     return req;
  //   }

  //   return super.canActivate(context);
  // }
}
