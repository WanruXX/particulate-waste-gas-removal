"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { MoreVertical, Download, Circle } from "lucide-react";
import React, { useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getStateColor, getStateText, Goodness, State } from "./types";
import { Label } from "@/components/ui/label";
import { InfoPipes } from "./info-pipes";
import { ScrollArea } from "@radix-ui/react-scroll-area";


interface InfoCardProps {
    selected_reactor: number,
    goodness: Goodness
};

export const InfoCard = ({
    selected_reactor,
    goodness,
}: InfoCardProps) => {
    const is_hidden = selected_reactor >= 0 ? "" : "hidden";

    const sensor_about = ["The waste heat recovery device is used to absorb high temperature coal particles and coking dust carrying raw gas generated in the production process, and to conduct cooling treatment to lower the temperature to room temperature so as to obtain ambient temperature coal particles and coking dust containing raw gas.",
        "The gas hydrate primary dust removal tower is used for gas hydrate generation and particulate coagulation; the ambient temperature coal particles and coking dust carrying raw gas are passed into a pool for humidification, and at the same time, the R134a gas is introduced. At 1-2 atm and 2-13℃, the waste gases that can produce gas hydrate in the raw gas will preferentially generate gas hydrate on the surface of coal particles and coking dust so as to form clathrates with a larger size, and the particulates are sedimented by increasing the overall size; and part of the soluble heavy metal ions and inorganic salt ions adsorbed on the surface of coal particles and coking dust are dissolved in water.",
        "The solid-liquid separation primary tower is used to separate the solid-liquid mixture in the gas hydrate primary dust removal tower, and the heavy metal and salt ion enriched liquid containing macromolecular gas hydrate slurry obtained from the gas hydrate primary dust removal tower is subjected to solid-liquid separation by means of membrane separation; and the heavy metal and salt ion enriched liquid obtained by separation enters the gas hydrate secondary dust removal tower for humidification, and the solid gas hydrate obtained by separation enters the gas hydrate decomposition pool.",
        "The gas hydrate secondary dust removal tower is used for secondary removal of the gas hydrate generated by the gas and the water-containing coal particle and coking dust particulates that do not completely generate gas hydrate in the gas hydrate primary dust removal tower and the R134a gas at 1-2 atm and 2-13℃ to further remove coking waste gases and particulates, and to convey the formed heavy metal and salt ion highly enriched liquid containing gas hydrate slurry to the solid-liquid separation secondary tower.",
        "The solid-liquid separation secondary tower is used to separate the solid-liquid mixture containing gas hydrate slurry obtained from the gas hydrate secondary dust removal tower, the solid gas hydrate obtained by separation enters the gas hydrate decomposition pool, and the heavy metal and salt ion highly enriched liquid obtained by separation is collected; and environmental pollution is prevented, and heavy metals can be obtained by further separation for reuse. The coal particle and coking dust particulates carrying waste gases generated at this time are conveyed to the gas hydrate decomposition pool in the form of macromolecular gas hydrate slurry.",
        "The gas hydrate decomposition pool is used to decompose gas hydrate; and the gas hydrate solids obtained by separation from the first solid-liquid separation tower and the second solid-liquid separation tower are decomposed by means of pressure reduction or heating, and the gases and particulates obtained by decomposition are conveyed to the gas-solid separation tower.",
        "The gas-solid separation tower is used for gas-solid separation of the waste gases obtained from the gas hydrate decomposition pool and the R134a gas and particulates, the gases are separated from the particulates in combination with membrane separation, and the obtained water-containing coal particle and coking dust particulates are collected for centralized treatment; and the obtained waste gases and the R134a gas are conveyed to the low temperature fractionation device for separation and recovery.",
        "The low temperature fractionation device is used to separate the waste gases obtained from the gas-solid separation tower from the R134a; when the temperature drops to below the boiling point of R134a, R134a is liquefied, and the other gases are still kept in the gas phase state; the waste gases are subjected to centralized collection to be directly recovered and used as chemical materials so as to prevent exhaust into the atmosphere to pollute the environment; and the separated R134a is recovered and refiled into the gas hydrate primary dust removal tower for reuse to realize the resourceful treatment of materials."
    ];

    const reactor_data = useQuery(api.reactor.get, { sensorId: selected_reactor });
    const state: State = reactor_data?.map(({ state }) => state)[0] || State.off;
    const description = reactor_data?.map(({ description }) => description)[0] || "";

    const inputs = useQuery(api.reactor.getAsOuput, { sensorId: selected_reactor })?.map(({ t, pressure, max_t, min_p, input }) => [t, pressure, max_t, min_p, input]) || [];
    const outputs = useQuery(api.reactor.getAsInput, { sensorId: selected_reactor })?.map(({ t, pressure, max_t, min_p, output }) => [t, pressure, max_t, min_p, output]) || [];

    const total_mass = (Math.random() * 100 + 1500).toPrecision(6);

    return (
        <div className={`fixed right-0 ${is_hidden} w-[420px] h-[820px]`}>
            <ScrollArea type="always" className="w-full h-full bg-transparent overflow-scroll">
                <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                    <CardHeader className="flex flex-row items-start bg-muted/50">
                        <div className="">
                            <CardTitle className="group flex items-center gap-2 text-lg">
                                {description}
                            </CardTitle>
                            <CardDescription className="mt-4 flex items-center gap-2">
                                <Circle fill={getStateColor(state, goodness)} stroke="none" size={18} id="icon" />
                                <Label htmlFor="icon">{getStateText(state, goodness)}</Label>
                            </CardDescription>
                        </div>
                        <div className="ml-auto flex items-center gap-1">
                            <Button size="sm" variant="outline" className="h-8 gap-1">
                                <Download className="h-3.5 w-3.5" />
                                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                    Download logs
                                </span>
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="outline" className="h-8 w-8">
                                        <MoreVertical className="h-3.5 w-3.5" />
                                        <span className="sr-only">More</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View details</DropdownMenuItem>
                                    <DropdownMenuItem>Diagnose</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Delete logs</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 text-sm">
                        <div className={`${state == State.on ? "" : "hidden"}`}>
                            <InfoPipes title="Input" pipes={inputs} />
                            <Separator className="my-4" />
                            <InfoPipes title="Output" pipes={outputs} />
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                                <div className="font-bold">Total mass in the reactor</div>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground" suppressHydrationWarning>{total_mass} (~kg)</span>
                                </li>
                            </div>
                            <Separator className="my-4" />
                        </div>
                        <div className="grid gap-4">
                            <div className="grid auto-rows-max gap-3">
                                <div className="font-semibold">About</div>
                                <div className="text-muted-foreground">
                                    {sensor_about[selected_reactor]}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                        <div className="text-xs text-muted-foreground">
                            Updated <time dateTime="2024-09-12">September 12, 2024</time>
                        </div>
                    </CardFooter>
                </Card>
            </ScrollArea>
        </div>
    );
};