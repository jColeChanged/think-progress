
import {progressDuringWindow, interpolation} from './ThinkProgressTable';
import {dataset} from "./Data";


it('test progress over window', () => {

    let windowStart = new Date("2021-1-1");
    let windowEnd = new Date("2021-1-3");
    let window = [windowStart, windowEnd];
    let entries = dataset['Book One'];
    let expectedProgress = 30;
    let actualProgress = progressDuringWindow(entries, window);

    expect(actualProgress).toEqual(expectedProgress);
});