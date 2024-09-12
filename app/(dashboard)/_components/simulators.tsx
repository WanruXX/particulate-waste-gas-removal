import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { Goodness, PipeRange, State } from "./types";

function sleep(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

export function Simulator() {

  function sleep(delay: number) {
    return new Promise(res => setTimeout(res, delay));
  }

  const mutateReactorState = useMutation(api.reactor.updateState)
  const mutatePipeState = useMutation(api.simulator.updatePipeState)
  const mutateSystem = useMutation(api.simulator.updateSystem);
  const [simulation_goodness, setSimulateGoodness] = useState(Goodness.healthy);
  const [time, setTime] = useState(0);
  const [init, setInit] = useState(false);

  function tick(time: number) {
    setTime(time + 1);
  }

  useEffect(() => {
    if (init && time < 1000) {
      for (let i = 1; i < 13; i++) {
        mutatePipeState({ input: PipeRange[i][0], output: PipeRange[i][1], newT: Math.random() * 2 + PipeRange[i][2], newP: PipeRange[i][5] - Math.random() * 0.2 });
      }

      if (simulation_goodness == Goodness.healthy) {
        mutatePipeState({ input: PipeRange[0][0], output: PipeRange[0][1], newT: Math.random() * 2 + PipeRange[0][2], newP: PipeRange[0][4] - Math.random() * 0.2 });
      }
      else if (simulation_goodness == Goodness.warning) {
        mutatePipeState({ input: PipeRange[0][0], output: PipeRange[0][1], newT: Math.random() * 2 + PipeRange[0][3] + 1, newP: PipeRange[0][4] - Math.random() * 0.2 });
      }
      else {
        mutatePipeState({ input: PipeRange[0][0], output: PipeRange[0][1], newT: Math.random() * 2 + PipeRange[0][3] + 3, newP: PipeRange[0][4] - 0.1 - Math.random() * 0.2 });
      }

      mutateSystem({ new_capacity: Math.random() * 10 + 70, new_handled: 0.5787 * time, new_profit: 0.7389 * time });

      const timeId = setInterval(() => tick(time), 2000);
      return function cleanup() {
        clearInterval(timeId);
      };
    }
  }, [time, init, simulation_goodness, PipeRange, mutatePipeState, mutateSystem]);

  useEffect(() => {
    async function keyDownHandler(e: globalThis.KeyboardEvent) {
      if (e.key === "0" && e.ctrlKey) {
        e.preventDefault();
        mutateReactorState({ sensorId: 0, newState: State.on });
        await sleep(Math.random() * 2000);
        mutateReactorState({ sensorId: 7, newState: State.on });
        await sleep(Math.random() * 2000);
        mutateReactorState({ sensorId: 2, newState: State.on });
        await sleep(Math.random() * 2000);
        mutateReactorState({ sensorId: 3, newState: State.on });
        await sleep(Math.random() * 2000);
        mutateReactorState({ sensorId: 6, newState: State.on });
        await sleep(Math.random() * 2000);
        mutateReactorState({ sensorId: 5, newState: State.on });
        await sleep(Math.random() * 2000);
        mutateReactorState({ sensorId: 4, newState: State.on });
        await sleep(Math.random() * 2000);
        mutateReactorState({ sensorId: 1, newState: State.on });
        setSimulateGoodness(Goodness.healthy);
        setInit(true);
      }
      else if (e.key === "1" && e.ctrlKey) {
        e.preventDefault();
        mutateReactorState({ sensorId: 2, newState: State.off });
        await sleep(Math.random() * 2000);
        mutateReactorState({ sensorId: 4, newState: State.off });
        await sleep(Math.random() * 2000);
        mutateReactorState({ sensorId: 5, newState: State.off });
        await sleep(Math.random() * 2000);
        mutateReactorState({ sensorId: 0, newState: State.off });
        await sleep(Math.random() * 2000);
        mutateReactorState({ sensorId: 6, newState: State.off });
        await sleep(Math.random() * 2000);
        mutateReactorState({ sensorId: 7, newState: State.off });
        await sleep(Math.random() * 2000);
        mutateReactorState({ sensorId: 1, newState: State.off });
        await sleep(Math.random() * 2000);
        mutateReactorState({ sensorId: 3, newState: State.off });
      }
      else if (e.key === "7" && e.ctrlKey) {
        e.preventDefault();
        setSimulateGoodness(Goodness.healthy);
      }
      else if (e.key === "8" && e.ctrlKey) {
        e.preventDefault();
        setSimulateGoodness(Goodness.warning);
      }
      else if (e.key === "9" && e.ctrlKey) {
        e.preventDefault();
        setSimulateGoodness(Goodness.error);
      }

    }

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [mutateReactorState, mutatePipeState, time, sleep, setSimulateGoodness, setInit]);
}