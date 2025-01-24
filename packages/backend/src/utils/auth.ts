import { getUser } from "../database/getUser";

type AuthorizeResponse = {
  success: true;
  name: string;
  isAdmin: boolean;
} | {
  success: false;
  message: string;
}

export async function authorize(password: string): Promise<AuthorizeResponse> {
  const dbUser = await getUser(password)
  if(dbUser) {
    return {
      success: true,
      ...dbUser,
    }
  } else {
    return {
      success: false,
      message: 'User not found',
    }
  }
}
