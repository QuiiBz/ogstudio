import { OgEditor } from "../../components/OgEditor";

export const metadata = {
  title: 'OG Studio',
  description: 'Figma-like OG (Open Graph) Image builder.',
}

export const dynamic = 'force-static'

interface ImageProps {
  params: {
    image: string
  }
}

export default function Image({ params: { image } }: ImageProps) {
  return <OgEditor height={630} imageId={image} width={1200} />
}
