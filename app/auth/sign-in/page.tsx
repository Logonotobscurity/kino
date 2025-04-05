import { SignInForm } from '@/app/components/auth/sign-in-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | Kinkosais',
  description: 'Sign in to your Kinkosais account',
}

export default function SignInPage() {
  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-12">
      <SignInForm />
    </div>
  )
} 