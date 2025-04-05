"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuth } from '@/context/auth-context'
import { createClient } from '@/app/lib/supabase/client'
import { MessageCircle, Users, Calendar, Award, Star, Info, UserPlus, Lock, Globe, MapPin, Share, Search, User, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Input } from '@/components/ui/input'

type Profile = {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  membership_tier: string | null
  community_level: string | null
  community_joined: boolean | null
  community_join_date: string | null
}

type CommunityEvent = {
  id: string
  title: string
  description: string
  date: string
  location: string
  isVirtual: boolean
  membershipRequired: string | null
  image: string
  attendees: number
}

type DiscussionTopic = {
  id: string
  title: string
  category: string
  author: {
    name: string
    avatar: string
  }
  replies: number
  views: number
  lastActivity: string
  isLocked: boolean
  isPinned: boolean
}

const MOCK_EVENTS: CommunityEvent[] = [
  {
    id: 'event1',
    title: 'Introduction to BDSM Safety',
    description: 'A beginner-friendly workshop covering the essentials of BDSM safety, consent, and communication.',
    date: '2023-12-15T18:00:00',
    location: 'Kinkoasis Main Studio',
    isVirtual: false,
    membershipRequired: 'standard',
    image: '/images/events/workshop.jpg',
    attendees: 24
  },
  {
    id: 'event2',
    title: 'Virtual Rope Technique Masterclass',
    description: 'Learn advanced rope techniques from master practitioners in this online session.',
    date: '2023-12-20T19:00:00',
    location: 'Zoom',
    isVirtual: true,
    membershipRequired: 'premium',
    image: '/images/events/rope.jpg',
    attendees: 42
  },
  {
    id: 'event3',
    title: 'VIP Social Mixer',
    description: 'Exclusive networking event for VIP members with drinks, snacks, and special demonstrations.',
    date: '2023-12-30T20:00:00',
    location: 'Kinkoasis Lounge',
    isVirtual: false,
    membershipRequired: 'vip',
    image: '/images/events/mixer.jpg',
    attendees: 18
  }
]

const MOCK_TOPICS: DiscussionTopic[] = [
  {
    id: 'topic1',
    title: 'Newcomers Introduction Thread',
    category: 'General',
    author: {
      name: 'KinkModerator',
      avatar: '/images/avatars/mod.jpg'
    },
    replies: 156,
    views: 2345,
    lastActivity: '2023-12-01T14:23:00',
    isLocked: false,
    isPinned: true
  },
  {
    id: 'topic2',
    title: 'Product Review: New Rope Collection',
    category: 'Reviews',
    author: {
      name: 'RopeMaster42',
      avatar: '/images/avatars/user1.jpg'
    },
    replies: 28,
    views: 412,
    lastActivity: '2023-12-05T09:17:00',
    isLocked: false,
    isPinned: false
  },
  {
    id: 'topic3',
    title: 'December Community Challenge',
    category: 'Events',
    author: {
      name: 'CommunityLead',
      avatar: '/images/avatars/lead.jpg'
    },
    replies: 89,
    views: 1204,
    lastActivity: '2023-12-03T18:05:00',
    isLocked: false,
    isPinned: true
  },
  {
    id: 'topic4',
    title: 'Safety Guidelines - MUST READ',
    category: 'Announcements',
    author: {
      name: 'KinkModerator',
      avatar: '/images/avatars/mod.jpg'
    },
    replies: 42,
    views: 3789,
    lastActivity: '2023-11-28T11:30:00',
    isLocked: true,
    isPinned: true
  }
]

const COMMUNITY_LEVELS = [
  { name: 'Newcomer', color: 'bg-slate-500', minPosts: 0 },
  { name: 'Explorer', color: 'bg-blue-500', minPosts: 10 },
  { name: 'Enthusiast', color: 'bg-purple-500', minPosts: 50 },
  { name: 'Devotee', color: 'bg-pink-600', minPosts: 100 },
  { name: 'Maven', color: 'bg-amber-500', minPosts: 250 },
  { name: 'Guru', color: 'bg-[#BB2124]', minPosts: 500 }
]

