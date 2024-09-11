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
import { State } from "./_components/types";

export const description =
  "An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information."

export default function Dashboard() {

  const [selected_sensor, setSelectedReactor] = React.useState(-1);

  const [goodness, setGoodnessAll] = React.useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const setGoodnessForReactorId = (reactor_id: number, goodness_code: number) => {
    let new_goodness = goodness;
    new_goodness[reactor_id] = goodness_code;
    setGoodnessAll(new_goodness);
  };

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

  const reactor_data = useQuery(api.reactor.getAllReactors);
  const [state, description] = reactor_data?.map(({ state, description }) => [state, description])[0] || [State.off, ""];

  // const pipe_data = useQuery(api.reactor.getAllReactors);
  // const [state, description] = reactor_data?.map(({ state, description }) => [state, description])[0] || [StateCode.off, ""];

  // const new_goodness = state.map(());


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
          <ViewTabs selected_sensor={selected_sensor} setSelectedReactor={setSelectedReactor} setGoodnessForReactorId={setGoodnessForReactorId} />
          <InfoCard selected_sensor={selected_sensor} />
        </div>

      </main >
    </div>
  )
}
