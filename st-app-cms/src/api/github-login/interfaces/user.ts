export default interface BaseUser {
  id: number;
  username: string;
  email: string;
}

export const baseUserFields: (keyof BaseUser)[] = ['id', 'username', 'email'];
