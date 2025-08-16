"use client"
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/figma/components/card";
import { InventoryTable } from "../components/subcomponents/Table";
import ItemSummaryCard from "../components/ItemSummary";
import ToolsSummaryCard from "../components/ToolsSummary";

// // Placeholder components to make the code runnable
// const InventoryTable = () => <div className="h-64 mb-8 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">Inventory Table Placeholder</div>;
// const ItemSummaryCard = () => <div className="h-32 w-full bg-white rounded-lg shadow-md flex items-center justify-center text-gray-500">Item Summary Card</div>;
// const ToolsSummaryCard = () => <div className="h-32 w-full bg-white rounded-lg shadow-md flex items-center justify-center text-gray-500">Tools Summary Card</div>;

// Placeholder for the Separator component
const Separator = ({ orientation, className }) => (
  <div className={cn(
    "bg-gray-200 shrink-0",
    orientation === "horizontal" ? "w-full h-px my-4" : "h-32 w-px mx-8",
    className
  )} />
);
const cn = (...classes) => classes.filter(Boolean).join(' ');

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

export default function App() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <InventoryTable />
      <Card className="p-0 border rounded-2xl shadow-lg w-full mt-8">
        <CardHeader className="p-6 border-b border-gray-200">
          <CardTitle className="text-2xl font-semibold">{"Summary"}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-10">
          <div className={cn(
            "flex items-center",
            isMobile ? "flex-col" : "justify-between"
          )}>
            <ItemSummaryCard />
            <Separator orientation={isMobile ? "horizontal" : "vertical"} className={isMobile ? "h-px w-full my-4" : "h-[9.5rem] w-px mx-4"} />
            <ToolsSummaryCard />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
