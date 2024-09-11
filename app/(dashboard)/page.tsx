"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import { NavBar } from "./_components/navbar";
import { SearchInput } from "./_components/search-input";
import { UserAvatar } from "./_components/user-avatar";
import { StatusCards } from "./_components/status-cards";
import { ViewTabs } from "./_components/view-tabs";
import { Button } from "@/components/ui/button";
import { InfoCard } from "./_components/info-card";
import React from "react";
import { StateCode } from "./_components/types";

export const description =
  "An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information."

export default function Dashboard() {

  const [selected_sensor, setSelectedReactor] = React.useState(-1);

  const [goodness, setReactorGoodness] = React.useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const system_status = () => {
    if (useQuery(api.reactor.getNumInState, { status: StateCode.on }) == 8) {
      return StateCode.on;
    }
    else if (useQuery(api.reactor.getNumInState, { status: StateCode.off }) == 8) {
      return StateCode.off;
    }
    else {
      const num_starting = useQuery(api.reactor.getNumInState, { status: StateCode.starting });
      if (num_starting ? num_starting > 0 : false) {
        return StateCode.starting;
      }
      else {
        return StateCode.shuttingDown;
      }
    }
  }

  const reactor_data = useQuery(api.reactor.getAllReactors);
  // const [status, description] = sensor_data?.map(({ status, description }) => [status, description])[0] || [SensorStatus.off, ""];


  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <NavBar />
        <SearchInput />
        <UserAvatar />
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="h-[1450px] grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <StatusCards />
          <ViewTabs selected_sensor={selected_sensor} set_selected_sensor={setSelectedReactor} />
          <InfoCard selected_sensor={selected_sensor} />
        </div>

      </main >
    </div>
  )
}
