// import { jwtVerify, SignJWT } from 'jose'
// import { NextRequest } from 'next/server'

// const key = new TextEncoder().encode(process.env.JWT_SECRET)

// export const SESSION_DURATION = 60 * 60 * 1000 // 1 hour

// export async function encrypt(payload: any) {
//   return await new SignJWT(payload)
//     .setProtectedHeader({ alg: 'HS256' })
//     .setIssuedAt()
//     .setExpirationTime('1 hour')
//     .sign(key)
// }

// export async function getSession(req: NextRequest) {
//   const cookieHeader = req.headers.get('cookie')
//   if (!cookieHeader) return null

//   const cookies = Object.fromEntries(
//     cookieHeader.split('; ').map((c) => {
//       const [key, ...v] = c.split('=')
//       return [key, v.join('=')]
//     })
//   )

//   const session = cookies['session']
//   console.log('Session value in getSession:', session)

//   if (!session) return null

//   try {
//     return await jwtVerify(session, key)
//   } catch (err) {
//     console.error('Session verification failed:', err)
//     return null
//   }
// }

// import { NextResponse } from 'next/server';

// export function setSessionCookie(response: NextResponse, token: string) {
//   response.cookies.set('session', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     path: '/',
//     sameSite: 'strict',
//   });
// }

// import { NextRequest, NextResponse } from 'next/server';
// import { encrypt } from '@/utils/session';

// export async function POST(req: NextRequest) {
//   const { payload } = await req.json();
//   const token = await encrypt(payload);
//   const response = NextResponse.json({ success: true });
//   setSessionCookie(response, token);
//   return response;
// }

// const handleCheckAuth = async () => {
//   const response = await fetch('/api/session');
//   if (response.ok) {
//     console.log('Есть сессия');
//   } else {
//     console.log('Нет сессии');
//   }
// };
