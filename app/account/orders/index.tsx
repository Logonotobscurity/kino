"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, Search, Filter, Info, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const router = useRouter()
  
  useEffect(() => {
    // Mock fetch orders - in a real app this would fetch from an API
    const fetchOrders = () => {
      setLoading(true)
      
      // Simulate API call
      setTimeout(() => {
        // Mock order data
        const mockOrders = [
          {
            id: "KINKO743AB21C",
            date: "2023-12-15T10:30:45Z",
            status: "delivered",
            total: 341.66,
            items: 3
          },
          {
            id: "KINKO562XY43Z",
            date: "2024-03-20T15:22:10Z", 
            status: "shipped",
            total: 189.99,
            items: 2
          },
          {
            id: "KINKO219PQ65R",
            date: "2024-04-01T09:15:30Z",
            status: "processing",
            total: 79.95,
            items: 1
          },
          {
            id: "KINKO438LM91S",
            date: "2024-04-04T11:45:22Z",
            status: "processing",
            total: 245.50,
            items: 4
          }
        ]
        
        setOrders(mockOrders)
        setLoading(false)
      }, 1000)
    }
    
    fetchOrders()
  }, [])
  
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
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    })
  }
  
  // Filter orders
  const filteredOrders = filter === "all" 
    ? orders 
    : orders.filter(order => order.status === filter)
  
  if (loading) {
    return (
      <div className="container mx-auto px-6 py-24 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#BB2124] border-opacity-50 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-medium mb-2">Loading Orders</h2>
          <p className="text-gray-400">Please wait while we fetch your orders...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Orders</h1>
            <p className="text-gray-400">
              View and track your order history
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Link href="/account">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-dark-700">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Account
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-600 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search orders..."
                className="pl-10 bg-dark-700 border-dark-600"
              />
            </div>
            
            <div className="flex items-center">
              <Filter className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-300 mr-3 whitespace-nowrap">Filter by:</span>
              <Select 
                value={filter}
                onValueChange={setFilter}
              >
                <SelectTrigger 
                  className="bg-dark-700 border-dark-600 w-[140px]"
                >
                  <SelectValue placeholder="Filter orders" />
                </SelectTrigger>
                <SelectContent className="bg-dark-700 border-dark-600">
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="bg-dark-800 rounded-lg border border-dark-600 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-600">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-dark-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {formatDate(order.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <StatusIndicator status={order.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {order.items} {order.items === 1 ? 'item' : 'items'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        <Link href={`/account/orders?id=${order.id}`}>
                          <Button variant="ghost" className="text-[#BB2124] hover:bg-[#BB2124]/10 h-8 px-2">
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-dark-800 rounded-lg p-10 border border-dark-600 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-dark-700 rounded-full mb-4">
              <Info className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">No Orders Found</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              {filter === "all" 
                ? "You haven't placed any orders yet." 
                : `You don't have any orders with status "${filter}".`}
            </p>
            {filter !== "all" && (
              <Button 
                variant="outline" 
                className="border-[#BB2124] text-[#BB2124] hover:bg-[#BB2124]/10"
                onClick={() => setFilter("all")}
              >
                View All Orders
              </Button>
            )}
          </div>
        )}
      </div>
    </main>
  )
} 