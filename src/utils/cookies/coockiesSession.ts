//use server is required
'use server'

import { cookies } from 'next/headers'

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
// const COOKIE_NAME = "session"
const COOKIE_NAME = 'SESSION'

const getSes = async () => {
  return cookies().get(COOKIE_NAME)?.value || 'Нет тут ни чего'
}

const setSession = async (session: string, obj: {}) => {
  cookies().set(COOKIE_NAME, session, obj)
}

export { getSes, setSession }
