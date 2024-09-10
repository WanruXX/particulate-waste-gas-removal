"use client"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuCheckboxItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilter, File } from "lucide-react";
import { GraphView } from "./view-graph";
import { TableView } from "./view-table";
import { TimelineView } from "./view-timeline";

interface ViewTabsProps {
    selected_sensor: number,
    set_selected_sensor: (sensor_id: number) => void
};

export const ViewTabs = ({
    selected_sensor,
    set_selected_sensor

}: ViewTabsProps) => {
    return (
        <Tabs defaultValue="Graph view" className="h-[1200px]">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="Graph view">Graph view</TabsTrigger>
                    <TabsTrigger value="Table view">Table view</TabsTrigger>
                    <TabsTrigger value="Timeline view">Timeline view</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-7 gap-1 text-sm"
                            >
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only">Filter</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked>
                                Fulfilled
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Declined
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Refunded
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-7 gap-1 text-sm"
                    >
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Export</span>
                    </Button>
                </div>
            </div>
            <GraphView selected_sensor={selected_sensor} set_selected_sensor={set_selected_sensor} />
            <TableView />
            <TimelineView />
        </Tabs>
    );
};