import { Core } from '@strapi/strapi';
import { errors } from '@strapi/utils';

type PolicyConfig = {};

type PolicyDependencies = {
  strapi: Core.Strapi;
  env: typeof process.env;
};

const nextServerApiToken = async (
  ctx: Core.PolicyContext,
  _config: PolicyConfig,
  { strapi }: PolicyDependencies
) => {
  const token = ctx.request.header.authorization?.replace('Bearer ', '');

  if (!process.env.NEXT_SERVER_API_TOKEN) {
    strapi.log.error('NEXT_SERVER_API_TOKEN is not configured');
    throw new errors.PolicyError('Server misconfiguration');
  }
  
  if (token !== process.env.NEXT_SERVER_API_TOKEN) {
    strapi.log.error('NEXT_SERVER_API_TOKEN is invalid');
    throw new errors.ForbiddenError('Invalid token');
  }
  return true;
};

export default nextServerApiToken;
