"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/context/auth-context'
import { createClient } from '@/app/lib/supabase/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { CreditCard, User, Key, Award, Calendar, CheckCircle, CreditCard as CreditCardIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Profile = {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  membership_tier: string | null
  membership_expiry: string | null
  community_joined: boolean | null
  community_level: string | null
}

type PaymentMethod = {
  id: string
  card_last4: string
  card_brand: string
  is_default: boolean
  exp_month: number
  exp_year: number
}

const MEMBERSHIP_TIERS = [
  {
    id: 'standard',
    name: 'Standard',
    price: 9.99,
    description: 'Access to basic features and community content',
    features: [
      'Access to community forums',
      'View public classes',
      'Basic support'
    ],
    color: 'bg-slate-600'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    description: 'Enhanced access with exclusive content and discounts',
    features: [
      'All Standard features',
      '10% discount on classes',
      'Early access to new products',
      'Priority support'
    ],
    color: 'bg-purple-600'
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 39.99,
    description: 'Full access to all features and exclusive benefits',
    features: [
      'All Premium features',
      '20% discount on all products',
      '30% discount on dungeon bookings',
      'Exclusive VIP events',
      'Dedicated support'
    ],
    color: 'bg-[#BB2124]'
  }
]

// Mock payment methods for demo
const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'card_123',
    card_last4: '4242',
    card_brand: 'Visa',
    is_default: true,
    exp_month: 12,
    exp_year: 2025
  },
  {
    id: 'card_456',
    card_last4: '1234',
    card_brand: 'Mastercard',
    is_default: false,
    exp_month: 8,
    exp_year: 2024
  }
]

