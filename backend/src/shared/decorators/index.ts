import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const ApiPagination = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // Decorator for pagination documentation
    return descriptor;
  };
};
