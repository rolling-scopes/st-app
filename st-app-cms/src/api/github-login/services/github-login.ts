import LoginDto from "../interfaces/login-dto";
import BaseUser, { baseUserFields } from "../interfaces/user";

const loginUser = async ({ githubId, email }: LoginDto) => {
  const existingUser = await strapi.db.query('plugin::users-permissions.user').findOne({
    select: baseUserFields,
    where: { username: githubId },
  });

  if (existingUser) {
    return {
      ...existingUser satisfies BaseUser,
      created: false,
    };
  }

  const newUser  = await strapi.db.query('plugin::users-permissions.user').create({
    select: baseUserFields,
    data: { username: githubId, email, confirmed: true },
  });
  
  return {
    ...newUser satisfies BaseUser,
    created: true,
  };
};

export default {
  loginUser,
};
