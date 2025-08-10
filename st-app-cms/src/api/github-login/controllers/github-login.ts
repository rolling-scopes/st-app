import LoginContext from "../interfaces/login-context";
import BaseUser, { baseUserFields } from "../interfaces/user";
import loginService from '../services/github-login';

export default {
  async create(ctx: LoginContext) {
    const { githubId, email } = ctx.request.body;

    if (!githubId || !email) {
      return ctx.badRequest('Missing githubUsername or email');
    }
    try {
      const user: BaseUser & {created: boolean} = await loginService.loginUser({ githubId, email });
      return ctx.send(user, user.created ? 201 : 200);
    } catch (error) {
      return ctx.internalServerError('Internal error');
    }
  },
};
