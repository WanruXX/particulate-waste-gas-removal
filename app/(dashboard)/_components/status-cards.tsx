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
import { StateCode } from "./types";
import { api } from "@/convex/_generated/api";
import { stringify } from "querystring";
import { Circle } from "lucide-react";
import { Label } from "@/components/ui/label";

export const StatusCards = () => {

    const mutateSensorStatus = useMutation(api.reactor.updateState)
    const startSystem = () => {
        for (let i = 0; i < 8; i++) {
            mutateSensorStatus({ sensorId: i, newStatusCode: StateCode.starting });
        }
    };
    const shutdownSystem = () => {
        for (let i = 1; i < 8; i++) {
            mutateSensorStatus({ sensorId: i, newStatusCode: StateCode.shuttingDown });
        }
    };

    // const num_disconnect = (useQuery(api.sensor.getInStatus, { status: SensorStatus.Disconnected }))?.length || 0;
    // const num_connecting = (useQuery(api.sensor.getInStatus, { status: SensorStatus.Connecting }))?.length || 0;
    // const num_connected = (useQuery(api.sensor.getInStatus, { status: SensorStatus.Connected }))?.length || 0;
    // const num_error = (useQuery(api.sensor.getInStatus, { status: SensorStatus.Error }))?.length || 0;

    // const sensor_finished = useQuery(api.sensor.getInStatus, { status: SensorStatus.Finnished });
    // const num_finished = sensor_finished?.length || 0;
    // const running_sensor_id = num_finished;
    // const current_step = useQuery(api.sensor.get, { sensorId: running_sensor_id });
    // const current_step_progress = current_step?.map(({ progress }) => progress)[0] || 0;
    // const overall_progress = num_finished * 100/ 8 + current_step_progress / 8;

    let status_text = "";
    let button_text = "";
    let button_disabled = false;
    // if (num_disconnect > 0) {
    //     status_text = "System is disconnected."
    //     button_text = "Connect now";
    //     button_disabled = false;
    // } else if (num_connecting > 0) {
    //     status_text = "Trying to connect..."
    //     button_text = "Connect now";
    //     button_disabled = true;
    // } else if (num_connected === 8) {
    //     status_text = "System is connected and ready to run."
    //     button_text = "Run now";
    //     button_disabled = false;
    // } else if (num_finished === 8) {
    //     status_text = "System finished running."
    //     button_text = "Rerun";
    //     button_disabled = false;
    // }
    // else if (num_finished < 8) {
    //     status_text = "System is running...";
    //     button_text = "Run now";
    //     button_disabled = true;
    // }
    // else {
    //     status_text = "Unknown."
    //     button_text = "Connect now";
    //     button_disabled = false;
    // }


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
            <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Status</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                        <Circle fill="#3fd46e" stroke="none" size={18} id="icon" />
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
            </Card>
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