export function CommunityPage() {
  const { user } = useAuth()
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [recentMembers, setRecentMembers] = useState<Profile[]>([])
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [hasJoined, setHasJoined] = useState(false)
  
  useEffect(() => {
    async function loadData() {
      setLoading(true)
      
      if (!user) {
        setLoading(false)
        return
      }
      
      try {
        // Load user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
          
        if (profileError) {
          console.error('Error fetching profile:', profileError)
        } else if (profileData) {
          setProfile(profileData)
          setHasJoined(profileData.community_joined || false)
        }
        
        // Load recent community members
        const { data: membersData, error: membersError } = await supabase
          .from('profiles')
          .select('id, username, full_name, avatar_url, community_level, community_join_date')
          .eq('community_joined', true)
          .order('community_join_date', { ascending: false })
          .limit(8)
          
        if (membersError) {
          console.error('Error fetching members:', membersError)
        } else if (membersData) {
          setRecentMembers(membersData)
        }
      } catch (error) {
        console.error('Error loading community data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [supabase, user])
  
  const handleJoinCommunity = async () => {
    if (!user) {
      router.push('/auth/sign-in')
      return
    }
    
    setLoading(true)
    
    try {
      const updates = {
        id: user.id,
        community_joined: true,
        community_join_date: new Date().toISOString(),
        community_level: 'newcomer',
        updated_at: new Date().toISOString(),
      }
      
      const { error } = await supabase
        .from('profiles')
        .upsert(updates)
        .eq('id', user.id)
        
      if (error) {
        setError(error.message)
      } else {
        setMessage('Welcome to the Kinkoasis community!')
        setHasJoined(true)
        
        // Refresh profile data
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
          
        if (data) {
          setProfile(data)
        }
        
        // Redirect to community page
        router.push('/community')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  if (loading) {
    return <div className="container py-8 text-center">Loading community data...</div>
  }
  
  return (
    <div className="container max-w-6xl py-8 kinko-animate-fade-in">
      {/* Enhanced Community Header */}
      <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
        <div className="kinko-gradient-bg kinko-pattern-bg relative p-0">
          {/* Top image banner - decorative */}
          <div className="h-24 md:h-32 w-full bg-center bg-cover opacity-50"
               style={{backgroundImage: "url('/images/community-banner.jpg')"}}></div>
          
          {/* Content section */}
          <div className="relative px-6 md:px-10 py-8 md:py-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white flex items-center">
              <Award className="mr-3 h-7 w-7" />
              Kinkoasis Community
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mb-8 text-white">
              Connect with fellow enthusiasts, share experiences, and discover new practices in a safe, 
              supportive environment dedicated to exploration and education.
            </p>
            
            <div className="flex flex-wrap gap-3 items-center">
              {!user ? (
                <>
                  <Button 
                    onClick={() => router.push('/auth/sign-in')}
                    className="bg-white text-[#BB2124] hover:bg-gray-100 px-6 py-5 shadow-md"
                    size="lg"
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    Sign In to Join
                  </Button>
                  <span className="text-white md:ml-4 opacity-90">
                    New to Kinkoasis? <button className="underline font-medium" onClick={() => router.push('/auth/sign-up')}>Create an account</button>
                  </span>
                </>
              ) : !hasJoined ? (
                <Button 
                  onClick={handleJoinCommunity}
                  className="bg-white text-[#BB2124] hover:bg-gray-100 shadow-md group px-6 py-5 transition-all duration-300"
                  size="lg"
                  disabled={loading}
                >
                  <UserPlus className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  {loading ? 'Joining...' : 'Join Our Community'}
                </Button>
              ) : (
                <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-lg p-4 flex flex-col md:flex-row md:items-center text-white">
                  <Badge className="bg-white text-[#BB2124] text-sm px-3 py-1 mb-2 md:mb-0 md:mr-4">Member</Badge>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 opacity-75" />
                    <span>
                      Joined on {profile?.community_join_date ? new Date(profile.community_join_date).toLocaleDateString() : 'recently'}
                    </span>
                  </div>
                  
                  {profile?.community_level && (
                    <div className="flex items-center md:ml-6 mt-2 md:mt-0">
                      <Award className="h-4 w-4 mr-2 opacity-75" />
                      <span>Level: {profile.community_level?.charAt(0).toUpperCase() + profile.community_level?.slice(1)}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Community statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 text-white">
              <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold">{recentMembers.length > 0 ? '100+' : '0'}</div>
                <div className="text-sm opacity-80">Members</div>
              </div>
              <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold">{MOCK_TOPICS.length}</div>
                <div className="text-sm opacity-80">Discussions</div>
              </div>
              <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold">{MOCK_EVENTS.length}</div>
                <div className="text-sm opacity-80">Events</div>
              </div>
              <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold">{COMMUNITY_LEVELS.length}</div>
                <div className="text-sm opacity-80">Achievement Levels</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-6 animate-in fade-in slide-in-from-top-5 duration-300">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {message && (
        <Alert className="mb-6 bg-green-50 text-green-800 border-green-300 animate-in fade-in slide-in-from-top-5 duration-300">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      
      {/* Main Community Content */}
      <Tabs defaultValue="discussions">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="discussions" className="flex items-center justify-center">
            <MessageCircle className="mr-2 h-4 w-4" /> Discussions
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center justify-center">
            <Calendar className="mr-2 h-4 w-4" /> Events
          </TabsTrigger>
          <TabsTrigger value="members" className="flex items-center justify-center">
            <Users className="mr-2 h-4 w-4" /> Members
          </TabsTrigger>
          <TabsTrigger value="levels" className="flex items-center justify-center">
            <Award className="mr-2 h-4 w-4" /> Community Levels
          </TabsTrigger>
        </TabsList>
      
        {/* Discussions Tab */}
        <TabsContent value="discussions" className="kinko-animate-slide-up">
          <div className="grid grid-cols-1 gap-6">
            <Card className="border-0 shadow-md">
              <CardHeader className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="mr-2 h-5 w-5 text-[#BB2124]" />
                      Discussion Forums
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Join conversations with fellow community members
                    </CardDescription>
                  </div>
                  
                  {/* Filter/Search dropdown could go here */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="hidden md:flex">
                      <Users className="h-4 w-4 mr-2" /> Active
                    </Button>
                    <Button variant="outline" size="sm" className="hidden md:flex">
                      <Calendar className="h-4 w-4 mr-2" /> Recent
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {/* Topic categories */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-4 border-b">
                  <Badge variant="outline" className="whitespace-nowrap cursor-pointer bg-[#BB2124]/10">All Topics</Badge>
                  <Badge variant="outline" className="whitespace-nowrap cursor-pointer">General</Badge>
                  <Badge variant="outline" className="whitespace-nowrap cursor-pointer">Announcements</Badge>
                  <Badge variant="outline" className="whitespace-nowrap cursor-pointer">Reviews</Badge>
                  <Badge variant="outline" className="whitespace-nowrap cursor-pointer">Events</Badge>
                  <Badge variant="outline" className="whitespace-nowrap cursor-pointer">Questions</Badge>
                </div>
              
                <div className="space-y-4">
                  {MOCK_TOPICS.map((topic) => (
                    <div 
                      key={topic.id} 
                      className={`p-4 border rounded-lg hover:bg-slate-50 cursor-pointer transition-all duration-200 ${
                        topic.isPinned ? 'border-[#BB2124]/30 bg-[#BB2124]/5' : ''
                      } kinko-card-hover`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-2">
                            {topic.isPinned && (
                              <div className="bg-[#BB2124]/10 text-[#BB2124] text-xs px-2 py-0.5 rounded-full font-medium flex items-center mr-2">
                                <Star className="h-3 w-3 mr-1" /> Pinned
                              </div>
                            )}
                            <h3 className="font-medium text-lg">{topic.title}</h3>
                            {topic.isLocked && (
                              <div className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full font-medium flex items-center ml-2">
                                <Lock className="h-3 w-3 mr-1" /> Locked
                              </div>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground gap-2">
                            <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors py-0">
                              {topic.category}
                            </Badge>
                            <span className="flex items-center text-xs">
                              <MessageCircle className="h-3 w-3 mr-1 inline" />
                              {topic.replies} {topic.replies === 1 ? 'reply' : 'replies'}
                            </span>
                            <span className="flex items-center text-xs">
                              <Users className="h-3 w-3 mr-1 inline" />
                              {topic.views} views
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100">
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarFallback>{topic.author.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">
                            {topic.author.name}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Last activity: {new Date(topic.lastActivity).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Showing 4 of 120 discussions
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm" className="bg-[#BB2124]/10">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <Button 
                  className="px-8" 
                  disabled={!hasJoined}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {hasJoined ? 'Start a New Discussion' : 'Join Community to Participate'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      
        {/* Events Tab */}
        <TabsContent value="events" className="kinko-animate-slide-up">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-4 border-b">
              <div>
                <h2 className="text-2xl font-bold flex items-center mb-2">
                  <Calendar className="mr-2 h-5 w-5 text-[#BB2124]" />
                  Upcoming Events
                </h2>
                <p className="text-muted-foreground">
                  Join our community events, workshops, and social gatherings
                </p>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm" className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-slate-600 mr-2"></span> All
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-[#BB2124] mr-2"></span> VIP
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-purple-600 mr-2"></span> Premium
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_EVENTS.map((event) => (
                <Card key={event.id} className="overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-lg group kinko-card-hover">
                  <div className="h-48 bg-slate-100 relative overflow-hidden">
                    {/* If we had actual images, would use Image component here */}
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-b from-slate-200 to-slate-100">
                      <Calendar className="h-16 w-16 opacity-50" />
                    </div>
                    
                    {/* Event date badge */}
                    <div className="absolute top-4 left-4 bg-white shadow-md rounded-lg p-2 text-center min-w-16">
                      <div className="text-lg font-bold text-[#BB2124]">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-xs text-gray-600">
                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                      </div>
                    </div>
                    
                    {/* Membership badge */}
                    {event.membershipRequired && (
                      <div className="absolute top-4 right-4">
                        <Badge 
                          className={
                            event.membershipRequired === 'standard' ? 'bg-slate-600' :
                            event.membershipRequired === 'premium' ? 'bg-purple-600' :
                            'bg-[#BB2124]'
                          }
                        >
                          {event.membershipRequired.charAt(0).toUpperCase() + event.membershipRequired.slice(1)}
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                    </div>
                    <CardDescription>
                      <div className="flex items-center text-sm mt-2">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        {event.isVirtual ? (
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                            Virtual Event
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            {event.location}
                          </div>
                        )}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm line-clamp-3 mb-4">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {/* Attendee avatars - would be real in production */}
                        {Array(3).fill(0).map((_, i) => (
                          <div key={i} className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                            {['JD', 'KM', 'TS'][i]}
                          </div>
                        ))}
                        {event.attendees > 3 && (
                          <div className="h-8 w-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-medium">
                            +{event.attendees - 3}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {event.attendees} attending
                      </span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <Button 
                      variant="default"
                      size="sm"
                      disabled={!hasJoined}
                      className="flex-1"
                    >
                      {hasJoined ? 'RSVP' : 'Join to RSVP'}
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="ml-2"
                    >
                      <Share className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {/* View more events button */}
            <div className="mt-8 text-center">
              <Button variant="outline" className="px-8">
                <Calendar className="mr-2 h-4 w-4" />
                View All Events
              </Button>
            </div>
          </div>
        </TabsContent>
      
        {/* Members Tab */}
        <TabsContent value="members" className="kinko-animate-slide-up">
          <Card className="border-0 shadow-md">
            <CardHeader className="border-b pb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-[#BB2124]" /> 
                    Community Members
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Connect with fellow enthusiasts in our growing community
                  </CardDescription>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      className="pl-9 w-full md:w-auto" 
                      placeholder="Search members..." 
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6 flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-[#BB2124]/10 hover:bg-[#BB2124]/20 cursor-pointer">All Members</Badge>
                <Badge variant="outline" className="hover:bg-slate-100 cursor-pointer">Recently Joined</Badge>
                <Badge variant="outline" className="hover:bg-slate-100 cursor-pointer">Most Active</Badge>
                <Badge variant="outline" className="hover:bg-slate-100 cursor-pointer">VIP</Badge>
              </div>
            
              {recentMembers.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {recentMembers.map((member) => (
                      <div 
                        key={member.id} 
                        className="flex flex-col items-center text-center p-4 border rounded-lg hover:border-[#BB2124]/30 hover:bg-slate-50 cursor-pointer transition-all duration-200 kinko-card-hover"
                      >
                        <Avatar className="h-20 w-20 mb-3">
                          <AvatarImage src={member.avatar_url || undefined} />
                          <AvatarFallback className="bg-[#BB2124]/80 text-white text-lg">
                            {member.username?.substring(0, 2).toUpperCase() || 
                             member.full_name?.substring(0, 2).toUpperCase() || 'KO'}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="font-medium text-lg">{member.username || member.full_name || 'Kinkoasis User'}</div>
                        
                        <Badge 
                          className={`mt-2 ${
                            member.community_level === 'newcomer' ? 'bg-slate-500' :
                            member.community_level === 'explorer' ? 'bg-blue-500' :
                            member.community_level === 'enthusiast' ? 'bg-purple-500' :
                            member.community_level === 'devotee' ? 'bg-pink-600' :
                            member.community_level === 'maven' ? 'bg-amber-500' :
                            'bg-[#BB2124]'
                          }`}
                        >
                          {member.community_level ? 
                            `${member.community_level.charAt(0).toUpperCase()}${member.community_level.slice(1)}` 
                            : 'Member'}
                        </Badge>
                        
                        <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>
                            Joined {member.community_join_date ? 
                              new Date(member.community_join_date).toLocaleDateString() : 
                              'recently'}
                          </span>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-4 w-full text-xs"
                        >
                          View Profile
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Pagination controls */}
                  <div className="flex justify-between items-center mt-8 pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Showing 8 of {recentMembers.length > 8 ? '100+' : recentMembers.length} members
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" disabled>Previous</Button>
                      <Button variant="outline" size="sm" className="bg-[#BB2124]/10">1</Button>
                      <Button variant="outline" size="sm">2</Button>
                      <Button variant="outline" size="sm">3</Button>
                      <Button variant="outline" size="sm">Next</Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-16 text-center text-muted-foreground">
                  <Users className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <h3 className="text-xl font-medium mb-2">No Members Yet</h3>
                  <p className="max-w-md mx-auto mb-6">
                    Be the first to join our community and start connecting with like-minded enthusiasts.
                  </p>
                  <Button onClick={handleJoinCommunity} disabled={!user || loading}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    {loading ? 'Processing...' : 'Join Community'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      
        {/* Community Levels Tab */}
        <TabsContent value="levels" className="kinko-animate-slide-up">
          <Card className="border-0 shadow-md">
            <CardHeader className="border-b pb-4">
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-[#BB2124]" /> 
                Community Levels
              </CardTitle>
              <CardDescription className="mt-1">
                Participate in discussions and events to increase your community level and unlock benefits
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Current level card */}
              {profile?.community_level && (
                <div className="mb-8 p-6 border rounded-xl bg-gradient-to-r from-[#BB2124]/5 to-purple-500/5 relative overflow-hidden">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-1">Your Current Level</h3>
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 text-white font-bold ${
                          profile.community_level === 'newcomer' ? 'bg-slate-500' :
                          profile.community_level === 'explorer' ? 'bg-blue-500' :
                          profile.community_level === 'enthusiast' ? 'bg-purple-500' :
                          profile.community_level === 'devotee' ? 'bg-pink-600' :
                          profile.community_level === 'maven' ? 'bg-amber-500' :
                          'bg-[#BB2124]'
                        }`}>
                          {COMMUNITY_LEVELS.findIndex(level => 
                            level.name.toLowerCase() === profile.community_level
                          ) + 1}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{profile.community_level?.charAt(0).toUpperCase() + profile.community_level?.slice(1)}</h2>
                          <p className="text-sm text-muted-foreground">Keep participating to reach the next level</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-2/5">
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#BB2124] rounded-full" 
                             style={{ width: `${Math.min(100, Math.random() * 100)}%` }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-2">
                        <span>0 posts</span>
                        <span>Next level: 50 posts</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-[#BB2124]/10 z-0"></div>
                  <div className="absolute right-12 -bottom-6 w-16 h-16 rounded-full bg-purple-500/10 z-0"></div>
                </div>
              )}
              
              {/* All levels */}
              <div>
                <h3 className="text-lg font-medium mb-4">All Community Levels</h3>
                <div className="space-y-6">
                  {COMMUNITY_LEVELS.map((level, index) => (
                    <div 
                      key={level.name} 
                      className={`flex items-center p-4 rounded-lg transition-colors ${
                        profile?.community_level === level.name.toLowerCase() 
                          ? 'bg-[#BB2124]/5 border border-[#BB2124]/20' 
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className={`${level.color} text-white h-14 w-14 rounded-full flex items-center justify-center mr-5 text-xl font-bold shrink-0`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="font-medium text-lg">{level.name}</h3>
                          {profile?.community_level === level.name.toLowerCase() && (
                            <Badge className="ml-2 bg-[#BB2124]">Current Level</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {level.minPosts} {index === 0 ? 'posts to start' : `posts required`}
                        </p>
                        
                        {/* Level benefits */}
                        <div className="mt-2 flex flex-wrap gap-2">
                          {[
                            'Access to discussions',
                            index > 0 ? 'Create new topics' : null,
                            index > 1 ? 'Exclusive resources' : null,
                            index > 2 ? 'Private events access' : null,
                            index > 3 ? 'Mentor program' : null,
                            index > 4 ? 'VIP membership discount' : null
                          ].filter(Boolean).map((benefit, i) => (
                            <span key={i} className="inline-flex items-center text-xs px-2 py-1 bg-slate-100 rounded-full">
                              <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {profile?.community_level !== level.name.toLowerCase() && index > 0 && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="shrink-0 ml-2"
                          disabled={!hasJoined}
                        >
                          How to Reach
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-slate-50 rounded-lg border">
                <div className="flex items-start">
                  <Info className="h-5 w-5 mr-3 mt-0.5 text-[#BB2124]" />
                  <div>
                    <h4 className="font-medium text-lg mb-2">How to Level Up</h4>
                    <p className="text-muted-foreground mb-4">
                      Your community level increases automatically as you participate in discussions, 
                      attend events, and contribute to the community. Higher levels unlock additional 
                      benefits and features.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <MessageCircle className="h-4 w-4 mr-2 text-[#BB2124]" />
                        <span><strong>Create discussions</strong> - Start new topics or reply to existing ones</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-[#BB2124]" />
                        <span><strong>Attend events</strong> - Join our workshops and social gatherings</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Award className="h-4 w-4 mr-2 text-[#BB2124]" />
                        <span><strong>Complete challenges</strong> - Participate in our monthly community challenges</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 