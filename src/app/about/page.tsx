'use client'
import { FC } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTelegram } from '../ui/useTg'
import BackButton from '@/components/buttons/BackButton'

const About: FC = () => {
  const router = useRouter()
  const { user, webApp } = useTelegram()

  const back = () => {
    router.push('/')
  }

  useEffect(() => {
    webApp?.BackButton.show()
    webApp?.BackButton.onClick(back)
  }, [webApp])

  return (
    <div className="flex flex-col  gap-3">
      <div>About</div>
      <p>{user?.first_name} can Change</p>
      <BackButton />
    </div>
  )
}

export default About
