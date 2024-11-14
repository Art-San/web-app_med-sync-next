'use client'
import { useRouter } from 'next/navigation'

const HomeButton = () => {
  const { push } = useRouter()

  const handleClickHome = () => {
    push('/')
  }

  return (
    <div>
      <button
        onClick={handleClickHome}
        className="px-5 py-2 bg-green-300 rounded-md"
      >
        На главную
      </button>
    </div>
  )
}

export default HomeButton
