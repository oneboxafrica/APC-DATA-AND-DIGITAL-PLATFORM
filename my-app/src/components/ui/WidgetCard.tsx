import type { ReactNode } from 'react';


type WidgetCardProps = {
  title: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
};

export default function WidgetCard({ title, action, className, children }: WidgetCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        {action}
      </div>
      <div>{children}</div>
    </div>
  );
}
