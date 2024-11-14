'use client'
import { useRouter } from 'next/navigation'

const BackButton = () => {
  const { back } = useRouter()

  const handleClickBack = () => {
    back()
  }

  return (
    <div>
      <button
        onClick={handleClickBack}
        className="px-5 py-2 rounded-md bg-orange-300"
      >
        Назад
      </button>
    </div>
  )
}

export default BackButton
