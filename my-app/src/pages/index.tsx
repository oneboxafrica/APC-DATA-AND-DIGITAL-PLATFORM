import { useState } from "react";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import Stories from "../components/Stories";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { cn } from "../lib/utils";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onMenuToggle={() => setIsMobileMenuOpen((prev) => !prev)} />


      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="absolute inset-y-0 left-0 w-80 bg-white shadow-xl transform transition-transform translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <LeftSidebar isMobile />
          </div>
        </div>
      )}

      <div className="pt-14">
        <div className="max-w-[1400px] mx-auto flex gap-4 px-2 md:px-4 lg:px-8 xl:px-4">
          
          <aside className="hidden lg:block lg:w-72 xl:w-80 sticky top-14 self-start max-h-[calc(100vh-3.5rem)] overflow-y-auto bg-white rounded-xl shadow">
            <LeftSidebar />
          </aside>

          <main className="flex-1 max-w-2xl mx-auto pb-10 space-y-4 px-3 md:px-0 lg:px-10">
            <Stories />
            <CreatePost />
            <PostCard
  author="QueenLemmy Williams"
  time="February 6 at 4:48 PM"
  content="BREAKUP ALERT! 💔💔💔💔 Bimbo Ademoye and VJ Adams who were rumored to be dating for 5 years now, have unfollowed each other on instagram. Rumo... "
  imageUrl="https://via.placeholder.com/600x800?text=Breakup+Post+Image"
  reactions={2300}
  comments={539}
  shares={10}
  postId="breakup-2025-queenlemy-001"  
/>
            <PostCard
  author="Legit.ng"
  time="14h"
  content="Veekee James and her husband are trending after a prophetess accused them of 'leading people astray' Video and details of what happened in the comments...."
  imageUrl="https://via.placeholder.com/600x800?text=Legit+Post+Image"
  reactions={1200}
  comments={320}
  shares={45}
  postId="legit-ng-veekee-2026-045"     // ← another example ID
/>
          </main>

          <aside className="hidden xl:block xl:w-80 sticky top-14 self-start max-h-[calc(100vh-3.5rem)] overflow-y-auto">
            <RightSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;