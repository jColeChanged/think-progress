
import {progressDuringWindow, interpolation} from './ThinkProgressTable';
import {dataset} from "./Data";

it('test reasonable progress interpolations', () => {
    let start = 10;
    let end = 50;
    let delta = 10;
    let expectedProgression = [20, 30, 40, 50];
    let actualProgression = interpolation(start, end, delta);
    expect(actualProgression).toEqual(expectedProgression);
});

it('test unreasonable progress', () => {
    let start = 10;
    let end = 50;
    let delta = 0;
    let expectedProgression = "A very long time, if ever.";
    let actualProgression = interpolation(start, end, delta);
    expect(actualProgression).toEqual(expectedProgression);
});

it('test progress over window', () => {

    let windowStart = new Date("2021-1-1");
    let windowEnd = new Date("2021-1-3");
    let window = [windowStart, windowEnd];
    let entries = dataset['Book One'];
    let expectedProgress = 30;
    let actualProgress = progressDuringWindow(entries, window);

    expect(actualProgress).toEqual(expectedProgress);
});