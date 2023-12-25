import {createBrowserHistory, History} from 'history';
import {FlowHistory} from './createFlowHistory';

export default function correctHistory(history: History | undefined, flowHistory: FlowHistory) {
    if (!history) history = createBrowserHistory();
    window.$flow = flowHistory.lastLocations;

    const lastLocationJson = JSON.stringify(flowHistory.lastLocations[flowHistory.lastLocations.length - 1])
    if (lastLocationJson != JSON.stringify(history.location))
        flowHistory.pushAction(history!.location)

    history.listen(() => {
        if (history!.action === 'POP' || history!.action === 'REPLACE')
            flowHistory.pop();
        if (history!.action === 'PUSH' || history!.action === 'REPLACE')
            flowHistory.pushAction(history!.location)
    });
    return history;
}
