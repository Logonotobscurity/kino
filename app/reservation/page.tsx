"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MotionBackground } from "@/components/motion-background"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, Info, CheckCircle, AlertCircle, Star, Zap, Shield, Users, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCartContext } from "@/context/cart-context"
import { addRoomToCheckout } from "@/lib/checkout-helper"

interface Room {
  id: string
  name: string
  description: string
  capacity: number
  price: number
  images: string[]
  features: string[]
  category: string
  popular?: boolean
  bestValue?: boolean
}

export default function ReservationPage() {
  const { addToCart, clearCart } = useCartContext()
  // Sample rooms data
  const rooms: Room[] = [
    {
      id: "room1",
      name: "The Red Room",
      description: "Our most popular space featuring premium leather furnishings, adjustable lighting, and comprehensive equipment. Perfect for a wide range of activities.",
      capacity: 4,
      price: 120,
      images: ["/placeholder.svg?height=500&width=800"],
      features: [
        "Premium leather furnishings",
        "Fully adjustable lighting system",
        "Climate controlled environment",
        "Sound system with Bluetooth connectivity",
        "Private bathroom and shower",
        "Comprehensive equipment selection"
      ],
      category: "Standard",
      popular: true
    },
    {
      id: "room2",
      name: "The Suspension Studio",
      description: "Specialized space with reinforced suspension points, versatile rigging options, and ample floor space. Ideal for rope work and aerial activities.",
      capacity: 6,
      price: 150,
      images: ["/placeholder.svg?height=500&width=800"],
      features: [
        "Multiple reinforced suspension points",
        "Versatile rigging options",
        "Padded flooring",
        "Rope storage and prep area",
        "Full-length mirrors",
        "Emergency quick-release equipment"
      ],
      category: "Standard"
    },
    {
      id: "room3",
      name: "The Sensory Suite",
      description: "Designed for sensory exploration with temperature-controlled surfaces, sound isolation, and specialized lighting. A unique space for sensory play.",
      capacity: 2,
      price: 100,
      images: ["/placeholder.svg?height=500&width=800"],
      features: [
        "Complete sound isolation",
        "Temperature-controlled surfaces",
        "Sensory equipment collection",
        "Specialized lighting options",
        "Integrated music and sound effects",
        "Ultra-comfortable resting area"
      ],
      category: "Standard",
      bestValue: true
    },
    {
      id: "dungeon1",
      name: "The Medieval Dungeon",
      description: "Step back in time with our authentically styled medieval dungeon space. Features stone-textured walls, wooden beams, and period-inspired equipment for an immersive experience.",
      capacity: 4,
      price: 180,
      images: ["/placeholder.svg?height=500&width=800"],
      features: [
        "Medieval-inspired décor and atmosphere",
        "Authentic wooden rack and stocks",
        "Stone-textured walls and flooring",
        "Torchlike adjustable lighting",
        "Period-appropriate restraint systems",
        "Climate-controlled environment"
      ],
      category: "Dungeon",
      popular: true
    },
    {
      id: "dungeon2",
      name: "The Industrial Dungeon",
      description: "Raw, urban aesthetics meet functionality in our industrial-themed dungeon. This space features exposed pipes, metal fixtures, and a versatile layout for edge play scenarios.",
      capacity: 6,
      price: 200,
      images: ["/placeholder.svg?height=500&width=800"],
      features: [
        "Industrial-grade fixtures and hardware",
        "Multiple anchor points and suspension options",
        "Concrete and metal aesthetic",
        "Water-resistant surfaces for wet play",
        "Specialized electrical play capabilities",
        "Modular equipment configuration"
      ],
      category: "Dungeon"
    },
    {
      id: "dungeon3",
      name: "The Luxury Dungeon Suite",
      description: "Our premium dungeon offering combines opulence with functionality. Featuring high-end finishes, comprehensive equipment, and luxurious amenities for extended sessions.",
      capacity: 8,
      price: 250,
      images: ["/placeholder.svg?height=500&width=800"],
      features: [
        "Premium bondage furniture and equipment",
        "Luxury lounge area for breaks and discussions",
        "Full bathroom with shower facilities",
        "Kitchenette for longer sessions",
        "High-end sound system and atmospheric controls",
        "Enhanced privacy features and soundproofing"
      ],
      category: "Dungeon",
      bestValue: true
    }
  ]

  // State for form values
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    roomId: "",
    date: "",
    timeSlot: "",
    duration: "2",
    participants: "2",
    notes: "",
    agreeTerms: false
  })

  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeRoomTab, setActiveRoomTab] = useState("Standard")
  const [activeRoom, setActiveRoom] = useState(rooms[0].id)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

  // Available time slots
  const timeSlots = ["12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM", "10:00 PM"]

  // Filter rooms by category
  const filteredRooms = rooms.filter(room => room.category === activeRoomTab)

  // Set first room of category when switching tabs
  useEffect(() => {
    if (filteredRooms.length > 0) {
      setActiveRoom(filteredRooms[0].id)
    }
  }, [activeRoomTab])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Get the selected room
    const room = getRoomById(formState.roomId || activeRoom)
    if (room) {
      // Add room to checkout
      addRoomToCheckout({
        id: room.id,
        name: room.name,
        price: room.price,
        image: room.images[0],
        duration: parseInt(formState.duration)
      })
    }
    
    // Redirect to checkout
    setTimeout(() => {
      setIsSubmitting(false)
      window.location.href = '/checkout'
    }, 1000)
  }

  const getRoomById = (id: string) => {
    return rooms.find(room => room.id === id)
  }

  const selectedRoom = getRoomById(activeRoom)

  return (
    <main className="min-h-screen flex flex-col bg-[#121212] relative pt-24 pb-16">
      <MotionBackground particleCount={10} />
      
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#BB2124" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span className="text-[#BB2124]">
              Private Space Reservation
            </span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto font-medium">
            Book our private, fully-equipped spaces for your personal exploration and enjoyment.
          </p>
        </motion.div>

        {/* Room Type Information */}
        <motion.div
          className="mb-10 bg-[#121212] rounded-xl p-6 border border-[#333] shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Room Types</h2>
              <p className="text-gray-300 mb-6">
                We offer two distinct categories of private spaces to accommodate your specific needs and preferences:
              </p>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#BB2124]/10 flex items-center justify-center mr-4">
                    <Star className="h-6 w-6 text-[#BB2124]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Standard Rooms</h3>
                    <p className="text-gray-400">
                      Versatile spaces designed for comfort and functionality, perfect for beginners and those seeking a welcoming environment.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#BB2124]/10 flex items-center justify-center mr-4">
                    <Zap className="h-6 w-6 text-[#BB2124]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Dungeon Rooms</h3>
                    <p className="text-gray-400">
                      Specialized theme rooms with advanced equipment and features for immersive experiences and more intensive scenarios.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="bg-[#222] p-6 rounded-lg border border-[#444] shadow-inner max-w-md">
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 text-[#BB2124] mr-2" />
                  <h3 className="text-lg font-bold text-white">Our Commitment</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  All our spaces are meticulously maintained with your safety, privacy, and comfort as our highest priorities.
                </p>
                <ul className="space-y-2">
                  {[
                    "Thorough cleaning between each reservation",
                    "Regular equipment safety inspections",
                    "Soundproofing for complete privacy",
                    "Emergency assistance always available",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#BB2124] mr-2 mt-1" />
                      <span className="text-gray-400 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-[#333]">
                  <button 
                    onClick={() => setIsInfoModalOpen(true)}
                    className="text-[#BB2124] hover:text-[#F03A3E] text-sm flex items-center"
                  >
                    <Info className="h-4 w-4 mr-1" /> 
                    Learn more about our room types
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Room Categories Tabs */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="flex flex-wrap justify-center gap-6">
            {["Standard", "Dungeon"].map(category => (
              <motion.button
                key={category}
                onClick={() => setActiveRoomTab(category)}
                className={`px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 shadow-lg flex items-center ${
                  activeRoomTab === category 
                    ? 'bg-[#BB2124] text-black shadow-[0_0_15px_rgba(187,33,36,0.4)]' 
                    : 'bg-[#1A1A1A] text-white border border-[#333] hover:border-[#BB2124]'
                }`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                {category === "Standard" ? (
                  <Star className={`h-5 w-5 ${activeRoomTab === category ? 'text-black' : 'text-[#BB2124]'} mr-2`} />
                ) : (
                  <Zap className={`h-5 w-5 ${activeRoomTab === category ? 'text-black' : 'text-[#BB2124]'} mr-2`} />
                )}
                {category} Rooms
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Room Grid View */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Available {activeRoomTab} Rooms</h2>
            <p className="text-gray-400">{filteredRooms.length} options</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {filteredRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className={`bg-[#1A1A1A] rounded-xl overflow-hidden border ${
                  activeRoom === room.id ? 'border-[#BB2124]' : 'border-[#333]'
                } cursor-pointer transition-all duration-300 shadow-lg`}
                onClick={() => setActiveRoom(room.id)}
              >
                <div className="relative w-full h-48">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  
                  {/* Room badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {room.popular && (
                      <div className="bg-[#BB2124] text-black px-3 py-1 rounded-full text-xs font-bold flex items-center">
                        <Star className="h-3 w-3 mr-1" /> Popular
                      </div>
                    )}
                    {room.bestValue && (
                      <div className="bg-[#38a169] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                        <Zap className="h-3 w-3 mr-1" /> Best Value
                      </div>
                    )}
                  </div>
                  
                  {/* Selection indicator */}
                  {activeRoom === room.id && (
                    <div className="absolute inset-0 bg-[#BB2124]/10 border-2 border-[#BB2124]"></div>
                  )}
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{room.name}</h3>
                    <div className="flex flex-col items-end">
                      <span className="text-[#BB2124] font-bold">${room.price}</span>
                      <span className="text-xs text-gray-500">per hour</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{room.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Up to {room.capacity} guests</span>
                    </div>
                    
                    <Button 
                      className={`${
                        activeRoom === room.id 
                          ? 'bg-[#BB2124] hover:bg-[#8A1619] text-black' 
                          : 'bg-[#333] hover:bg-[#444] text-white'
                      }`}
                      onClick={() => setActiveRoom(room.id)}
                    >
                      {activeRoom === room.id ? 'Selected' : 'Select'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Selected Room Details */}
          {selectedRoom && (
            <motion.div
              className="bg-[#121212] rounded-xl overflow-hidden border border-[#333] shadow-xl mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-80 lg:h-full min-h-[320px]">
                  <Image
                    src={selectedRoom.images[0]}
                    alt={selectedRoom.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#121212]/80"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedRoom.name}</h2>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center text-white">
                          <Users className="h-4 w-4 mr-2" />
                          <span>Up to {selectedRoom.capacity}</span>
                        </div>
                        <div className="bg-[#BB2124]/20 text-[#BB2124] px-3 py-1 rounded-full text-sm">
                          {selectedRoom.category}
                        </div>
                      </div>
                      <div className="text-xl font-bold text-[#BB2124]">${selectedRoom.price}/hr</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <p className="text-gray-300 mb-6">{selectedRoom.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-4">Key Features:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedRoom.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-[#BB2124] mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-6">
                    <Link href="/checkout">
                      <Button 
                        className="bg-[#BB2124] hover:bg-[#8A1619] text-black px-8 py-6 rounded-lg text-lg font-bold"
                      >
                        Reserve This Space
                      </Button>
                    </Link>
                    
                    <Link href="#" target="_blank">
                      <Button 
                        className="bg-transparent border border-[#BB2124] text-[#BB2124] hover:bg-[#BB2124]/10 px-6 py-6 rounded-lg text-lg font-bold"
                      >
                        Virtual Tour <ExternalLink className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* Booking Form */}
        <motion.section
          id="booking-form"
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#333] shadow-xl">
            <div className="p-8 border-b border-[#333]">
              <h2 className="text-2xl font-bold text-white mb-4">Complete Your Reservation</h2>
              <p className="text-gray-400">
                Fill in the details below to book {selectedRoom?.name} for your private session.
              </p>
            </div>
            
            {isSubmitted ? (
              <motion.div 
                className="p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#BB2124]/10 rounded-full mb-6">
                  <CheckCircle className="h-10 w-10 text-[#BB2124]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Reservation Submitted!</h3>
                <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                  Thank you for your reservation request. We'll review your details and confirm your booking via email within 24 hours. A confirmation with access instructions will be sent to your email address.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    onClick={() => setIsSubmitted(false)} 
                    className="bg-[#BB2124] hover:bg-[#8A1619] text-black px-6 py-2 rounded-lg"
                  >
                    Make Another Reservation
                  </Button>
                  <Link href="/">
                    <Button className="bg-transparent border border-[#BB2124] text-[#BB2124] hover:bg-[#BB2124]/10 px-6 py-2 rounded-lg">
                      Return to Homepage
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Personal Information */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-white border-b border-[#333] pb-2 mb-4">Personal Information</h3>
                      
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full p-3 bg-[#222] border border-[#444] rounded-lg focus:ring-2 focus:ring-[#BB2124] focus:border-[#BB2124] outline-none text-white"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full p-3 bg-[#222] border border-[#444] rounded-lg focus:ring-2 focus:ring-[#BB2124] focus:border-[#BB2124] outline-none text-white"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formState.phone}
                          onChange={handleChange}
                          className="w-full p-3 bg-[#222] border border-[#444] rounded-lg focus:ring-2 focus:ring-[#BB2124] focus:border-[#BB2124] outline-none text-white"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                    </div>
                    
                    {/* Reservation Details */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-white border-b border-[#333] pb-2 mb-4">Reservation Details</h3>
                      
                      <div>
                        <label htmlFor="roomId" className="block text-sm font-medium text-gray-300 mb-2">
                          Selected Space
                        </label>
                        <select
                          id="roomId"
                          name="roomId"
                          required
                          value={formState.roomId || selectedRoom?.id || ""}
                          onChange={handleChange}
                          className="w-full p-3 bg-[#222] border border-[#444] rounded-lg focus:ring-2 focus:ring-[#BB2124] focus:border-[#BB2124] outline-none text-white"
                        >
                          <option value="">Select a space</option>
                          {rooms.map(room => (
                            <option key={room.id} value={room.id}>
                              {room.name} - ${room.price}/hour
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          required
                          value={formState.date}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full p-3 bg-[#222] border border-[#444] rounded-lg focus:ring-2 focus:ring-[#BB2124] focus:border-[#BB2124] outline-none text-white"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-300 mb-2">
                            Start Time
                          </label>
                          <select
                            id="timeSlot"
                            name="timeSlot"
                            required
                            value={formState.timeSlot}
                            onChange={handleChange}
                            className="w-full p-3 bg-[#222] border border-[#444] rounded-lg focus:ring-2 focus:ring-[#BB2124] focus:border-[#BB2124] outline-none text-white"
                          >
                            <option value="">Select time</option>
                            {timeSlots.map(time => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-2">
                            Duration
                          </label>
                          <select
                            id="duration"
                            name="duration"
                            required
                            value={formState.duration}
                            onChange={handleChange}
                            className="w-full p-3 bg-[#222] border border-[#444] rounded-lg focus:ring-2 focus:ring-[#BB2124] focus:border-[#BB2124] outline-none text-white"
                          >
                            <option value="1">1 hour</option>
                            <option value="2">2 hours</option>
                            <option value="3">3 hours</option>
                            <option value="4">4 hours</option>
                            <option value="6">6 hours</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="participants" className="block text-sm font-medium text-gray-300 mb-2">
                          Number of Participants
                        </label>
                        <select
                          id="participants"
                          name="participants"
                          required
                          value={formState.participants}
                          onChange={handleChange}
                          className="w-full p-3 bg-[#222] border border-[#444] rounded-lg focus:ring-2 focus:ring-[#BB2124] focus:border-[#BB2124] outline-none text-white"
                        >
                          <option value="1">1 person</option>
                          <option value="2">2 people</option>
                          <option value="3">3 people</option>
                          <option value="4">4 people</option>
                          <option value="5">5 people</option>
                          <option value="6">6+ people</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2">
                      Special Requests or Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      value={formState.notes}
                      onChange={handleChange}
                      className="w-full p-3 bg-[#222] border border-[#444] rounded-lg focus:ring-2 focus:ring-[#BB2124] focus:border-[#BB2124] outline-none text-white"
                      placeholder="Let us know if you have any special requirements or questions..."
                    ></textarea>
                  </div>
                  
                  {/* Order Summary Card */}
                  <div className="bg-[#222] p-6 rounded-lg border border-[#444]">
                    <h3 className="text-lg font-semibold text-white mb-4">Reservation Summary</h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-gray-400">
                        <span>Selected Room:</span>
                        <span className="text-white">{selectedRoom?.name || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Price per Hour:</span>
                        <span className="text-white">${selectedRoom?.price || "0"}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Duration:</span>
                        <span className="text-white">{formState.duration} hours</span>
                      </div>
                      <div className="flex justify-between text-gray-400 border-t border-[#333] pt-3">
                        <span>Estimated Total:</span>
                        <span className="text-[#BB2124] font-bold">${(selectedRoom?.price || 0) * parseInt(formState.duration)}</span>
                      </div>
                    </div>
                    
                    <div className="bg-[#1A1A1A] p-4 rounded-lg mt-4">
                      <div className="flex items-start mb-4">
                        <div className="flex items-center h-5 mt-1">
                          <input
                            id="agreeTerms"
                            name="agreeTerms"
                            type="checkbox"
                            required
                            checked={formState.agreeTerms}
                            onChange={handleChange}
                            className="w-4 h-4 border border-gray-300 rounded bg-[#333] focus:ring-[#BB2124] focus:ring-2"
                          />
                        </div>
                        <label htmlFor="agreeTerms" className="ml-3 text-sm text-gray-300">
                          I agree to the <Link href="#" className="text-[#BB2124] hover:underline">terms and conditions</Link>, including the privacy policy and cancellation policy.
                        </label>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        <p>A valid ID will be required upon arrival. You must be 18+ to reserve a space.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-[#BB2124] hover:bg-[#8A1619] text-black px-8 py-4 rounded-lg text-lg font-bold flex items-center justify-center min-w-44 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Processing...' : 'Proceed to Checkout'}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </motion.section>

        {/* Policies Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Reservation Policies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6">
              <h3 className="text-lg font-bold text-[#BB2124] mb-4">Cancellation Policy</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-[#BB2124] mr-2 mt-1" />
                  <span>Free cancellation up to 48 hours before reservation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-[#BB2124] mr-2 mt-1" />
                  <span>50% fee for cancellations less than 48 hours prior</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-[#BB2124] mr-2 mt-1" />
                  <span>No-shows are charged the full reservation amount</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6">
              <h3 className="text-lg font-bold text-[#BB2124] mb-4">Safety & Conduct</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-[#BB2124] mr-2 mt-1" />
                  <span>All participants must be 18+ with valid ID</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-[#BB2124] mr-2 mt-1" />
                  <span>Consent and boundaries must be respected at all times</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-[#BB2124] mr-2 mt-1" />
                  <span>Staff reserves the right to terminate sessions that violate policies</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6">
              <h3 className="text-lg font-bold text-[#BB2124] mb-4">What's Included</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-[#BB2124] mr-2 mt-1" />
                  <span>Private access to your selected space for the duration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-[#BB2124] mr-2 mt-1" />
                  <span>Basic amenities including towels and sanitation supplies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-[#BB2124] mr-2 mt-1" />
                  <span>Access to equipment specific to your reserved space</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-[#1A1A1A] border border-[#333] rounded-xl p-5">
              <h3 className="font-bold text-white">What should I bring for my reservation?</h3>
              <p className="text-gray-300 mt-2">We recommend bringing personal items for comfort, any specialty items you prefer to use, and a valid ID. Basic amenities and equipment are provided with your reservation.</p>
            </div>
            
            <div className="bg-[#1A1A1A] border border-[#333] rounded-xl p-5">
              <h3 className="font-bold text-white">Is there a staff member on site during my reservation?</h3>
              <p className="text-gray-300 mt-2">Yes, staff members are always available for assistance, questions, or emergencies while respecting your privacy. You'll be given an orientation to the space before your session begins.</p>
            </div>
            
            <div className="bg-[#1A1A1A] border border-[#333] rounded-xl p-5">
              <h3 className="font-bold text-white">Can I extend my reservation if I want more time?</h3>
              <p className="text-gray-300 mt-2">Extensions may be possible depending on availability. Please check with staff at least 30 minutes before your scheduled end time to inquire about extending your session.</p>
            </div>
            
            <div className="bg-[#1A1A1A] border border-[#333] rounded-xl p-5">
              <h3 className="font-bold text-white">Are private dungeon rooms available for first-time visitors?</h3>
              <p className="text-gray-300 mt-2">Yes, though we recommend booking a consultation or orientation session first if you're new to these environments. Our staff can provide guidance on equipment use and safety protocols.</p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Room Types Info Modal */}
      <AnimatePresence>
        {isInfoModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsInfoModalOpen(false)}
          >
            <motion.div 
              className="bg-[#1A1A1A] max-w-4xl rounded-xl border border-[#444] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-[#333] sticky top-0 bg-[#1A1A1A] z-10 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Room Types & Amenities</h2>
                <button 
                  onClick={() => setIsInfoModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-[#BB2124] mb-4 flex items-center">
                      <Star className="h-5 w-5 mr-2" /> Standard Rooms
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Our Standard Rooms provide versatile and accessible spaces for exploration and play. These rooms are designed with comfort, privacy, and functionality in mind, making them perfect for both beginners and experienced guests seeking a welcoming environment.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {[
                        "Comfortable furnishings",
                        "Adjustable lighting",
                        "Climate control",
                        "Sound systems",
                        "Private bathroom access",
                        "Basic equipment included",
                        "Beginner-friendly setup",
                        "Customizable atmosphere",
                        "Easy-to-clean surfaces"
                      ].map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-[#BB2124] mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <p className="text-gray-400 text-sm">
                      Ideal for: Couples seeking privacy, beginners exploring kink, casual play sessions, and general experimentation.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-[#BB2124] mb-4 flex items-center">
                      <Zap className="h-5 w-5 mr-2" /> Dungeon Rooms
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Our specialized Dungeon Rooms offer immersive themed environments with advanced equipment and features. These rooms are designed for experienced users seeking more intensive scenarios or specific aesthetic experiences during their sessions.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {[
                        "Themed environments",
                        "Specialized equipment",
                        "Advanced restraint systems",
                        "Enhanced soundproofing",
                        "Specialized lighting",
                        "Multiple anchor points",
                        "Premium furniture",
                        "Extended session options",
                        "Enhanced privacy features"
                      ].map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-[#BB2124] mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <p className="text-gray-400 text-sm">
                      Ideal for: Experienced players, themed role-play scenarios, specialized equipment needs, and immersive atmospheric experiences.
                    </p>
                  </div>
                  
                  <div className="bg-[#222] p-5 rounded-lg border border-[#333]">
                    <h3 className="font-bold text-white mb-3">First Time Booking?</h3>
                    <p className="text-gray-300 mb-4">
                      If this is your first time booking a private space with us, we recommend starting with one of our Standard Rooms. Our staff can provide a brief orientation and equipment demonstration before your session.
                    </p>
                    <p className="text-gray-300">
                      For those interested in the Dungeon Rooms but unsure about the equipment, we offer consultation sessions and equipment tutorials that can be booked separately through our <Link href="/classes" className="text-[#BB2124] hover:underline">Classes & Events</Link> page.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-[#333] bg-[#222] flex justify-end">
                <Button 
                  onClick={() => setIsInfoModalOpen(false)}
                  className="bg-[#BB2124] hover:bg-[#8A1619] text-black"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
} 