import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  tokenPayload?: Record<string, unknown>;
}

export const TokenPayload = createParamDecorator(
  (data: string | number | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    const payload = request.tokenPayload;

    if (!payload) {
      throw new UnauthorizedException('Token payload is missing');
    }

    return data ? payload[data] : payload;
  },
);
