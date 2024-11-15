'use client'

import { useTelegram } from '@/app/ui/useTg'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { dataTelegram } from './const'

export default function TelegramAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const { user, webApp } = useTelegram()
  // console.log(11, 'user', user)
  // console.log(12, 'webApp', webApp)
  // useEffect(() => {
  //   checkAuth()
  // }, [])

  const checkAuth = async () => {
    const response = await fetch('/api/session')
    if (response.ok) {
      setIsAuthenticated(true)
    }
  }
  const handleCheckAuth = async () => {
    const response = await fetch('/api/session')
    if (response.ok) {
      console.log(45, ' Есть сессия')
    } else {
      console.log(45, ' нет сессии')
    }
  }

  const authenticateUser = async () => {
    // useTelegramMock()

    const WebApp = (await import('@twa-dev/sdk')).default

    WebApp.ready()

    let initData = WebApp.initData

    // if (!initData) {
    //   initData = dataTelegram as string
    // }
    // console.log(35, initData)

    console.log('шаг 1: кнопка Authenticate ', initData)
    if (initData) {
      try {
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ initData })
        })
        if (response.ok) {
          setIsAuthenticated(true)
          router.refresh()
        } else {
          console.error('Authentication failed')
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Error during authentication:', error)
        setIsAuthenticated(false)
      }
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-8">
      {isAuthenticated ? (
        <>
          <p>Authenticated!</p>
          <button
            onClick={() => router.push('/protected')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Доступ к защищенной странице
          </button>
        </>
      ) : (
        <div>
          <p>Вы должны быть владельцем этого аккаунта</p>
          <div className=" flex flex-col gap-5">
            <div className="flex ">
              <button
                onClick={authenticateUser}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Authenticate
              </button>
              <button
                onClick={handleCheckAuth}
                className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
              >
                Check session
              </button>
            </div>
            <button className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded">
              handleHook
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
