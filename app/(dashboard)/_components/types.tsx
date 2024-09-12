"use client"

export enum State {
    off,
    starting,
    on,
    shuttingDown,
};

export enum Goodness {
    healthy,
    warning,
    error
};

export const PipeRange = [
    [2, 5, 284, 287, 1.8, 2.2],
    [0, 1, 284, 287, 1.8, 2.3],
    [8, 0, 370, 376, 0.4, 1],
    [1, 2, 284, 287, 1.6, 2.2],
    [2, 3, 284, 287, 1, 2.2],
    [3, 4, 284, 287, 1.6, 2.2],
    [4, 9, 284, 298, 1.0, 1.2],
    [4, 5, 284, 287, 1.6, 2.2],
    [5, 6, 284, 298, 1.0, 1.2],
    [7, 1, 243, 246, 1.0, 1.2],
    [6, 10, 294, 298, 1.0, 1.2],
    [7, 11, 243, 246, 1.0, 1.2],
    [12, 1, 284, 287, 1.6, 2.2],
  ];

 export const pipesFromReactor = {
    0: [8],
    1: [0, 7, 12],
    2: [1],
    3: [2],
    4: [3],
    5: [2, 4],
    6: [5],
    7: []
 };

export function getGoodnessColor(goodness: Goodness) {
    switch (goodness) {
        case Goodness.healthy:
            return "#3fd46e";
        case Goodness.warning:
            return "#e36a36";
        case Goodness.error:
            return "#d42724";
        default:
            return "#b8a4a4";
    }
};

export function getStateColor(state: State, goodness: Goodness) {
    if (state == State.on) {
        return getGoodnessColor(goodness);
    }
    else if (state == State.off) {
        return "#b8a4a4";
    }
    else {
        return "#35a6db";
    }
};

export function getStateText(state: State, goodness: Goodness) {
    if (state == State.on) {
        switch (goodness) {
            case Goodness.healthy:
                return "Healthy";
            case Goodness.warning:
                return "Warn";
            default:
                return "Error";
        }
    }
    else if (state == State.off) {
        return "Not running";
    }
    else if (state == State.starting){
        return "Starting";
    }
    else{
        return "Shutting down";
    }
};