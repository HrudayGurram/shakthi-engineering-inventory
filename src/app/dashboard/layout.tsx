"use client";

import React from "react";
import Sidebar from "@/app/components/subcomponents/Sidebar";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/app/figma/components/accordion"; // Assuming this path is correct
import "./globals.css";
import "../designsystems/index.css";

// Custom hook to detect if the screen is mobile
const MOBILE_BREAKPOINT = 768;
export function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };
        mql.addEventListener("change", onChange);
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    return isMobile;
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMobile = useIsMobile();

    return (
        <div className="flex flex-col sm:flex-row min-h-screen">
            {!isMobile && (
                <nav className="flex flex-col gap-4">
                    <Sidebar />
                </nav>
            )}

            {isMobile && (
                <div className="w-full">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="w-full bg-white px-6">
                                Show Menu
                            </AccordionTrigger>
                            <AccordionContent>
                                <nav className="flex flex-col">
                                    <Sidebar />
                                </nav>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            )}

            <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
