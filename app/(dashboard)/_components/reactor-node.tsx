"use client"

import { StateCode } from "./types";
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
    set_selected_sensor: (sensor_id: number) => void,
    set_goodness: (goodness: number) => void,
};

export const SensorNode = ({
    sensor_id,
    position,
    selected_sensor,
    set_selected_sensor,
    set_goodness,
}: SensorNodeProps) => {
    const sensor_data = useQuery(api.reactor.get, { sensorId: sensor_id });
    const [status, description] = sensor_data?.map(({ status, description }) => [status, description])[0] || [StateCode.off, ""];


    let icon_class = "w-[100px] h-[100px] items-center justify-center m-auto";
    if (status == StateCode.starting || status == StateCode.shuttingDown) {
        icon_class += " animate-pulse duration-1000";
    }


    let icon_color = "#b8a4a4";
    if (status == StateCode.starting || status == StateCode.shuttingDown) {
        icon_color = "#35a6db";
    } else if (status == StateCode.on) {
        icon_color = "#3fd46e";
        const outputs = useQuery(api.reactor.getAsInput, { sensorId: selected_sensor })?.map(({ t, pressure, max_t, min_p }) => [t, pressure, max_t, min_p]) || [];

        let good = 0;
        for (const output of outputs) {
            if (output[0] > output[2] + 3) {
                good = 2;
                break;
            }
            if (output[1] < output[3] - 0.2) {
                good = 2;
                break;
            }
            if (output[0] > output[2] || output[1] < output[3]) {
                good = 1;
            }
        }

        if (good == 1) {
            icon_color = "#e36a36";
        }
        else if (good == 2) {
            icon_color = "#d42724";
        }
        set_goodness(good);
    }

    const handleClick = () => {
        if (selected_sensor == sensor_id) {
            set_selected_sensor(-1);
        }
        else {
            set_selected_sensor(sensor_id);
        }
    };

    let sensor_icon: ReactNode;
    switch (sensor_id) {
        case 0:
            sensor_icon = <SvgHeatRecover fill={icon_color} className={icon_class} />
            break;
        case 1:
        case 3:
            sensor_icon = <SvgDustRemoval fill={icon_color} className={icon_class} />
            break;
        case 2:
        case 4:
            sensor_icon = <SvgLiquidSolidSeparation fill={icon_color} className={icon_class} />
            break;
        case 5:
            sensor_icon = <SvgGasHydrate fill={icon_color} className={icon_class} />
            break;
        case 6:
            sensor_icon = <SvgGasSolid fill={icon_color} className={icon_class} />
            break;
        case 7:
            sensor_icon = <SvglowTempFrac fill={icon_color} className={icon_class} />
            break;
        default:
            sensor_icon = <SvgBottle fill={icon_color} className={icon_class} />
    };

    if (status === StateCode.off) {
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
    else if (status === StateCode.on) {
        return (
            <div
                className={`absolute ${position} w-[120px] h-[144px] flex flex-col bg-transparent hover:cursor-pointer`}
                onClick={() => set_selected_sensor(sensor_id)}>
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
                onClick={() => { set_selected_sensor(sensor_id) }}>
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