"use client"

import { getGoodnessColor, getStateColor, Goodness, State } from "./types";
import { Activity, Cloud, CloudOff, PowerOff } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SvgBottle } from "./icons/svg-bottle";
import { SvgHeatRecover } from "./icons/svg-heat-recover";
import React, { ReactNode, useState } from "react";
import { SvgDustRemoval } from "./icons/svg-dust-removal";
import { SvgLiquidSolidSeparation } from "./icons/svg-liquid-solid-sep";
import { SvgGasHydrate } from "./icons/svg-gas-hydrate-decomposition";
import { SvgGasSolid } from "./icons/svg-gas-solid-sep";
import { SvglowTempFrac } from "./icons/svg-low-temp-frac";

interface SensorNodeProps {
    sensor_id: number,
    position: string,
    selected_sensor: number,
    setSelectedReactor: (sensor_id: number) => void,
    setGoodnessForReactorId: (reactor_id: number, goodness_code: number) => void
};

export const SensorNode = ({
    sensor_id,
    position,
    selected_sensor,
    setSelectedReactor,
    setGoodnessForReactorId,
}: SensorNodeProps) => {
    const reactor_data = useQuery(api.reactor.get, { sensorId: sensor_id });
    const state: State = reactor_data?.map(({ state }) => state)[0] ?? State.off;
    const description = reactor_data?.map(({ description }) => description)[0] ?? "";

    let icon_class = "w-[100px] h-[100px] items-center justify-center m-auto";
    if (state == State.starting || state == State.shuttingDown) {
        icon_class += " animate-pulse duration-1000";
    }

    const get_goodness = (sensors: number[][]) => {
        let good = Goodness.healthy;
        for (const sensor of sensors) {
            if (sensor[0] > sensor[2] + 3) {
                return Goodness.error;
            }
            if (sensor[1] < sensor[3] - 0.2) {
                return Goodness.error;
            }
            if (sensor[0] > sensor[2] || sensor[1] < sensor[3]) {
                good = Goodness.warning;
            }
        }
        return good;
    };
    const outputs = useQuery(api.reactor.getAsInput, { sensorId: selected_sensor })?.map(({ t, pressure, max_t, min_p }) => [t, pressure, max_t, min_p]) || [];
    const goodness = get_goodness(outputs);
    setGoodnessForReactorId(sensor_id, goodness);

    const handleClick = () => {
        if (selected_sensor == sensor_id) {
            setSelectedReactor(-1);
        }
        else {
            setSelectedReactor(sensor_id);
        }
    };

    let sensor_icon: ReactNode;
    switch (sensor_id) {
        case 0:
            sensor_icon = <SvgHeatRecover fill={getStateColor(state, goodness)} className={icon_class} />
            break;
        case 1:
        case 3:
            sensor_icon = <SvgDustRemoval fill={getStateColor(state, goodness)} className={icon_class} />
            break;
        case 2:
        case 4:
            sensor_icon = <SvgLiquidSolidSeparation fill={getStateColor(state, goodness)} className={icon_class} />
            break;
        case 5:
            sensor_icon = <SvgGasHydrate fill={getStateColor(state, goodness)} className={icon_class} />
            break;
        case 6:
            sensor_icon = <SvgGasSolid fill={getStateColor(state, goodness)} className={icon_class} />
            break;
        case 7:
            sensor_icon = <SvglowTempFrac fill={getStateColor(state, goodness)} className={icon_class} />
            break;
        default:
            sensor_icon = <SvgBottle fill={getStateColor(state, goodness)} className={icon_class} />
    };

    if (state === State.off) {
        return (
            <div
                className={`absolute ${position} w-[120px] h-[144px] flex flex-col bg-transparent hover:cursor-pointer`}
                onClick={handleClick}>
                {sensor_icon}
                <div className="relative text-xs flex">
                    <PowerOff id="status"
                        width={20}
                        height={20}
                        color="#64748b" />
                    <div className="mr-1 ml-1 w-24 text-center text-slate-500">{description}</div>
                </div>
            </div>
        );
    }
    else if (state === State.on) {
        return (
            <div
                className={`absolute ${position} w-[120px] h-[144px] flex flex-col bg-transparent hover:cursor-pointer`}
                onClick={() => setSelectedReactor(sensor_id)}>
                {sensor_icon}
                <div className="relative text-xs flex">
                    <Activity id="status"
                        width={20}
                        height={20}
                        color="#64748b" />
                    <div className="mr-1 ml-1 w-24 text-center text-slate-500">{description}</div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div
                className={`absolute ${position} w-[120px] h-[144px] flex flex-col bg-transparent hover:cursor-pointer`}
                onClick={() => { setSelectedReactor(sensor_id) }}>
                {sensor_icon}
                <div className="relative text-xs flex">
                    <Spinner
                        size="small"
                        className="text-slate-500" />
                    <div className="mr-1 ml-1 w-24 text-center text-slate-500">{description}</div>
                </div>
            </div>
        );
    }

};