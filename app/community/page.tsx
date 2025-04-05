import { Metadata } from 'next'
import { CommunityPage } from '@/components/community/community-page'

export const metadata: Metadata = {
  title: 'Community | Kinkoasis',
  description: 'Join the Kinkoasis community - connect with fellow enthusiasts, share experiences, and attend exclusive events',
}

export default function Community() {
  return <CommunityPage />
} 