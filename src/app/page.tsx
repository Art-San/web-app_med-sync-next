'use client'

import { useEffect, useState } from 'react'
import { ITelegramUser } from './types'
import WebApp from '@twa-dev/sdk'

export default function Home() {
  const [userData, setUserData] = useState<ITelegramUser | null>(null)

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as ITelegramUser)
    }
  }, [])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Главная</h1>
      {userData ? (
        <div className="">
          <ul>
            <li>ID: {userData.id}</li>
            <li>Username: {userData.username}</li>
            <li>First name: {userData.first_name}</li>
            <li>Last name: {userData.last_name}</li>
            <li>Language code: {userData.language_code}</li>
          </ul>
        </div>
      ) : (
        'нет ни кого'
      )}
    </div>
  )
}
