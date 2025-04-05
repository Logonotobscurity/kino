"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, CreditCard, Settings, User, Clock, ShoppingBag } from "lucide-react"

export default function AccountPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Account</h1>
            <p className="text-gray-400">
              Manage your orders, preferences and account settings
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-dark-800 border-dark-600">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5 text-[#BB2124]" />
                Orders
              </CardTitle>
              <CardDescription>
                View and track your orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400 mb-4">
                Access your order history, track shipments, and manage returns.
              </p>
              <div className="flex items-center text-sm mb-2">
                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                <span>Recent Orders: 2</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/account/orders" className="w-full">
                <Button variant="outline" className="w-full border-[#BB2124] text-[#BB2124] hover:bg-[#BB2124]/10">
                  View Orders
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="bg-dark-800 border-dark-600">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5 text-[#BB2124]" />
                Profile
              </CardTitle>
              <CardDescription>
                Manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400 mb-4">
                Update your contact details, shipping addresses, and preferences.
              </p>
              <div className="flex items-center text-sm mb-2">
                <ShoppingBag className="mr-2 h-4 w-4 text-gray-500" />
                <span>Saved Addresses: 1</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-dark-700">
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-dark-800 border-dark-600">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-[#BB2124]" />
                Payment Methods
              </CardTitle>
              <CardDescription>
                Manage your payment options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400 mb-4">
                Add, edit, or remove payment methods for faster checkout.
              </p>
              <div className="flex items-center text-sm mb-2">
                <CreditCard className="mr-2 h-4 w-4 text-gray-500" />
                <span>Saved Cards: 1</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-dark-700">
                Manage Payments
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-dark-800 border-dark-600">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5 text-[#BB2124]" />
                Account Settings
              </CardTitle>
              <CardDescription>
                Customize your account preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400 mb-4">
                Update password, notification preferences, and privacy settings.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-dark-700">
                Manage Settings
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
} 