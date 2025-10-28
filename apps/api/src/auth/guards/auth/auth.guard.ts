import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../../../common/decorators/public.decorator';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    interface AuthenticatedRequest extends Request {
      tokenPayload?: JwtPayload;
    }

    interface JwtPayload {
      sub: string;
      phoneNumber: string;
      // add other fields if needed
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      interface JwtPayload {
        sub: string;
        phoneNumber: string;
        // add other fields if needed
      }

      const tokenPayload: JwtPayload =
        await this.jwtService.verifyAsync<JwtPayload>(token, {
          secret: this.configService.get('JWT_SECRET'),
        });

      request.tokenPayload = tokenPayload;
    } catch (error) {
      console.error('Token verification failed:', error);
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
