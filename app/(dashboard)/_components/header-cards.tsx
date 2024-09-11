"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { getGoodnessColor, getStateColor, getStateText, State } from "./types";
import { api } from "@/convex/_generated/api";
import { stringify } from "querystring";
import { Circle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { CalendarForm } from "./date-picker";
import { useState } from "react";
import { setDate } from "date-fns";

interface HearderCardsProps {
    goodness: number[],
};

export const HearderCards = ({
    goodness
}: HearderCardsProps) => {
    const data = useQuery(api.reactor.getNumInStates) || {};

    const get_system_state = () => {
        if (data[State.on] == 8) {
            return State.on;
        }
        else if (data[State.off] == 8) {
            return State.off;
        }
        else if (data[State.starting] ? data[State.starting] > 0 : false) {
            return State.starting;
        }
        else {
            return State.shuttingDown;
        }
    }
    const system_state = get_system_state();
    const system_goodness = Math.max(...goodness);

    const mutateSensorStatus = useMutation(api.reactor.updateState)
    const startSystem = () => {
        for (let i = 0; i < 8; i++) {
            mutateSensorStatus({ sensorId: i, newStatusCode: State.starting });
        }
    };
    const shutdownSystem = () => {
        for (let i = 1; i < 8; i++) {
            mutateSensorStatus({ sensorId: i, newStatusCode: State.shuttingDown });
        }
    };

    const system_data = useQuery(api.system.get);
    const [date_processed, setDateProcessed] = useState<Date | undefined>(new Date());
    const [date_profit, setDateProfit] = useState<Date | undefined>(new Date());

    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                <CardHeader className="pb-3">
                    <CardTitle>Overview</CardTitle>
                    <CardDescription className="max-w-lg text-balanced leading-relaxed flex items-center gap-3">
                        <Circle fill={getStateColor(system_state, system_goodness)} stroke="none" size={18} id="icon" />
                        <Label htmlFor="icon">{getStateText(system_state, system_goodness)}</Label>
                        <Button
                            className={`ml-48 rounded-full w-32 ${(system_state == State.off || system_state == State.starting) ? "bg-green-500" : "bg-red-500"}`}
                            disabled={system_state == State.starting || system_state == State.shuttingDown}
                            onClick={system_state == State.off ? () => startSystem() : () => shutdownSystem()}>
                            {(system_state == State.off || system_state == State.starting) ? "Start" : "Stop"}
                        </Button>
                    </CardDescription>
                </CardHeader>
                <CardContent >
                    <div className="flex flex-row">
                        <div className="w-5/6">
                            <div className="text-sm">The system is operating at its maximum capacity's</div>
                            <Progress value={system_state == State.on ? system_data?.capacity : 0} className="w-5/6 mt-2" />
                        </div>
                        <div className="text-3xl font-semibold mt-2">{system_state == State.on ? system_data?.capacity : ""}%</div>
                    </div>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                        Total processed (approx.)
                    </CardDescription>
                    <CardTitle
                        className="text-xl">{system_state == State.on ? (system_data ? (system_data.handled + (date_processed ? Math.round(((new Date()).getTime() - date_processed.getTime()) / (1000 * 3600 * 24) * 42329) : 0)).toPrecision(6) : "") : ""} m<sup>3</sup>/s
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">since</div>
                </CardContent>
                <CardFooter>
                    <CalendarForm setDate={setDateProcessed} />
                </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                        Total processed (approx.)
                    </CardDescription>
                    <CardTitle
                        className="text-xl">{system_state == State.on ? (system_data ? (system_data.profit + (date_profit ? Math.round(((new Date()).getTime() - date_profit.getTime()) / (1000 * 3600 * 24) * 31274) : 0)).toPrecision(6) : "") : ""} $
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">since</div>
                </CardContent>
                <CardFooter>
                    <CalendarForm setDate={setDateProfit} />
                </CardFooter>
            </Card>
        </div>
    );
};