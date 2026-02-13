
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { Link,useLocation } from 'react-router-dom';
import { Button } from '../ui/button';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';



const menuItems = [
  {
    name: 'My Profile',
    href: '/',
  },
  {
    name: 'Account Settings',
    href: '/',
  },
  {
    name: 'Activity Log',
    href: '#',
  },
];

function DropdownMenu() {
  return (
    <div className="w-64 text-left ">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar >
          <AvatarImage className='rounded-full h-12 w-12 ' src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-11.webp" />
          <AvatarFallback>AF</AvatarFallback>
        </Avatar>
        <div className="ms-3">
       <h6 className="font-semibold">Albert Flores</h6>
<p className="text-gray-600 text-sm line-clamp-1">flores@doe.io</p>

        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-light text-sm text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to="/dashboard"
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-300 px-6 py-2">
        <Button
          className=" px-0 py-0 font-light text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="ghost"
          // onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname =  useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger>
        <button
        title='button'
          className={cn(
            'w-9 shrink-0   rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
            buttonClassName
          )}
        >
          <Avatar>
          <AvatarImage
            src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-11.webp"
            className={cn('!h-9 w-9 sm:!h-10 sm:w-10', avatarClassName)}
          />
          <AvatarFallback>AF</AvatarFallback>
        </Avatar>
         
        </button>
      </PopoverTrigger>

      <PopoverContent className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <DropdownMenu />
      </PopoverContent>
    </Popover>
  );
}
