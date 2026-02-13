import React from 'react';
import { LayoutDashboard, Users, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { StatsCard } from './StatsCard';
import { ProfileCard } from './ProfileCard';


const mockActivity = [
  { id: 1, action: "Completed onboarding checklist.", time: "10 minutes ago", icon: LayoutDashboard },
  { id: 2, action: "Replied to a query in the support forum.", time: "1 hour ago", icon: MessageSquare },
  { id: 3, action: "Updated security preferences.", time: "5 hours ago", icon: Clock },
  { id: 4, action: "Gained 5 new followers.", time: "Yesterday", icon: Users },
  { id: 5, action: "Uploaded a new profile banner.", time: "2 days ago", icon: LayoutDashboard },
];

const MyProfile: React.FC = () => {
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Welcome back, <span className="text-primary">Alex</span>!
        </h1>
        <p className="text-lg text-muted-foreground mt-1">
          Review your profile, metrics, and recent activity.
        </p>
      </header>
      
      <div className="grid grid-cols-12 gap-6">

        <ProfileCard />

        {/* Stats and Activity (Right Columns) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* User Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              icon={Users}
              title="Courses Enrolled"
              value="1,293"
              description="+20.1% from last month"
            />
            <StatsCard
              icon={MessageSquare}
              title="Posts Created"
              value="48"
              description="Last post: 3 days ago"
            />
            <StatsCard
              icon={Clock}
              title="Average Response Time"
              value="1h 15m"
              description="Improved by 10 minutes"
            />
          </div>

          {/* Recent Activity Log */}
          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-bold">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {mockActivity.map((activity, index) => (
                    <React.Fragment key={activity.id}>
                      <div className="flex items-start space-x-4">
                        <activity.icon className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                        <div className="flex-grow">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground/50 hover:text-primary transition-colors cursor-pointer" />
                      </div>
                      {index < mockActivity.length - 1 && <Separator className="my-2" />}
                    </React.Fragment>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </div>
  );
}

export default MyProfile;