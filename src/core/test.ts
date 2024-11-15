import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  $debug,
  init as initSDK
} from '@telegram-apps/sdk-react'

/**
 * Инициализирует приложение и настраивает его зависимости.
 */
export function init(debug: boolean): void {
  // Set @telegram-apps/sdk-react debug mode.
  $debug.set(debug)

  // Инициализируйте специальные обработчики событий для Telegram Desktop, Android, iOS и т. д.
  // Также настройте пакет.
  initSDK()

  // Смонтируйте все компоненты, используемые в проекте.
  backButton.isSupported() && backButton.mount()
  miniApp.mount()
  themeParams.mount()
  initData.restore()

  // Монтирование viewport и последующее вызов bindCssVars после успешного монтирования
  viewport
    .mount()
    .then(() => {
      viewport.bindCssVars()
    })
    .catch((e) => {
      console.error('Something went wrong mounting the viewport', e)
    })

  // Определить переменные CSS, связанные с компонентами.
  miniApp.bindCssVars()
  themeParams.bindCssVars()

  // При необходимости добавьте Эруду.
  if (debug) {
    import('eruda').then((lib) => lib.default.init()).catch(console.error)
  }
}
