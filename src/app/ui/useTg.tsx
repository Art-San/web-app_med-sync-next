'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ITelegramUser, IWebApp } from './types'

export interface ITelegramContext {
  webApp?: IWebApp
  user?: ITelegramUser
}

export const TelegramContext = createContext<ITelegramContext>({})

export const TelegramProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [webApp, setWebApp] = useState<IWebApp | null>(null)

  useEffect(() => {
    const initializeApp = async () => {
      const app = (await import('@twa-dev/sdk')).default

      console.log(12, app.initData)

      if (app) {
        app.ready()
        app.expand()
        setWebApp(app as any)
      }
    }

    initializeApp()
  }, [])

  // useEffect(() => {
  //   const app = (window as any).Telegram?.WebApp

  //   console.log(12, app)

  //   if (app) {
  //     app.ready()
  //     app.expand()
  //     setWebApp(app)
  //   }
  // }, [])

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user
        }
      : {}
  }, [webApp])

  return (
    <TelegramContext.Provider value={value}>
      {/* Make sure to include script tag with "beforeInteractive" strategy to pre-load web-app script */}
      {children}
    </TelegramContext.Provider>
  )
}

export const useTelegram = () => useContext(TelegramContext)
