import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { MapPin, Mail, Zap } from "lucide-react";

interface UserProfile {
  name: string;
  title: string;
  location: string;
  email: string;
  bio: string;
  avatarUrl: string;
  memberSince: string;
}

const mockUser: UserProfile = {
  name: "Alex Johnson",
  title: "UBEC Admin",
  location: "Abuja, Nigeria",
  email: "alex.j@example.com",
  bio: "lorem20 ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel risus eget nisl convallis aliquet. Sed euismod, nunc ut laoreet.",
  avatarUrl: "https://i.pravatar.cc/150?img=12", 
  memberSince: "Joined June 2023",
};

export const ProfileCard: React.FC = () => (
  <Card className="col-span-12 lg:col-span-4 shadow-xl">
    <CardHeader className="text-center pt-8">
      <Avatar className="h-24 w-24 mx-auto border-4 border-primary/20">
        <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
        <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <CardTitle className="mt-4 text-2xl font-extrabold text-[#19488A]">{mockUser.name}</CardTitle>
      <p className="text-sm text-primary/80 font-semibold">{mockUser.title}</p>
      <div className="flex justify-center space-x-2 mt-2">
        <Badge variant="secondary" className="bg-green-100 text-green-700">
          <Zap className="h-3 w-3 mr-1" /> Active
        </Badge>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
          {mockUser.memberSince}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <Separator />
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Bio</h3>
        <p className="text-muted-foreground text-sm italic">{mockUser.bio}</p>
      </div>
      <Separator />
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-primary" /> {mockUser.location}
        </div>
        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-2 text-primary" /> {mockUser.email}
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex justify-center p-6 border-t">
      <Button variant="outline" className="w-full">Edit Profile</Button>
    </CardFooter>
  </Card>
);