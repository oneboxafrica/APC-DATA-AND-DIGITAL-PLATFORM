import { Gift, Sparkles } from "lucide-react";
import Spons from '../../src/assets/spons.png'
import Sponstwo from '../../src/assets/spontwo.png'

export default function RightSidebar() {
  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" /> Sponsored
        </h3>
        <div className="space-y-4">
          <div className="cursor-pointer">
            <img
              src={Spons}
              alt="Sponsored"
              className="w-full rounded-lg mb-2"
            />
            <p className="text-sm font-medium">Propel Your Career Forward</p>
            <p className="text-xs text-gray-500">udemy.com</p>
          </div>
          <div className="cursor-pointer">
            <img
              src={Sponstwo}
              alt="Sponsored"
              className="w-full rounded-lg mb-2"
            />
            <p className="text-sm font-medium">Create with joy.</p>
            <p className="text-xs text-gray-500">adobe.com</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Gift className="h-5 w-5 text-pink-500" /> Birthdays
        </h3>
        <p className="text-sm">Hannah Cox and 3 others have birthdays today.</p>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-3">Contacts</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500" />
            <span className="text-sm">Oluwakemi Akinmosin</span>
          </div>
          
        </div>
      </div>
    </div>
  );
}