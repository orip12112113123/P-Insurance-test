import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    message: 'התנתקת בהצלחה / Logout successful',
  });

  response.cookies.delete('auth-token');

  return response;
}
