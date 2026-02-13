import {
  Bell,
  ChevronDown,
  Home,
  Menu,
  MessageCircle,
  Search,
  UsersRound,
  Video,
  ShoppingBag,
} from "lucide-react";


interface NavbarProps {
  onMenuToggle: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm h-14 px-3 md:px-10 lg:px-8 xl:px-10 flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-4">
        <button title="button" className="lg:hidden p-2 rounded-full hover:bg-gray-100" onClick={onMenuToggle}>
          <Menu className="h-6 w-6" />
        </button>
        <div className="text-blue-600 text-3xl md:text-4xl font-bold cursor-pointer">f</div>

        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 min-w-[240px]">
          <Search className="h-5 w-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Facebook"
            className="bg-transparent outline-none flex-1 text-sm"
          />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-1 lg:gap-2">
        <button title="button" className="p-3 rounded-full hover:bg-gray-100 transition-colors">
          <Home className="h-6 w-6" />
        </button>
        <button title="button" className="p-3 rounded-full hover:bg-gray-100 transition-colors relative">
          <Video className="h-6 w-6" />
        </button>
        <button title="button" className="p-3 rounded-full hover:bg-gray-100 transition-colors">
          <ShoppingBag className="h-6 w-6" />
        </button>
        <button title="button" className="p-3 rounded-full hover:bg-gray-100 transition-colors">
          <UsersRound className="h-6 w-6" />
        </button>
        <button className="p-3 rounded-full hover:bg-gray-100 transition-colors relative">
          <Bell className="h-6 w-6" />
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
            20+
          </span>
        </button>
        <button title="button" className="p-3 rounded-full hover:bg-gray-100 transition-colors">
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
          <span className="font-medium text-sm hidden lg:inline">Jos</span>
          <ChevronDown className="h-4 w-4 hidden lg:block" />
        </div>
      </div>
    </nav>
  );
}