"use client"


import { TabsContent, } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area"
import { SensorNode } from "./reactor-node";
import Image from "next/image";
import { useState } from "react";
import { Droplet, Droplets } from "lucide-react";
import { SvgWaterSupply } from "./icons/svg-water-supply";
import { SvgDollar } from "./icons/svg-dollar";
import { SvgOilExtraction } from "./icons/svg-oil-extraction";
import { SvgPowerPlant } from "./icons/svg-pwer-plant";

interface AnimatedDashPrps {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
};
const AnimatedDash = ({
    x1,
    y1,
    x2,
    y2,
}: AnimatedDashPrps) => {
    return (
        <line x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="black"
            stroke-width="2"
            fill="none"
            stroke-dasharray="5"
            stroke-dashoffset="3600"
            style={{ animation: 'dash 300s linear infinite' }}
            className="absolute" />
    );
};

interface AnimatedPolylineProps {
    points: string,
};
const AnimatedPolyline = ({
    points,
}: AnimatedPolylineProps) => {
    return (
        <polyline points={points}
            stroke="black"
            stroke-width="2"
            fill="none"
            stroke-dasharray="5"
            stroke-dashoffset="3600"
            style={{ animation: 'dash 300s linear infinite' }}
            className="absolute" />
    );
};

interface GraphViewProps {
    selected_sensor: number,
    setSelectedReactor: (sensor_id: number) => void,
    setGoodnessForReactorId: (reactor_id: number, goodness_code: number) => void
};

export const GraphView = ({
    selected_sensor,
    setSelectedReactor,
    setGoodnessForReactorId
}: GraphViewProps) => {
    return (
        <TabsContent value="Graph view">
            <ScrollArea >
                <div className="relative h-[1200px] w-[1000px] rounded-md border p-4">
                    <SensorNode sensor_id={0} position="left-[20px] top-[200px]" selected_sensor={selected_sensor} setSelectedReactor={setSelectedReactor} setGoodnessForReactorId={setGoodnessForReactorId} />
                    <SensorNode sensor_id={1} position="left-[218px] top-[205px]" selected_sensor={selected_sensor} setSelectedReactor={setSelectedReactor} setGoodnessForReactorId={setGoodnessForReactorId} />
                    <SensorNode sensor_id={2} position="left-[220px] top-[420px]" selected_sensor={selected_sensor} setSelectedReactor={setSelectedReactor} setGoodnessForReactorId={setGoodnessForReactorId} />
                    <SensorNode sensor_id={3} position="left-[220px] top-[640px]" selected_sensor={selected_sensor} setSelectedReactor={setSelectedReactor} setGoodnessForReactorId={setGoodnessForReactorId} />
                    <SensorNode sensor_id={4} position="left-[220px] top-[860px]" selected_sensor={selected_sensor} setSelectedReactor={setSelectedReactor} setGoodnessForReactorId={setGoodnessForReactorId} />
                    <SensorNode sensor_id={5} position="left-[420px] top-[420px]" selected_sensor={selected_sensor} setSelectedReactor={setSelectedReactor} setGoodnessForReactorId={setGoodnessForReactorId} />
                    <SensorNode sensor_id={6} position="left-[640px] top-[420px]" selected_sensor={selected_sensor} setSelectedReactor={setSelectedReactor} setGoodnessForReactorId={setGoodnessForReactorId} />
                    <SensorNode sensor_id={7} position="left-[640px] top-[200px]" selected_sensor={selected_sensor} setSelectedReactor={setSelectedReactor} setGoodnessForReactorId={setGoodnessForReactorId} />
                    <Image
                        src="/smoke-icon.svg"
                        alt="input waste gas"
                        width={60}
                        height={60}
                        className="absolute left-[60px] top-[40px]" />
                    <Droplets
                        width={60}
                        height={60}
                        strokeWidth={1.3}
                        className="absolute left-[250px] top-[40px]" />
                    <Image
                        src="/ion-enriched-liquid.svg"
                        alt="ion enriched liquid"
                        width={60}
                        height={60}
                        className="absolute left-[245px] top-[1100px]" />
                    <Image
                        src="/water-containing-particulates.png"
                        alt="water-containing particulates"
                        width={90}
                        height={90}
                        className="absolute left-[656px] top-[660px]" />
                    <SvgWaterSupply fill="#4abced" className="absolute left-[660px] top-[860px]" />
                    <Image
                        src="/output-gas.svg"
                        alt="output waste gas"
                        width={80}
                        height={80}
                        className="absolute left-[860px] top-[225px]" />
                    <SvgPowerPlant fill="#e67732" className="absolute left-[865px] top-[35px]" />
                    <SvgOilExtraction fill="#87601b" className="absolute left-[860px] top-[430px]" />
                    <Image src="/coin.svg" alt="coin1" width={30} height={30} className="absolute left-[850px] top-[485px]" />
                    <Image src="/coin.svg" alt="coin2" width={30} height={30} className="absolute left-[850px] top-[90px]" />
                    <Image src="/coin.svg" alt="coin3" width={30} height={30} className="absolute left-[643px] top-[900px]" />
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <AnimatedDash x1={120} y1={240} x2={205} y2={240} />
                        <AnimatedDash x1={260} y1={340} x2={260} y2={400} />
                        <AnimatedDash x1={260} y1={555} x2={260} y2={615} />
                        <AnimatedDash x1={260} y1={775} x2={260} y2={835} />
                        <AnimatedDash x1={315} y1={470} x2={410} y2={470} />
                        <AnimatedPolyline points="315 910 460 910 460 555" />
                        <AnimatedDash x1={520} y1={470} x2={630} y2={470} />
                        <AnimatedDash x1={682} y1={400} x2={682} y2={340} />
                        <AnimatedPolyline points="682 180 682 140 260 140 260 180" />
                        <AnimatedDash x1={65} y1={100} x2={65} y2={180} />
                        <AnimatedDash x1={260} y1={90} x2={260} y2={180} />
                        <AnimatedDash x1={260} y1={1000} x2={260} y2={1080} />
                        <AnimatedDash x1={735} y1={250} x2={830} y2={250} />
                        <AnimatedDash x1={682} y1={555} x2={682} y2={640} />
                        <AnimatedDash x1={682} y1={740} x2={682} y2={825} />
                        <AnimatedDash x1={882} y1={190} x2={882} y2={100} />
                        <AnimatedDash x1={882} y1={310} x2={882} y2={400} />
                    </svg>
                </div>
            </ScrollArea>
        </TabsContent>
    );
};