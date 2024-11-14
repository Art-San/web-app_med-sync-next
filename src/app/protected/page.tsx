import BackButton from '@/components/buttons/BackButton'
import HomeButton from '@/components/buttons/HomeButton'

const ProtectedPage = () => {
  return (
    <div>
      <h1>Закрытая страница</h1>
      <HomeButton />
      <BackButton />
    </div>
  )
}

export default ProtectedPage
