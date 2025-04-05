"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, CreditCard, Download, Mail } from "lucide-react"

export default function OrderDetailsPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id') || 'UNKNOWN'
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock fetch order details - in a real app this would fetch from an API
    const fetchOrderDetails = () => {
      setLoading(true)
      
      // Simulate API call
      setTimeout(() => {
        // Mock order data
        const mockOrder = {
          id: orderId,
          date: new Date().toISOString(),
          status: "processing",
          items: [
            {
              id: 1,
              name: "Deluxe Restraint Set",
              price: 129.99,
              quantity: 1,
              image: "/placeholder.svg",
            },
            {
              id: 2,
              name: "Premium Leather Cuffs",
              price: 89.99,
              quantity: 2,
              image: "/placeholder.svg",
            }
          ],
          subtotal: 309.97,
          shipping: 9.99,
          tax: 21.70,
          total: 341.66,
          paymentMethod: "Credit Card (ending in 4242)",
          shippingAddress: {
            name: "John Doe",
            street: "123 Privacy Lane",
            city: "Anytown",
            state: "CA",
            zip: "90210",
            country: "United States"
          }
        }
        
        setOrderDetails(mockOrder)
        setLoading(false)
      }, 1000)
    }
    
    fetchOrderDetails()
  }, [orderId])
  
  // Status indicator component
  const StatusIndicator = ({ status }: { status: string }) => {
    let color = ""
    let icon = null
    let label = ""
    
    switch(status) {
      case "processing":
        color = "text-yellow-500"
        icon = <Clock className="h-4 w-4 mr-2" />
        label = "Processing"
        break
      case "shipped":
        color = "text-blue-500"
        icon = <Truck className="h-4 w-4 mr-2" />
        label = "Shipped"
        break
      case "delivered":
        color = "text-green-500"
        icon = <CheckCircle className="h-4 w-4 mr-2" />
        label = "Delivered"
        break
      default:
        color = "text-gray-400"
        icon = <Package className="h-4 w-4 mr-2" />
        label = "Pending"
    }
    
    return (
      <div className={`flex items-center ${color}`}>
        {icon}
        <span className="font-medium">{label}</span>
      </div>
    )
  }
  
  if (loading) {
    return (
      <div className="container mx-auto px-6 py-24 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#BB2124] border-opacity-50 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-medium mb-2">Loading Order Details</h2>
          <p className="text-gray-400">Please wait while we fetch your order information...</p>
        </div>
      </div>
    )
  }
  
  if (!orderDetails) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="mb-8">We couldn't find any details for this order.</p>
        <Link href="/account">
          <Button variant="outline" className="border-[#BB2124] text-[#BB2124] hover:bg-[#BB2124]/10">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Account
          </Button>
        </Link>
      </div>
    )
  }
  
  // Format date
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

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Order Details</h1>
            <p className="text-gray-400">
              Order #{orderDetails.id} • Placed on {formatDate(orderDetails.date)}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-dark-700">
              <Mail className="mr-2 h-4 w-4" /> Email Receipt
            </Button>
            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-dark-700">
              <Download className="mr-2 h-4 w-4" /> Download Invoice
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Order Status */}
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-600">
              <h2 className="text-xl font-bold mb-6 text-[#BB2124]">Order Status</h2>
              
              <div className="flex items-center justify-between mb-6">
                <StatusIndicator status={orderDetails.status} />
                
                <Button variant="link" className="text-[#BB2124] p-0 h-auto">
                  Track Order
                </Button>
              </div>
              
              <div className="relative">
                {/* Progress Bar */}
                <div className="h-1 bg-gray-700 rounded-full w-full mb-8">
                  <div 
                    className="h-1 bg-[#BB2124] rounded-full" 
                    style={{ width: orderDetails.status === "processing" ? "30%" : 
                             orderDetails.status === "shipped" ? "70%" : 
                             orderDetails.status === "delivered" ? "100%" : "10%" }}
                  ></div>
                </div>
                
                {/* Status Steps */}
                <div className="flex justify-between">
                  <div className="text-center">
                    <div className={`w-6 h-6 rounded-full mx-auto mb-2 flex items-center justify-center ${orderDetails.status ? "bg-[#BB2124] text-white" : "bg-gray-700"}`}>
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <p className="text-xs">Confirmed</p>
                  </div>
                  
                  <div className="text-center">
                    <div className={`w-6 h-6 rounded-full mx-auto mb-2 flex items-center justify-center ${orderDetails.status === "processing" || orderDetails.status === "shipped" || orderDetails.status === "delivered" ? "bg-[#BB2124] text-white" : "bg-gray-700"}`}>
                      <Package className="h-4 w-4" />
                    </div>
                    <p className="text-xs">Processing</p>
                  </div>
                  
                  <div className="text-center">
                    <div className={`w-6 h-6 rounded-full mx-auto mb-2 flex items-center justify-center ${orderDetails.status === "shipped" || orderDetails.status === "delivered" ? "bg-[#BB2124] text-white" : "bg-gray-700"}`}>
                      <Truck className="h-4 w-4" />
                    </div>
                    <p className="text-xs">Shipped</p>
                  </div>
                  
                  <div className="text-center">
                    <div className={`w-6 h-6 rounded-full mx-auto mb-2 flex items-center justify-center ${orderDetails.status === "delivered" ? "bg-[#BB2124] text-white" : "bg-gray-700"}`}>
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <p className="text-xs">Delivered</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-600">
              <h2 className="text-xl font-bold mb-6 text-[#BB2124]">Items Ordered</h2>
              
              <div className="space-y-6">
                {orderDetails.items.map((item: any) => (
                  <div key={item.id} className="flex items-center border-b border-dark-600 pb-6 last:border-0 last:pb-0">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden bg-dark-700 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-200">{item.name}</h4>
                        <p className="text-gray-300">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                        <p className="text-sm text-gray-400">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Order Summary */}
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-600">
              <h2 className="text-xl font-bold mb-6 text-[#BB2124]">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-gray-200">${orderDetails.subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-gray-200">${orderDetails.shipping.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-gray-200">${orderDetails.tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-base font-medium pt-4 border-t border-dark-600">
                <span className="text-gray-300">Total</span>
                <span className="text-[#BB2124]">${orderDetails.total.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Payment Info */}
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-600">
              <h2 className="text-lg font-bold mb-4 text-[#BB2124]">Payment Information</h2>
              
              <div className="flex items-start mb-1">
                <CreditCard className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-300">{orderDetails.paymentMethod}</p>
                </div>
              </div>
            </div>
            
            {/* Shipping Info */}
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-600">
              <h2 className="text-lg font-bold mb-4 text-[#BB2124]">Shipping Address</h2>
              
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-300">{orderDetails.shippingAddress.name}</p>
                  <p className="text-sm text-gray-300">{orderDetails.shippingAddress.street}</p>
                  <p className="text-sm text-gray-300">
                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zip}
                  </p>
                  <p className="text-sm text-gray-300">{orderDetails.shippingAddress.country}</p>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Link href="/">
                <Button className="w-full bg-[#BB2124] hover:bg-[#8A1619] text-black">
                  Continue Shopping
                </Button>
              </Link>
              
              <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-dark-700">
                Need Help? Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 