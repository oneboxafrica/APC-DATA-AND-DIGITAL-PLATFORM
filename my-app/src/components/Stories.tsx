import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from "../lib/utils";
import Lady from '../../src/assets/lady.jpeg'
import Man from '../../src/assets/Man.jpeg'

export default function Stories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const stories = [
    { name: "Create story", isCreate: true, bg: "bg-gradient-to-br from-purple-500 to-pink-500" },
    { name: "Noble Kim", avatar: Lady },
    { name: "Tiana", avatar: Man },
    // { name: "Angie Olayemi", avatar: "https://via.placeholder.com/80?text=AO" },
    // { name: "Olurunleke", avatar: "https://via.placeholder.com/80?text=OL" },
    // { name: "John Doe", avatar: "https://via.placeholder.com/80?text=JD" },
    // { name: "Sarah Lee", avatar: "https://via.placeholder.com/80?text=SL" },
    // { name: "Mike Ross", avatar: "https://via.placeholder.com/80?text=MR" },
  ];

  const checkScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10); 
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      checkScroll();
      ref.addEventListener('scroll', checkScroll);
      return () => ref.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const scrollAmount = 280; 
    const current = scrollRef.current.scrollLeft;

    scrollRef.current.scrollTo({
      left: direction === 'left' ? current - scrollAmount : current + scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow mb-4 overflow-hidden relative">
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-10",
            "w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center",
            "text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
          )}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 z-10",
            "w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center",
            "text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
          )}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      <div
        ref={scrollRef}
       className={cn(
    "grid grid-flow-col gap-3 p-4 pb-6 overflow-x-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory",
    "auto-cols-[calc(33%-0.75rem)]",           
    "sm:auto-cols-[calc(16.666%-0.75rem)]",           
    "lg:auto-cols-[92px]"                         
  )}
      >
        {stories.map((story, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center min-w-[92px] cursor-pointer group"
          >
            <div
              className={cn(
                "w-20 h-32 rounded-2xl relative overflow-hidden border-4 border-white shadow-md",
                "group-hover:scale-105 transition-transform duration-200",
                story.isCreate ? story.bg : "bg-gray-200"
              )}
            >
              {!story.isCreate && (
                <img
                  src={story.avatar}
                  alt={story.name}
                  className="w-full h-full object-cover"
                />
              )}

              {story.isCreate && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center border-4 border-blue-500 shadow">
                  <span className="text-2xl text-blue-600 font-bold">+</span>
                </div>
              )}
            </div>

            <p className="text-xs mt-2 text-center font-medium truncate w-full px-1">
              {story.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}