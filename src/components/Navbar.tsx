import { DarkModeSwitch } from './DarkModeSwitch'
import Link from 'next/link';
import SearchInput from './Search';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-emerald-50/50 dark:bg-gray-900/50 backdrop-blur-md shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/home" prefetch={false} className="flex items-center space-x-2">
            <Image src="/Logo3.png" alt="Logo" width={32} height={32} />
            <span className="hidden sm:inline text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              MovieGhar
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <SearchInput />
            <DarkModeSwitch />
          </div>

        </div>
      </div>


    </nav>
  )
}

export default Navbar