interface AuthorizeResponse {
  success: boolean;
  admin?: boolean;
}

export function authorize(password: string): AuthorizeResponse {
  if(password === 'admin') {
    return {
      success: true,
      admin: true
    }
  } else if(password === '1234') {
    return {
      success: true,
      admin: false
    }
  }
  return {
    success: false
  }
}
