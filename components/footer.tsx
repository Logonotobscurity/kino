import { Shield, Lock, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-[#141414] border-t border-[#2A2A2A] pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-[#BB2124] mb-4">Kinkoasis</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              A discreet community dedicated to exploration, education, and connection in a safe, consensual
              environment.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Lock className="h-4 w-4 text-[#BB2124]" />
              <span>100% Anonymous</span>
              <Shield className="h-4 w-4 text-[#BB2124] ml-4" />
              <span>SSL Encrypted</span>
            </div>
          </div>

          <div>
            <h4 className="text-gray-200 font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#home" className="hover:text-[#BB2124] transition-colors" data-cursor-hover="true">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#BB2124] transition-colors" data-cursor-hover="true">
                  Services
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#BB2124] transition-colors" data-cursor-hover="true">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#BB2124] transition-colors" data-cursor-hover="true">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-200 font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-[#BB2124] transition-colors group flex items-center" data-cursor-hover="true">
                  Privacy Policy <ExternalLink className="ml-1 h-3 w-3 opacity-70 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#BB2124] transition-colors group flex items-center" data-cursor-hover="true">
                  Terms of Service <ExternalLink className="ml-1 h-3 w-3 opacity-70 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#BB2124] transition-colors group flex items-center" data-cursor-hover="true">
                  Cookie Policy <ExternalLink className="ml-1 h-3 w-3 opacity-70 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#BB2124] transition-colors group flex items-center" data-cursor-hover="true">
                  FAQ <ExternalLink className="ml-1 h-3 w-3 opacity-70 group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2A2A2A] pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Kinkoasis. All rights reserved.
            </p>

            <div className="flex items-center">
              <p className="text-sm text-gray-400 mr-4">Stay updated—Join our discreet mailing list</p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-[#1A1A1A] border-[#333333] focus:border-[#BB2124]/50 focus:ring-[#BB2124]/20 rounded-r-none w-48 text-white"
                  data-cursor-hover="true"
                />
                <Button className="bg-[#BB2124] hover:bg-[#8A1619] text-white rounded-l-none" data-cursor-hover="true">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

