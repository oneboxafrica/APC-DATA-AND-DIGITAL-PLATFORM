import {
  Calendar,
  Clock,
  Flag,
  Group,
  HelpCircle,
  LogOut,
  Moon,
  Settings,
  Store,
  Users,
  Video,
} from "lucide-react";
import { cn } from "../lib/utils";


interface LeftSidebarProps {
  isMobile?: boolean;
}

export default function LeftSidebar({ isMobile = false }: LeftSidebarProps) {
  const menuItems = [
    { icon: Users, label: "Friends" },
    { icon: Clock, label: "Memories" },
    { icon: Flag, label: "Saved" },
    { icon: Group, label: "Groups" },
    { icon: Video, label: "Video" },
    { icon: Store, label: "Marketplace" },
    { icon: Calendar, label: "Events" },
    { icon: Users, label: "Feeds" },
  ];

  return (
    <div className={cn("py-2 text-sm  h-screen overflow-y-auto ","[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden", isMobile ? "px-4 text-sm" : "px-2 text-sm")}>
      <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer ">
        <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          J
        </div>
        <span className="font-medium ">James Manuel</span>
      </div>

      {menuItems.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
        >
          <item.icon className="h-4 w-4 md:h-8 w-8 text-blue-600" />
          <span className="font-medium">{item.label}</span>
        </div>
      ))}

      <div className="border-t my-2 pt-2">
        <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <Settings className="h-4 w-4 md:h-6 md:w-6" />
          <span>Settings & privacy</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <HelpCircle className="h-4 w-4 md:h-6 md:w-6" />
          <span>Help & support</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <Moon className="h-4 w-4 md:h-6 md:w-6" />
          <span>Display & accessibility</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <LogOut className="h-4 w-4 md:h-6 md:w-6" />
          <span>Log out</span>
        </div>
      </div>
    </div>
  );
}