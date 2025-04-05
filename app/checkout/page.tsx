"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useCartContext } from "@/context/cart-context"
import { getCheckoutItems, clearCheckoutItems } from "@/lib/checkout-helper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, CreditCard, Lock, Shield, Bitcoin, Gift } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function CheckoutPage() {
  try {
    const { cartItems, cartTotal, clearCart } = useCartContext()
    const [checkoutItems, setCheckoutItems] = useState([])
    const [combinedTotal, setCombinedTotal] = useState(cartTotal)
    const [isProcessing, setIsProcessing] = useState(false)
    const [step, setStep] = useState(1) // 1: Shipping, 2: Payment, 3: Confirmation
    const router = useRouter()
    const searchParams = useSearchParams()
    const checkoutTitle = searchParams.get('title') || 'Checkout'
    const [paymentMethod, setPaymentMethod] = useState("card") // card, bitcoin, giftcard

    // Load checkout items
    useEffect(() => {
      const items = getCheckoutItems()
      setCheckoutItems(items)
      
      // Calculate combined total
      const checkoutItemsTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)
      setCombinedTotal(cartTotal + checkoutItemsTotal)
    }, [cartTotal])

    // All items from both sources
    const allItems = [...cartItems, ...checkoutItems]
    
    // Shipping form state
    const [shippingInfo, setShippingInfo] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "US",
      saveInfo: false,
    })

    // Payment form state
    const [paymentInfo, setPaymentInfo] = useState({
      cardName: "",
      cardNumber: "",
      expMonth: "",
      expYear: "",
      cvv: "",
      saveCard: false,
      // Bitcoin payment info
      bitcoinAddress: "",
      // Gift card info
      giftCardNumber: "",
      giftCardPin: "",
    })

    const handleShippingSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      setStep(2)
      window.scrollTo(0, 0)
    }

    const handlePaymentSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      setIsProcessing(true)

      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false)
        setStep(3)
        clearCart()
        clearCheckoutItems()
        window.scrollTo(0, 0)
      }, 2000)
    }

    // If cart is empty and not on confirmation step, redirect to shop
    if (allItems.length === 0 && step !== 3) {
      return (
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Your checkout is empty</h1>
          <p className="mb-8">There are no items in your checkout.</p>
          <Link href="/">
            <Button variant="outline" className="border-red text-red hover:bg-red/10">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      )
    }

    return (
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-center mb-8">{checkoutTitle}</h1>
          
          {/* Checkout Steps */}
          <div className="mb-12">
            <div className="flex justify-center items-center mb-8">
              <div className={`flex items-center ${step >= 1 ? "text-red" : "text-gray-500"}`}>
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
                    step >= 1 ? "border-red bg-red/10" : "border-gray-500"
                  }`}
                >
                  1
                </div>
                <span className="ml-2 font-medium">Shipping</span>
              </div>

              <div className={`w-16 h-1 mx-2 ${step >= 2 ? "bg-red" : "bg-gray-600"}`}></div>

              <div className={`flex items-center ${step >= 2 ? "text-red" : "text-gray-500"}`}>
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
                    step >= 2 ? "border-red bg-red/10" : "border-gray-500"
                  }`}
                >
                  2
                </div>
                <span className="ml-2 font-medium">Payment</span>
              </div>

              <div className={`w-16 h-1 mx-2 ${step >= 3 ? "bg-red" : "bg-gray-600"}`}></div>

              <div className={`flex items-center ${step >= 3 ? "text-red" : "text-gray-500"}`}>
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
                    step >= 3 ? "border-red bg-red/10" : "border-gray-500"
                  }`}
                >
                  3
                </div>
                <span className="ml-2 font-medium">Confirmation</span>
              </div>
            </div>
          </div>

          {/* Step 1: Shipping Information */}
          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-dark-800 rounded-lg p-6 border border-dark-600">
                  <h2 className="text-xl font-bold mb-6 text-red">Shipping Information</h2>

                  <form onSubmit={handleShippingSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                          First Name
                        </label>
                        <Input
                          id="firstName"
                          type="text"
                          required
                          className="bg-dark-700 border-dark-600 focus:border-red/50 focus:ring-red/20"
                          value={shippingInfo.firstName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                          data-cursor-hover="true"
                        />
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                          Last Name
                        </label>
                        <Input
                          id="lastName"
                          type="text"
                          required
                          className="bg-dark-700 border-dark-600 focus:border-red/50 focus:ring-red/20"
                          value={shippingInfo.lastName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                          data-cursor-hover="true"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          required
                          className="bg-dark-700 border-dark-600 focus:border-red/50 focus:ring-red/20"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                          data-cursor-hover="true"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          className="bg-dark-700 border-dark-600 focus:border-red/50 focus:ring-red/20"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                          data-cursor-hover="true"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                        Address
                      </label>
                      <Input
                        id="address"
                        type="text"
                        required
                        className="bg-dark-700 border-dark-600 focus:border-red/50 focus:ring-red/20"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        data-cursor-hover="true"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="col-span-2 md:col-span-1">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
                          City
                        </label>
                        <Input
                          id="city"
                          type="text"
                          required
                          className="bg-dark-700 border-dark-600 focus:border-red/50 focus:ring-red/20"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                          data-cursor-hover="true"
                        />
                      </div>

                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-1">
                          State
                        </label>
                        <Input
                          id="state"
                          type="text"
                          required
                          className="bg-dark-700 border-dark-600 focus:border-red/50 focus:ring-red/20"
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                          data-cursor-hover="true"
                        />
                      </div>

                      <div>
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-300 mb-1">
                          ZIP Code
                        </label>
                        <Input
                          id="zip"
                          type="text"
                          required
                          className="bg-dark-700 border-dark-600 focus:border-red/50 focus:ring-red/20"
                          value={shippingInfo.zip}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                          data-cursor-hover="true"
                        />
                      </div>

                      <div className="col-span-2 md:col-span-1">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">
                          Country
                        </label>
                        <Select
                          value={shippingInfo.country}
                          onValueChange={(value) => setShippingInfo({ ...shippingInfo, country: value })}
                        >
                          <SelectTrigger
                            id="country"
                            className="bg-dark-700 border-dark-600 focus:border-red/50 focus:ring-red/20"
                            data-cursor-hover="true"
                          >
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent className="bg-dark-700 border-dark-600">
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center mb-6">
                      <Checkbox
                        id="saveInfo"
                        checked={shippingInfo.saveInfo}
                        onCheckedChange={(checked) => setShippingInfo({ ...shippingInfo, saveInfo: checked as boolean })}
                        className="border-gray-500 data-[state=checked]:bg-red data-[state=checked]:border-red"
                        data-cursor-hover="true"
                      />
                      <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-300">
                        Save this information for next time
                      </label>
                    </div>

                    <div className="flex justify-between items-center">
                      <Link href="/">
                        <Button
                          type="button"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-dark-700"
                          data-cursor-hover="true"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                      </Link>

                      <Button type="submit" className="bg-red hover:bg-red/90 text-dark-900" data-cursor-hover="true">
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

              <div>
                <div className="bg-dark-800 rounded-lg p-6 border border-dark-600 sticky top-24">
                  <h2 className="text-xl font-bold mb-6 text-red">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    {allItems.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden bg-dark-700 flex-shrink-0">
                          <Image src={item.image1 || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>

                        <div className="ml-4 flex-1">
                          <h4 className="text-sm font-medium text-gray-200">{item.name}</h4>
                          <div className="flex justify-between mt-1">
                            <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                            <p className="text-sm text-gray-300">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dark-600 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-gray-200">${combinedTotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Shipping</span>
                      <span className="text-gray-200">$9.99</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Tax</span>
                      <span className="text-gray-200">${(combinedTotal * 0.07).toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-base font-medium pt-2 border-t border-dark-600 mt-2">
                      <span className="text-gray-300">Total</span>
                      <span className="text-red">${(combinedTotal + 9.99 + combinedTotal * 0.07).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-center text-xs text-gray-400">
                    <Lock className="h-3 w-3 mr-1 text-red" />
                    <span>Secure Checkout • Discreet Billing</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment Information */}
          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-dark-800 rounded-lg p-6 border border-dark-600">
                  <h2 className="text-xl font-bold mb-6 text-red">Payment Information</h2>
                  
                  {/* Payment Method Selection */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-300 mb-3">Select Payment Method</h3>
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={setPaymentMethod}
                      className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value="card" 
                          id="card-payment"
                          className="border-gray-500 text-red"
                          data-cursor-hover="true"
                        />
                        <Label htmlFor="card-payment" className="flex items-center cursor-pointer">
                          <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
                          Credit Card
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value="bitcoin" 
                          id="bitcoin-payment"
                          className="border-gray-500 text-red"
                          data-cursor-hover="true"
                        />
                        <Label htmlFor="bitcoin-payment" className="flex items-center cursor-pointer">
                          <Bitcoin className="h-4 w-4 mr-2 text-gray-400" />
                          Bitcoin
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value="giftcard" 
                          id="giftcard-payment"
                          className="border-gray-500 text-red"
                          data-cursor-hover="true"
                        />
                        <Label htmlFor="giftcard-payment" className="flex items-center cursor-pointer">
                          <Gift className="h-4 w-4 mr-2 text-gray-400" />
                          Gift Card
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <form onSubmit={handlePaymentSubmit}>
                    {/* Credit Card Payment Form */}
                    {paymentMethod === "card" && (
                      <>
                        <div className="mb-6">
                          <label htmlFor="cardName" className="block text-sm font-medium text-gray-300 mb-1">
                            Name on Card
                          </label>
                          <Input
                            id="cardName"
                            type="text"
                            required
                            className="bg-dark-700 border-dark-600 focus:border-red/50 focus:ring-red/20"
                            value={paymentInfo.cardName}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                            data-cursor-hover="true"
                          />
                        </div>

                        <div className="mb-6">
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">
                            Card Number
                          </label>
                          <div className="relative">
                            <Input
                              id="cardNumber"
                              type="text"
                              required
                              placeholder="•••• •••• •••• ••••"
                              className="bg-dark-700 border-dark-600 focus:border-red/50 focus:ring-red/20 pl-10"
                              value={paymentInfo.cardNumber}
                              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                              data-cursor-hover="true"
                            />
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div>
                            <label htmlFor="expMonth" className="block text-sm font-medium text-gray-300 mb-1">
                              Exp. Month
                            </label>
                            <Select
                              value={paymentInfo.expMonth}
                              onValueChange={(value) => setPaymentInfo({ ...paymentInfo, expMonth: value })}
                            >
                              <SelectTrigger
                                id="expMonth"
                                className="bg-dark-700 border-dark-600 focus:border-red/50 focus:ring-red/20"
                                data-cursor-hover="true"
                              >
                                <SelectValue placeholder="MM" />
                              </SelectTrigger>
                              <SelectContent className="bg-dark-700 border-dark-600">
                                {Array.from({ length: 12 }, (_, i) => {
                                  const month = i + 1
                                  return (
                                    <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                                      {month.toString().padStart(2, "0")}
                                    </SelectItem>
                                  )
                                })}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label htmlFor="expYear" className="block text-sm font-medium text-gray-300 mb-1">
                              Exp. Year
                            </label>
                            <Select
                              value={paymentInfo.expYear}
                              onValueChange={(value) => setPaymentInfo({ ...paymentInfo, expYear: value })}
                            >
                              <SelectTrigger
                                id="expYear"
                                className="bg-dark-700 border-dark-600 focus:border-red/50 focus:ring-red/20"
                                data-cursor-hover="true"
                              >
                                <SelectValue placeholder="YYYY" />
                              </SelectTrigger>
                              <SelectContent className="bg-dark-700 border-dark-600">
                                {Array.from({ length: 10 }, (_, i) => {
                                  const year = new Date().getFullYear() + i
                                  return (
                                    <SelectItem key={year} value={year.toString()}>
                                      {year}
                                    </SelectItem>
                                  )
                                })}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-300 mb-1">
                              CVV
                            </label>
                            <Input
                              id="cvv"
                              type="text"
                              required
                              placeholder="•••"
                              className="bg-dark-700 border-dark-600 focus:border-red/50 focus:ring-red/20"
                              value={paymentInfo.cvv}
                              onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                              data-cursor-hover="true"
                            />
                          </div>
                        </div>

                        <div className="flex items-center mb-6">
                          <Checkbox
                            id="saveCard"
                            checked={paymentInfo.saveCard}
                            onCheckedChange={(checked) => setPaymentInfo({ ...paymentInfo, saveCard: checked as boolean })}
                            className="border-gray-500 data-[state=checked]:bg-red data-[state=checked]:border-red"
                            data-cursor-hover="true"
                          />
                          <label htmlFor="saveCard" className="ml-2 text-sm text-gray-300">
                            Save this card for future purchases
                          </label>
                        </div>
                      </>
                    )}

                    {/* Bitcoin Payment Form */}
                    {paymentMethod === "bitcoin" && (
                      <div className="space-y-6">
                        <div className="bg-dark-700/50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-200 mb-2 flex items-center">
                            <Bitcoin className="h-4 w-4 mr-2 text-red" />
                            Bitcoin Payment Instructions
                          </h3>
                          <p className="text-xs text-gray-400 mb-3">
                            To complete your purchase with Bitcoin, please send the exact amount to our wallet address below. 
                            Your order will be processed once the transaction is confirmed on the blockchain.
                          </p>
                          
                          <div className="mb-4">
                            <div className="text-xs text-gray-400 mb-1">Send exactly:</div>
                            <div className="bg-dark-800 p-2 rounded border border-dark-600 text-red font-mono text-sm">
                              {(combinedTotal + 9.99 + combinedTotal * 0.07 / 40000).toFixed(8)} BTC
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-xs text-gray-400 mb-1">To this address:</div>
                            <div className="bg-dark-800 p-2 rounded border border-dark-600 font-mono text-xs break-all">
                              bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="bitcoinAddress" className="block text-sm font-medium text-gray-300 mb-1">
                            Your Bitcoin Return Address (Optional)
                          </label>
                          <Input
                            id="bitcoinAddress"
                            type="text"
                            placeholder="Enter your BTC address for refunds if needed"
                            className="bg-dark-700 border-dark-600 focus:border-red/50 focus:ring-red/20"
                            value={paymentInfo.bitcoinAddress}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, bitcoinAddress: e.target.value })}
                            data-cursor-hover="true"
                          />
                          <p className="text-xs text-gray-400 mt-1">
                            This will only be used in case a refund is needed.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Gift Card Payment Form */}
                    {paymentMethod === "giftcard" && (
                      <div className="space-y-6">
                        <div className="mb-6">
                          <label htmlFor="giftCardNumber" className="block text-sm font-medium text-gray-300 mb-1">
                            Gift Card Number
                          </label>
                          <Input
                            id="giftCardNumber"
                            type="text"
                            required
                            placeholder="Enter 16-digit gift card number"
                            className="bg-dark-700 border-dark-600 focus:border-red/50 focus:ring-red/20"
                            value={paymentInfo.giftCardNumber}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, giftCardNumber: e.target.value })}
                            data-cursor-hover="true"
                          />
                        </div>
                        
                        <div className="mb-6">
                          <label htmlFor="giftCardPin" className="block text-sm font-medium text-gray-300 mb-1">
                            Gift Card PIN
                          </label>
                          <Input
                            id="giftCardPin"
                            type="text"
                            required
                            placeholder="Enter 4-digit PIN"
                            className="bg-dark-700 border-dark-600 focus:border-red/50 focus:ring-red/20"
                            maxLength={4}
                            value={paymentInfo.giftCardPin}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, giftCardPin: e.target.value })}
                            data-cursor-hover="true"
                          />
                        </div>
                        
                        <div className="bg-dark-700/50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-200 mb-2 flex items-center">
                            <Gift className="h-4 w-4 mr-2 text-red" />
                            Gift Card Information
                          </h3>
                          <p className="text-xs text-gray-400">
                            We accept Kinko Store gift cards. If your gift card balance is insufficient to cover 
                            the total amount, you will be prompted to provide an additional payment method.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="bg-dark-700/50 p-4 rounded-lg mb-6 flex items-start">
                      <Shield className="h-5 w-5 text-red mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-200 mb-1">Discreet Billing</h4>
                        <p className="text-xs text-gray-400">
                          For your privacy, all charges will appear on your statement as "KS Online Store" with no
                          reference to product details.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-dark-700"
                        onClick={() => setStep(1)}
                        data-cursor-hover="true"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shipping
                      </Button>

                      <Button
                        type="submit"
                        className="bg-red hover:bg-red/90 text-dark-900"
                        disabled={isProcessing}
                        data-cursor-hover="true"
                      >
                        {isProcessing ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-dark-900"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            {paymentMethod === "card" && <CreditCard className="mr-2 h-4 w-4" />}
                            {paymentMethod === "bitcoin" && <Bitcoin className="mr-2 h-4 w-4" />}
                            {paymentMethod === "giftcard" && <Gift className="mr-2 h-4 w-4" />}
                            Complete Order
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

              <div>
                <div className="bg-dark-800 rounded-lg p-6 border border-dark-600 sticky top-24">
                  <h2 className="text-xl font-bold mb-6 text-red">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    {allItems.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden bg-dark-700 flex-shrink-0">
                          <Image src={item.image1 || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>

                        <div className="ml-4 flex-1">
                          <h4 className="text-sm font-medium text-gray-200">{item.name}</h4>
                          <div className="flex justify-between mt-1">
                            <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                            <p className="text-sm text-gray-300">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dark-600 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-gray-200">${combinedTotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Shipping</span>
                      <span className="text-gray-200">$9.99</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Tax</span>
                      <span className="text-gray-200">${(combinedTotal * 0.07).toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-base font-medium pt-2 border-t border-dark-600 mt-2">
                      <span className="text-gray-300">Total</span>
                      <span className="text-red">${(combinedTotal + 9.99 + combinedTotal * 0.07).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-center text-xs text-gray-400">
                    <Lock className="h-3 w-3 mr-1 text-red" />
                    <span>Secure Checkout • Discreet Billing</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-dark-800 rounded-lg p-8 border border-dark-600 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>

                <h2 className="text-2xl font-bold mb-2 text-gray-100">Payment Successful!</h2>
                <p className="text-gray-400 mb-8">
                  Thank you for your payment. We've sent a confirmation to your email.
                </p>

                <div className="bg-dark-700 p-6 rounded-lg mb-8">
                  <h3 className="font-medium mb-2 text-gray-300">Order Reference</h3>
                  <p className="text-red font-mono text-lg">
                    {Math.random().toString(36).substring(2, 12).toUpperCase()}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={`/account/orders?id=${Math.random().toString(36).substring(2, 12).toUpperCase()}`}>
                    <Button variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-dark-700">
                      View Order Details
                    </Button>
                  </Link>
                  
                  <Link href="/">
                    <Button className="w-full sm:w-auto bg-red hover:bg-red/90 text-dark-900">
                      Return to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    )
  } catch (error) {
    console.error("Error in checkout page:", error);
    // Return a fallback UI
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">There was an error loading the checkout page</h1>
        <p className="mb-8">Please try again or contact support.</p>
        <Link href="/shop">
          <Button variant="outline" className="border-red text-red hover:bg-red/10">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
          </Button>
        </Link>
      </div>
    );
  }
}

