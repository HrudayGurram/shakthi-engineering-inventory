import * as React from "react";
import { Package, Truck, LucideIcon } from "lucide-react";
import { cn } from "@/app/figma/components/utils";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/app/figma/components/card";

// Define a type for the individual statistic cards
interface Stat {
    icon: LucideIcon;
    value: number | string;
    label: string;
    iconColor: string;
}

// A reusable component for each stat display
const StatCard = ({ icon: Icon, value, label, className, iconColor }: Stat & { className?: string }) => {
    return (
        <div className={cn("flex flex-col items-center p-4", className)}>
            <div className={cn("p-3 rounded-full mb-3", iconColor)}>
                <Icon className="h-8 w-8" />
            </div>
            <div className="text-2xl font-bold mb-1">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
        </div>
    );
};

interface ItemSummaryCardProps {
    title: string;
    stats: Stat[];
}

export function SummaryCard({ title, stats }: ItemSummaryCardProps) {
    return (
        <Card className="p-0 border rounded-2xl shadow-lg w-full max-w-sm">
            <CardHeader className="p-6 border-b border-gray-200">
                <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="grid grid-cols-2 divide-x divide-gray-200">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            icon={stat.icon}
                            value={stat.value}
                            label={stat.label}
                            iconColor={stat.iconColor}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

// // A simple App component to demonstrate the usage.
// // This is for demonstration purposes only.
// function App() {
//     // Example usage with different stats
//     const inventoryStats = [
//         { icon: Package, value: 868, label: "Quantity in Hand", iconColor: "bg-orange-100 text-orange-500" },
//         { icon: Truck, value: 200, label: "To be received", iconColor: "bg-violet-100 text-violet-500" },
//     ];

//     const projectStats = [
//         { icon: Package, value: 54, label: "Active Projects", iconColor: "bg-green-100 text-green-500" },
//         { icon: Truck, value: 12, label: "Pending Deliveries", iconColor: "bg-red-100 text-red-500" },
//     ];

//     return (
//         <div className="flex flex-col gap-8 justify-center items-center h-screen bg-gray-100">
//             <ItemSummaryCard title="Inventory Summary" stats={inventoryStats} />
//             <ItemSummaryCard title="Project Summary" stats={projectStats} />
//         </div>
//     );
// }

// export default App;
