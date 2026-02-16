import { useState } from "react";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import Stories from "../components/Stories";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { cn } from "../lib/utils";
import ImageOne from '../../src/assets/1.png'
import ImageTwo from '../../src/assets/2.png'
import ImageThree from '../../src/assets/3.png'
import ImageFour from '../../src/assets/4.png'
import ImageFive from '../../src/assets/5.png'
import ImageSix from '../../src/assets/6.png'
import ImageSeven from '../../src/assets/7.png'



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
  author="APC - Renew Hope Project"
  time="February 6 at 4:48 PM"
  content="Renewed Hope in Action: APC Delivering Results Across the States.."
  imageUrl={ImageOne}
  reactions={2300}
  comments={539}
  shares={10}
  postId="naijablog-001"  
/>
            <PostCard
  author="APC - Renew Hope Project"
  time="1h"
  content="Performance You Can See: APC-Led States Driving Growth and Stability."
  imageUrl={ImageTwo}
  reactions={1200}
  comments={320}
  shares={45}
  postId="legit-ng-veekee-2026-045"    
/>
<PostCard
  author="APC - Renew Hope Project"
  time="February 6 at 4:48 PM"
  content="From Promise to Progress: APC Governance Across Nigeria."
  imageUrl={ImageThree}
  reactions={2300}
  comments={539}
  shares={10}
  postId="naijablog001"  
/>
<PostCard
  author="APC - Renew Hope Project"
  time="February 6 at 4:48 PM"
  content="Stronger States, Stronger Nation: APC Performance Map."
  imageUrl={ImageFour}
  reactions={300}
  comments={39}
  shares={10}
  postId="gossip-mil-001"  
/>
<PostCard
  author="APC - Renew Hope Project"
  time="February 14 at 4:48 PM"
  content="A Visual Overview of APC-Led States and Key Performance Indicators."
  imageUrl={ImageFive}
  reactions={39300}
  comments={2339}
  shares={10}
  postId="naijablog-001"  
/>
<PostCard
  author="APC - Renew Hope Project"
  time="February 6 at 8:48 AM"
  content="Governance in Action: Performance Snapshot of APC-Controlled States."
  imageUrl={ImageSix}
  reactions={8300}
  comments={5309}
  shares={100}
  postId="mazi-tunde-ednut-009"  
/>
<PostCard
  author="APC - Renew Hope Project"
  time="February 14 at 2:48 PM"
  content="Mapping Progress: APC State-Level Development Indicators."
  imageUrl={ImageSeven}
  reactions={3300}
  comments={239}
  shares={14}
  postId="naija-gossip-blog-01"  
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