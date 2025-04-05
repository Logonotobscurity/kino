import { UserProfile } from '@/app/components/auth/user-profile'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile | Kinkosais',
  description: 'Manage your Kinkosais profile and account settings',
}

export default function ProfilePage() {
  return (
    <div className="container py-12">
      <UserProfile />
    </div>
  )
} 