export function UserProfile() {
  const { user, signOut } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [selectedMembership, setSelectedMembership] = useState<string | null>(null)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [newCardNumber, setNewCardNumber] = useState('')
  const [newCardExpiry, setNewCardExpiry] = useState('')
  const [newCardCVC, setNewCardCVC] = useState('')
  const [newCardName, setNewCardName] = useState('')
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        setLoading(false)
        return
      }
      
      try {
        // Get profile data
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
          
        if (error) {
          console.error('Error fetching profile:', error)
        } else if (data) {
          setProfile(data)
          setFullName(data.full_name || '')
          setUsername(data.username || '')
          setBio(data.bio || '')
          setSelectedMembership(data.membership_tier || MEMBERSHIP_TIERS[0].id)
          
          // In a real app, you would fetch payment methods from your payment provider
          setPaymentMethods(MOCK_PAYMENT_METHODS)
        }
      } catch (error) {
        console.error('Error loading profile data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadProfile()
  }, [supabase, user])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    if (!user) {
      setError('Not authenticated')
      setLoading(false)
      return
    }
    
    const updates = {
      id: user.id,
      full_name: fullName,
      username,
      bio,
      updated_at: new Date().toISOString(),
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert(updates)
        .eq('id', user.id)
        
      if (error) {
        setError(error.message)
      } else {
        setMessage('Profile updated successfully')
        // Refresh profile data
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
          
        if (data) {
          setProfile(data)
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpgradeMembership = async (tierID: string) => {
    setLoading(true)
    setError(null)
    setMessage(null)
    
    if (!user) {
      setError('Not authenticated')
      setLoading(false)
      return
    }
    
    // In a real app, you would integrate with a payment processor
    // Here we're just simulating the subscription update
    try {
      const tierName = MEMBERSHIP_TIERS.find(tier => tier.id === tierID)?.name || 'Unknown'
      
      // Update the membership tier and set expiry date to 1 year from now
      const expiryDate = new Date()
      expiryDate.setFullYear(expiryDate.getFullYear() + 1)
      
      const updates = {
        id: user.id,
        membership_tier: tierID,
        membership_expiry: expiryDate.toISOString(),
        updated_at: new Date().toISOString(),
      }
      
      const { error } = await supabase
        .from('profiles')
        .upsert(updates)
        .eq('id', user.id)
        
      if (error) {
        setError(error.message)
      } else {
        setSelectedMembership(tierID)
        setMessage(`Successfully upgraded to ${tierName} membership`)
        
        // Refresh profile data
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
          
        if (data) {
          setProfile(data)
        }
      }
    } catch (err) {
      setError('An unexpected error occurred during membership upgrade')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  
  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault()
    
    // In a real app, this would connect to a payment processor
    // For this demo, we'll simulate adding a card
    
    // Basic validation
    if (newCardNumber.length < 16 || !newCardExpiry || newCardCVC.length < 3 || !newCardName) {
      setError('Please fill in all card details correctly')
      return
    }
    
    // Extract expiry month and year
    const [expMonth, expYear] = newCardExpiry.split('/').map(part => parseInt(part.trim()))
    
    // Create new payment method
    const newMethod: PaymentMethod = {
      id: `card_${Date.now()}`,
      card_last4: newCardNumber.slice(-4),
      card_brand: newCardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
      is_default: paymentMethods.length === 0, // Make default if it's the first card
      exp_month: expMonth,
      exp_year: 2000 + expYear
    }
    
    setPaymentMethods([...paymentMethods, newMethod])
    setMessage('Payment method added successfully')
    
    // Reset form
    setNewCardNumber('')
    setNewCardExpiry('')
    setNewCardCVC('')
    setNewCardName('')
    setIsAddingCard(false)
  }
  
  const handleMakeDefaultCard = (cardId: string) => {
    const updatedMethods = paymentMethods.map(method => ({
      ...method,
      is_default: method.id === cardId
    }))
    
    setPaymentMethods(updatedMethods)
    setMessage('Default payment method updated')
  }
  
  const handleDeleteCard = (cardId: string) => {
    const updatedMethods = paymentMethods.filter(method => method.id !== cardId)
    setPaymentMethods(updatedMethods)
    setMessage('Payment method removed')
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const handleJoinCommunity = () => {
    router.push('/community')
  }
  
  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }
  
  if (!user) {
    return <div className="flex justify-center p-8">Not authenticated. Please sign in first.</div>
  }
  
  const userInitials = user.email ? user.email.substring(0, 2).toUpperCase() : 'U'
  const currentMembership = MEMBERSHIP_TIERS.find(tier => tier.id === selectedMembership) || MEMBERSHIP_TIERS[0]
  
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-[#BB2124] text-white text-xl">{userInitials}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{fullName || 'New User'}</CardTitle>
              <CardDescription className="mt-1">
                {user.email}
                {selectedMembership && (
                  <Badge className={`ml-2 ${currentMembership.color} text-white`}>
                    {currentMembership.name}
                  </Badge>
                )}
              </CardDescription>
              
              <div className="mt-4 w-full">
                <Button 
                  variant="outline" 
                  className="w-full mb-2 flex items-center justify-center" 
                  onClick={handleJoinCommunity}
                >
                  <Award className="mr-2 h-4 w-4" /> Join Community
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleSignOut}
                >
                  <Key className="mr-2 h-4 w-4" /> Sign Out
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="profile">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="profile" className="flex items-center justify-center">
                <User className="mr-2 h-4 w-4" /> Profile
              </TabsTrigger>
              <TabsTrigger value="membership" className="flex items-center justify-center">
                <Award className="mr-2 h-4 w-4" /> Membership
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center justify-center">
                <CreditCardIcon className="mr-2 h-4 w-4" /> Payment
              </TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your profile information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email || ''}
                        disabled
                      />
                      <p className="text-sm text-muted-foreground">
                        Your email is used for sign-in and cannot be changed here.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Choose a unique username"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself"
                        rows={4}
                      />
                    </div>
                    
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    
                    {message && (
                      <Alert>
                        <AlertDescription>{message}</AlertDescription>
                      </Alert>
                    )}
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Updating...' : 'Update Profile'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Membership Tab */}
            <TabsContent value="membership">
              <Card>
                <CardHeader>
                  <CardTitle>Membership Plans</CardTitle>
                  <CardDescription>
                    Choose a membership tier to enhance your Kinkoasis experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    {MEMBERSHIP_TIERS.map((tier) => (
                      <Card 
                        key={tier.id} 
                        className={`border-2 ${selectedMembership === tier.id ? 'border-[#BB2124]' : 'border-transparent'}`}
                      >
                        <CardHeader className={`${tier.color} text-white rounded-t-lg`}>
                          <CardTitle className="text-center">{tier.name}</CardTitle>
                          <div className="text-center font-bold text-2xl">${tier.price}/mo</div>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <p className="text-sm mb-4">{tier.description}</p>
                          <ul className="space-y-2 mb-4">
                            {tier.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-[#BB2124] shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button
                            variant={selectedMembership === tier.id ? "outline" : "default"}
                            className="w-full"
                            disabled={loading || selectedMembership === tier.id}
                            onClick={() => handleUpgradeMembership(tier.id)}
                          >
                            {selectedMembership === tier.id ? 'Current Plan' : 'Select Plan'}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {profile?.membership_expiry && (
                    <div className="mt-6 text-center">
                      <p className="text-sm text-muted-foreground flex items-center justify-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Membership expires on: {new Date(profile.membership_expiry).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  
                  {error && (
                    <Alert variant="destructive" className="mt-6">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {message && (
                    <Alert className="mt-6">
                      <AlertDescription>{message}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Payment Tab */}
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your payment methods for membership and purchases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {paymentMethods.length > 0 ? (
                    <div className="space-y-4 mb-6">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <div className="mr-4">
                              {method.card_brand === 'Visa' ? (
                                <div className="bg-blue-600 text-white p-2 rounded-md">VISA</div>
                              ) : method.card_brand === 'Mastercard' ? (
                                <div className="bg-orange-600 text-white p-2 rounded-md">MC</div>
                              ) : (
                                <CreditCard className="h-8 w-8" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">
                                {method.card_brand} •••• {method.card_last4}
                                {method.is_default && (
                                  <Badge className="ml-2">Default</Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Expires {method.exp_month}/{method.exp_year}
                              </div>
                            </div>
                          </div>
                          <div className="space-x-2">
                            {!method.is_default && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleMakeDefaultCard(method.id)}
                              >
                                Make Default
                              </Button>
                            )}
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteCard(method.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed rounded-lg mb-6">
                      <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p>No payment methods added yet</p>
                    </div>
                  )}
                  
                  {isAddingCard ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>Add New Card</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleAddPaymentMethod} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Cardholder Name</Label>
                            <Input
                              id="cardName"
                              value={newCardName}
                              onChange={(e) => setNewCardName(e.target.value)}
                              placeholder="John Doe"
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              value={newCardNumber}
                              onChange={(e) => {
                                // Only allow digits and limit to 16 characters
                                const value = e.target.value.replace(/\D/g, '').slice(0, 16)
                                setNewCardNumber(value)
                              }}
                              placeholder="4242 4242 4242 4242"
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardExpiry">Expiry (MM/YY)</Label>
                              <Input
                                id="cardExpiry"
                                value={newCardExpiry}
                                onChange={(e) => {
                                  let value = e.target.value.replace(/[^\d/]/g, '')
                                  
                                  // Auto-format MM/YY
                                  if (value.length === 2 && !value.includes('/') && newCardExpiry.length !== 3) {
                                    value = value + '/'
                                  }
                                  
                                  // Limit to MM/YY format
                                  if (value.length <= 5) {
                                    setNewCardExpiry(value)
                                  }
                                }}
                                placeholder="MM/YY"
                                required
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="cardCVC">CVC</Label>
                              <Input
                                id="cardCVC"
                                value={newCardCVC}
                                onChange={(e) => {
                                  // Only allow digits and limit to 3-4 characters
                                  const value = e.target.value.replace(/\D/g, '').slice(0, 4)
                                  setNewCardCVC(value)
                                }}
                                placeholder="123"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-2 pt-2">
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={() => setIsAddingCard(false)}
                            >
                              Cancel
                            </Button>
                            <Button type="submit">Add Card</Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => setIsAddingCard(true)}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Add Payment Method
                    </Button>
                  )}
                  
                  {error && (
                    <Alert variant="destructive" className="mt-6">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {message && (
                    <Alert className="mt-6">
                      <AlertDescription>{message}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 