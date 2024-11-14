import TelegramAuth from '@/components/TelegramAuth'
import { getSession } from '@/utils/session'
import Link from 'next/link'

export default async function Home() {
  const session = await getSession()
  // console.log(1, 'session,', session)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Главная</h1>
      <Link href={'/protected'} className=" text-red-300">
        Закрытая страница
      </Link>
      <h1 className="text-4xl font-bold mb-8">
        Jwt Authentication for Telegram Mini Apps
      </h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <TelegramAuth />
    </div>
  )
}
