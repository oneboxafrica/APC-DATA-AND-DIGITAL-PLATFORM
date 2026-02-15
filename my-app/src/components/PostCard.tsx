import { Heart, MessageSquare, Share2, ThumbsUp, MoreHorizontal } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";  
import ImageOne from '../../src/assets/1.png'
import ImageTwo from '../../src/assets/2.png'
import ImageThree from '../../src/assets/3.png'
import ImageFour from '../../src/assets/4.png'
import ImageFive from '../../src/assets/5.png'
import ImageSix from '../../src/assets/6.png'
import ImageSeven from '../../src/assets/7.png'

interface PostCardProps {
  author: string;
  time: string;
  content: string;
  imageUrl?: string;
  reactions?: number;
  comments?: number;
  shares?: number;
  postId?: string;        
}

export default function PostCard({
  author,
  time,
  content,
  imageUrl,
  reactions = 0,
  comments = 0,
  shares = 0,
  postId = "123",          
}: PostCardProps) {
  const MAX_LENGTH = 250;   
  const shouldShowSeeMore = content.length > MAX_LENGTH;
  const navigate = useNavigate();

  const displayedText = shouldShowSeeMore
    ? content.slice(0, MAX_LENGTH).trim() + "..."
    : content;

  return (
    <div className="bg-white rounded-xl shadow mb-4">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-400 to-purple-500" />
          <div>
            <p className="font-medium">{author}</p>
            <p className="text-xs text-gray-500">{time} · 🌍</p>
          </div>
        </div>
        <MoreHorizontal className="h-5 w-5 text-gray-500 cursor-pointer" />
      </div>

      <div className="p-4 space-y-4">
        <div>
          <span className="mb-3 whitespace-pre-wrap wrap-break-words text-sm">
          {displayedText}

        </span>
        <button
    onClick={() => navigate(`/dashboard`)}
    className="
      text-blue-400 font-medium 
      text-sm
      hover:underline
      rounded cursor-pointer
      transition-colors
    "
  >
    See more
    </button>
        </div>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Post content"
            className="w-full rounded-lg max-h-[500px] object-cover"
          />
        )}
      </div>

      <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500 border-t">
        <div className="flex items-center gap-1">
          <ThumbsUp className="h-4 w-4 fill-blue-600 text-blue-600" />
          <span>{reactions.toLocaleString()}</span>
        </div>
        <div className="flex gap-6">
          <span>{comments} comments</span>
          <span>{shares} shares</span>
        </div>
      </div>

      <div className="flex border-t text-sm">
        <button className="flex-1 py-3 flex items-center justify-center gap-2 hover:bg-gray-100">
          <ThumbsUp className="h-5 w-5" />
          <span className="text-sm">Like</span>
        </button>
        <button className="flex-1 py-3 flex items-center justify-center gap-2 hover:bg-gray-100">
          <MessageSquare className="h-5 w-5" />
          <span className="text-sm">Comment</span>
        </button>
        <button className="flex-1 py-3 flex items-center justify-center gap-2 hover:bg-gray-100">
          <Share2 className="h-5 w-5" />
          <span className="text-sm">Share</span>
        </button>
      </div>
    </div>
  );
}