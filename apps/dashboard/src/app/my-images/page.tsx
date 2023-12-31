import { MyImagesSplash } from "../../components/Splash/MyImagesSplash";

export const metadata = {
  title: 'My images - OG Studio',
  description: 'My Open Graph images.',
}

export const dynamic = 'force-static'

export default function MyImages() {
  return <MyImagesSplash />
}
