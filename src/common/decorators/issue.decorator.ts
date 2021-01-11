import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//TO FIX IT
export const Issue = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const issue = request.body.issueType;


    return data ? issue && issue[data] : issue;
  },
);
