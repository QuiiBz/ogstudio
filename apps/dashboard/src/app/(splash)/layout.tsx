import { Splash } from '../../components/Splash'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Splash>
      {children}
    </Splash>
  )
}
