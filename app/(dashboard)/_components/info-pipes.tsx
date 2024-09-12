"use client"

import { Progress } from "@/components/ui/progress";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface InfoPipesProps {
    title: string,
    pipes: number[][],
};

const get_progress_color_t = (cur_t: number, max_t: number) => {
    if (cur_t < max_t) {
        return "bg-green-600";
    }
    else if (cur_t < max_t + 3) {
        return "bg-orange-600";
    }
    else {
        return "bg-red-600";
    }
};

const get_progress_color_p = (cur_p: number, min_p: number) => {
    if (cur_p > min_p) {
        return "bg-green-600";
    }
    else if (cur_p > min_p - 0.2) {
        return "bg-orange-600";
    }
    else {
        return "bg-red-600";
    }
};

const descriptions = [
    "Waste heat recovery",
    "Gas hydrate primary dust removal",
    "1st solid-liquid separation",
    "Gas hydrate secondary dust removal",
    "2nd solid-liquid separation",
    "Gas hydrate decomposition",
    "Gas-solid separation",
    "Low temperature fractionation"
];

export const InfoPipes = ({
    title,
    pipes,
}: InfoPipesProps) => {

    const rate = parseFloat((Math.random() * 0.02 + 0.57).toPrecision(4));

    const children = pipes.map((data) => (
        <ul className="grid gap-2" key={data[4]}>
            <div className="font-medium">{descriptions[data[4]]}</div>
            <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Temperature (K)</span>
            </li>
            <li className="flex items-center justify-between text-muted-foreground">
                <span>{data[0].toPrecision(6)}</span>
                <Progress className="w-4/5" value={(data[0] - data[2] + 18) * 100 / 24} color={get_progress_color_t(data[0], data[2])} />
            </li>
            <li className="flex items-center justify-between text-muted-foreground">
                <span className="text-muted-foreground">Pressure (atm)</span>
            </li>
            <li className="flex items-center justify-between text-muted-foreground">
                <span>{data[1].toPrecision(4)}</span>
                <Progress className="w-4/5" value={(data[1]) * 100 / 2.5} color={get_progress_color_p(data[1], data[3])} />
            </li>
            <li className="flex items-center justify-between text-muted-foreground">
                <span className="text-muted-foreground">Flow rate (m<sup>3</sup>/s)</span>
            </li>
            <li className="flex items-center justify-between mb-2 text-muted-foreground">
                <span>{rate}</span>
                <Progress className="w-4/5" value={rate * 100} color="bg-green-600" />
            </li>
        </ul>
    )
    );


    return (
        <div className="grid gap-3">
            <div className="font-bold text-base">{title}</div>
            {children}
        </div>
    );

};