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
import { getGoodnessColor, getStateColor, State } from "./types";
import { api } from "@/convex/_generated/api";
import { stringify } from "querystring";
import { Circle } from "lucide-react";
import { Label } from "@/components/ui/label";

interface HearderCardsProps{
    goodness: number[],
};

export const HearderCards = ({
    goodness
}: HearderCardsProps) => {

    const system_status = () => {
        if (useQuery(api.reactor.getNumInState, { status: State.on }) == 8) {
          return State.on;
        }
        else if (useQuery(api.reactor.getNumInState, { status: State.off }) == 8) {
          return State.off;
        }
        else {
          const num_starting = useQuery(api.reactor.getNumInState, { status: State.starting });
          if (num_starting ? num_starting > 0 : false) {
            return State.starting;
          }
          else {
            return State.shuttingDown;
          }
        }
      }

      const data = useQuery(api.reactor.getNumInStates);
      console.log("data", data);

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

    // let status_text = "";
    // let button_text = "";
    // let button_disabled = false;

    // // console.log(goodness);
    // const system_goodness = Math.max(...goodness);


    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                <CardHeader className="pb-3">
                    <CardTitle>Overview</CardTitle>
                    <CardDescription className="max-w-lg text-balanced leading-relaxed flex items-center gap-3">
                        <Button className="mt-2 w-16">Start</Button>
                    </CardDescription>
                </CardHeader>
                <CardContent >
                    <div className="flex flex-row">
                        <div className="w-5/6">
                            <div className="text-sm">The system is operating at its maximum capacity's</div>
                            <Progress value={50} className="w-5/6 mt-2" />
                        </div>
                        <div className="text-4xl font-semibold">50%</div>
                    </div>
                </CardContent>
            </Card>
            {/* <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Status</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                        <Circle fill={getStateColor(system_status(), system_goodness)} stroke="none" size={18} id="icon" />
                        <Label htmlFor="icon">Healthy</Label>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">
                        Since start:
                    </div>
                </CardContent>
                <CardFooter>
                    nothing
                </CardFooter>
            </Card> */}
            {/* <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                    <CardDescription>Overall progress</CardDescription>
                    <CardTitle className="text-xl">{overall_progress}%</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">
                        {8 - num_finished} step{num_finished === 7 ? "" : "s"} to run
                    </div>
                </CardContent>
                <CardFooter>
                    <Progress value={overall_progress} aria-label="overall progress" />
                </CardFooter>
            </Card> */}
        </div>
    );
};