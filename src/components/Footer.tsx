import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export default function Footer() {

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/Logo3.png" alt="Logo"  width={32} height={32} />
              <span className="text-xl font-bold">MovieGhar</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your gateway to the ultimate movie streaming experience. Discover, watch, and fall in love with movies.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/home" className="hover:text-white transition-colors">
                  Browse Movies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors cursor-not-allowed">
                  New Releases
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors cursor-not-allowed">
                  Top Rated
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors cursor-not-allowed">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors cursor-not-allowed">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors cursor-not-allowed">
                  Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />
        <div className="py-2">
          <h5 className="text-sm font-semibold text-orange-800 dark:text-orange-300 mb-2">⚠️ Important Disclaimer</h5>
          <p className="text-xs text-orange-700 dark:text-orange-400 leading-relaxed">
            <strong>Content Notice:</strong> All content displayed on this website is not hosted on our servers.
            We do not store, upload, or distribute any copyrighted material. All content is sourced from third-party
            providers and we cannot guarantee the availability, quality, or legality of the content. We are not
            responsible for any copyright infringement or legal issues that may arise from the use of external content.
            Users access content at their own risk and discretion.
          </p>
        </div>
        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-gray-400">
          <p>MovieGhar &copy; 2026 <Link href={"https://prabinacharya1.com.np"} prefetch={false} className="hover:underline cursor-pointer"> Made with ❤️ for community.</Link></p>
          {/* <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              DMCA
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
