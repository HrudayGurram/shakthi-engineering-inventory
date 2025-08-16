"use client";

import * as React from "react";
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/app/figma/components/menubar";
import { useRouter } from "next/navigation";
import { cn } from "@/app/figma/components/utils";
import {
    LayoutDashboard,
    Package,
    Wrench,
    Sprout,
    Briefcase,
    PlusSquare,
    Home,
    FileText,
    Users,
} from "lucide-react";

interface MenuItem {
    name: string;
    href: string;
    icon: React.ElementType;
}

const menuItems: MenuItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Items', href: '/dashboard/items', icon: Package },
    { name: 'Tools', href: '/dashboard/tools', icon: Wrench },
    { name: 'Assets', href: '/dashboard/assets', icon: Sprout },
    { name: 'Projects', href: '/dashboard/projects', icon: Briefcase },
    { name: 'Request', href: '/dashboard/request', icon: PlusSquare },
    { name: 'On hand', href: '/dashboard/on-hand', icon: Home },
    { name: 'GRN Report', href: '/dashboard/grn-report', icon: FileText },
    { name: 'All Users', href: '/dashboard/allusers', icon: Users },
];

const SideMenu: React.FC = () => {
    const router = useRouter();
    const [activeItem, setActiveItem] = React.useState<string>('Dashboard');

    return (
        <div className="w-auto bg-[#1F6EAC] text-white h-full">
            <h2 className="text-xl font-bold mb-6 flex items-center p-5">
                <div className="w-6 h-6 mr-2 bg-yellow-400 rounded-md -rotate-45 transform origin-center " />
                Inventory
            </h2>
            <Menubar className="flex flex-col gap-4 w-full">
                {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <MenubarMenu key={item.name}>
                            <MenubarTrigger
                                className={cn(
                                    "flex items-center w-full px-4 py-3 rounded-md text-left text-lg transition-colors duration-200",
                                    activeItem === item.name
                                        ? "bg-white text-[#1F6EAC] font-semibold"
                                        : "hover:bg-[#185E95]"
                                )}
                                onClick={() => {
                                    setActiveItem(item.name);
                                    router.push(item.href);
                                }}
                            >
                                <IconComponent className="h-6 w-6 mr-4" />
                                {item.name}
                            </MenubarTrigger>
                        </MenubarMenu>
                    );
                })}
            </Menubar>
        </div>
    );
};

export default SideMenu;