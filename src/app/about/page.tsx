'use client'
import { FC, useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTelegram } from '../ui/useTg'
import BackButton from '@/components/buttons/BackButton'
import { getSes } from '@/utils/cookies/coockiesSession'

const About: FC = () => {
  const router = useRouter()
  const { user, webApp } = useTelegram()
  const [ses, setSes] = useState('')

  useEffect(() => {
    const asynFun = async () => {
      const session = await getSes()
      setSes(session)
    }
    asynFun()
  }, [])
  // const session = await getSession()
  console.log(1, 'session about,', ses)

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
