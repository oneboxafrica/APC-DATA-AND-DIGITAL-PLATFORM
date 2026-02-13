import { Image, Smile, Video } from "lucide-react";

export default function CreatePost() {
  return (
    <div className="bg-white rounded-xl shadow mb-4  p-3">
      <div className="flex items-center gap-3 pb-3 border-b">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          J
        </div>
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-gray-500">
          What's on your mind, Jos?
        </div>
      </div>

      <div className="flex justify-around mt-3">
        <button className="flex items-center gap-2 flex-1 justify-center py-2 hover:bg-gray-100 rounded-lg">
          <Video className="h-6 w-6 text-red-500" />
          <span className="font-medium">Live video</span>
        </button>
        <button className="flex items-center gap-2 flex-1 justify-center py-2 hover:bg-gray-100 rounded-lg">
          <Image className="h-6 w-6 text-green-500" />
          <span className="font-medium">Photo/video</span>
        </button>
        <button className="flex items-center gap-2 flex-1 justify-center py-2 hover:bg-gray-100 rounded-lg">
          <Smile className="h-6 w-6 text-yellow-500" />
          <span className="font-medium">Feeling/activity</span>
        </button>
      </div>
    </div>
  );
}