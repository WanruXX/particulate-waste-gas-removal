"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import { NavBar } from "./_components/navbar";
import { SearchInput } from "./_components/search-input";
import { UserAvatar } from "./_components/user-avatar";
import { HearderCards } from "./_components/header-cards";
import { ViewTabs } from "./_components/view-tabs";
import { Button } from "@/components/ui/button";
import { InfoCard } from "./_components/info-card";
import React from "react";
import { Goodness, PipeRange, State } from "./_components/types";
import { Simulator } from "./_components/simulators";
import { updatePipeThresh } from "@/convex/simulator";
import Image from "next/image";

export default function Dashboard() {

  const [selected_reactor, setSelectedReactor] = React.useState(-1);

  const [goodness, setGoodnessAll] = React.useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const setGoodnessForReactors = (new_goodness: number[]) => {
    setGoodnessAll(new_goodness);
  };

  Simulator();

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <NavBar />

        <Image src="/floee_logo.png" width={35} height={35} alt="logo" className="relative left-[730px] overflow-hidden"/>
        <Image src="/floee_text.png" width={80} height={200} alt="logo" className="relative left-[720px]"/>
        <SearchInput />
        <UserAvatar />
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="h-[1500px] grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <HearderCards goodness={goodness} />
          <ViewTabs selected_sensor={selected_reactor} setSelectedReactor={setSelectedReactor} goodness={goodness} setGoodnessForReactors={setGoodnessForReactors} />
          <InfoCard selected_reactor={selected_reactor} goodness={goodness[selected_reactor] || Goodness.healthy} />
        </div>

      </main >
    </div>
  )
}
