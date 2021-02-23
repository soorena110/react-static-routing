import {History} from 'history';

type Location = History["location"];

export interface FlowHistory {
    lastLocations: Location[];
    pushAction: (action: Location) => void;
    pop: (count?: number) => void;
}

export default function createFlowHistory(sessionStorageKey = 'flowHistory'): FlowHistory {
    const lastLocations: Location[] = getSession(sessionStorageKey) ?? [];

    return {
        get lastLocations() {
            return lastLocations;
        },
        pushAction(action) {
            lastLocations.push(action);
            setSession(sessionStorageKey, lastLocations);
        },
        pop(count = 1) {
            lastLocations.splice(lastLocations.length - count);
            setSession(sessionStorageKey, lastLocations);
        }
    };
}

function getSession(sessionStorageKey: string) {
    try {
        const session = sessionStorage.getItem(sessionStorageKey);
        if (session) return JSON.parse(session);
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

function setSession(sessionStorageKey: string, flowHistory: object) {
    try {
        const stringifiedValue = JSON.stringify(flowHistory);
        sessionStorage.setItem(sessionStorageKey, stringifiedValue);
    } catch (e) {
        console.error(e);
    }
}
