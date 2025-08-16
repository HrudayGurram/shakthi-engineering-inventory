"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    TooltipProps,
} from "recharts";

type DataPoint = {
    name: string;
    value: number;
};

const data: DataPoint[] = [
    { name: "Page A", value: 400 },
    { name: "Page B", value: 300 },
    { name: "Page C", value: 200 },
    { name: "Page D", value: 278 },
    { name: "Page E", value: 189 },
];

// ✅ Strongly typed custom tooltip
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border p-2 rounded shadow text-sm">
                <p className="font-medium">{`Label: ${label}`}</p>
                <p>{`Value: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

export default function ChartComponent() {
    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
