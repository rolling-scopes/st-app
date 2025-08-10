import { Context } from 'koa';
import LoginDto from './login-dto';

export default interface LoginContext extends Context {
  request: Context['request'] & {
    body: LoginDto;
  };
}


