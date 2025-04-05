import { SignUpForm } from '@/app/components/auth/sign-up-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up | Kinkosais',
  description: 'Create a new Kinkosais account',
}

export default function SignUpPage() {
  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-12">
      <SignUpForm />
    </div>
  )
} 