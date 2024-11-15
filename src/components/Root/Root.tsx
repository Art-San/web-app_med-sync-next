'use client'

import { useDidMount } from '@/hook/useDidMount'
import { type PropsWithChildren, useEffect } from 'react'
import { ErrorPage } from '../ErrorPage'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import './styles.css'
import { AppRoot } from '@telegram-apps/telegram-ui'
import { setLocale } from '@/core/i18n/locale'

function RootInner({ children }: PropsWithChildren) {
  const isDev = process.env.NODE_ENV === 'development'

  // При необходимости создайте макет среды Telegram в режиме разработки..
  if (isDev) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock()
  }

  const lp = useLaunchParams()
  const debug = isDev || lp.startParam === 'debug'

  // Initialize the library.
  useClientOnce(() => {
    init(debug)
  })

  const isDark = useSignal(miniApp.isDark)
  const initDataUser = useSignal(initData.user)

  // Set the user locale.
  useEffect(() => {
    initDataUser &&
      setLocale(initDataUser.languageCode) /*#TODO:  тут остоновился*/
  }, [initDataUser])

  // Включите режим отладки, чтобы увидеть все отправленные методы и полученные события..
  useEffect(() => {
    debug && import('eruda').then((lib) => lib.default.init())
  }, [debug])

  return (
    // <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      {children}
    </AppRoot>
    // </TonConnectUIProvider>
  )
}

export function Root(props: PropsWithChildren) {
  // К сожалению, мини-приложения Telegram не позволяют нам использовать все возможности
  // Рендеринг на стороне сервера. Вот почему мы показываем загрузчик на сервере
  // сторона.
  const didMount = useDidMount()

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : (
    <div className="root__loading">Loading</div>
  )
}
