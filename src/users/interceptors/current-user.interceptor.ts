import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly userService: UsersService) {}
  async intercept(
    ctx: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = ctx.switchToHttp().getRequest();
    const { userId } = request.session || {};
    if (userId) {
      request.currentUser = await this.userService.findOne(userId);
    }
    return next.handle();
  }
}
