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