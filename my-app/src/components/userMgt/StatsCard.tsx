
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";


interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, title, value, description }) => (
  <Card className="hover:shadow-lg transition-shadow duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-5 w-5 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);