import { NextResponse } from 'next/server'
import { validateTelegramWebAppData } from '@/utils/telegramAuth'
import { encrypt, SESSION_DURATION } from '@/utils/session'

export async function POST(request: Request) {
  const { initData } = await request.json()
  console.log('шаг 1-2: результат валидации ', initData)

  const validationResult = validateTelegramWebAppData(initData)

  console.log('шаг 2: результат валидации ', validationResult)

  if (validationResult.validatedData) {
    const user = { telegramId: validationResult.user.id }

    // Create a new session
    const expires = new Date(Date.now() + SESSION_DURATION)
    const session = await encrypt({ user, expires })

    // Create a response object and set the cookie
    const response = NextResponse.json({
      message: 'Аутентификация прошла успешно, сессия записана'
    })

    response.cookies.set('session', session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    })

    console.log(
      'шаг 3: записали в куки и тут же получил',
      response.cookies.get('session')?.value
    )

    return response
  } else {
    console.log('ошибка на шаге 2 ', validationResult.message)
    return NextResponse.json(
      { message: validationResult.message },
      { status: 401 }
    )
  }
}

// import { NextResponse } from 'next/server'
// import { validateTelegramWebAppData } from '@/utils/telegramAuth'
// import { cookies } from 'next/headers'
// import { encrypt, SESSION_DURATION } from '@/utils/session'

// export async function POST(request: Request) {
//   const { initData } = await request.json()

//   const validationResult = validateTelegramWebAppData(initData)

//   console.log('шаг 2: результат валидации ', validationResult)

//   if (validationResult.validatedData) {
//     // console.log('Validation result: ', validationResult)
//     const user = { telegramId: validationResult.user.id }

//     // Create a new session
//     const expires = new Date(Date.now() + SESSION_DURATION)
//     const session = await encrypt({ user, expires })

//     // Save the session in a cookie
//     cookies().set('session', session, { expires, httpOnly: true })

//     return NextResponse.json({
//       message: 'Аутентификация прошла успешно, сесиия записана'
//     })
//   } else {
//     console.log('ошибка на шаге 2 ', validationResult.message)
//     return NextResponse.json(
//       { message: validationResult.message },
//       { status: 401 }
//     )
//   }
// }
