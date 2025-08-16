import { SummaryCard } from "@/app/components/subcomponents/SummaryCard";
import { Package, Truck, LucideIcon } from "lucide-react";

const inventoryStats = [
    { icon: Package, value: 868, label: "Quantity in Hand", iconColor: "bg-orange-100 text-orange-500" },
    { icon: Truck, value: 200, label: "To be received", iconColor: "bg-violet-100 text-violet-500" },
];
const ItemSummaryCard = () => {
    return (
        <>
            <SummaryCard
                stats={inventoryStats}
                title="Item Stats"
                key="items"
            />
        </>
    )
}

export default ItemSummaryCard;