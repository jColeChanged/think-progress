import {ThinkProgressAnalysis} from './ThinkProgressAnalysis';
import {dataset} from "./Data";


it('test progress over window', () => {

    let windowStart = new Date("2021-1-1");
    let windowEnd = new Date("2021-1-3");
    let window = [windowStart, windowEnd];
    let entries = dataset['Book One'];

    let analysis = new ThinkProgressAnalysis(entries, 1, "days");
    let expectedProgress = 30;
    let actualProgress = analysis.progressDuringWindow(entries, window);

    expect(actualProgress).toEqual(expectedProgress);
});


it('test last entry is returned or null', () => {
    let entries = dataset['Book One'];
    let analysis = new ThinkProgressAnalysis(entries, 1, "days");
    let entry = analysis.getLastEntry(entries);
    let expectedEntry = entries[entries.length-1];
    expect(entry).toEqual(expectedEntry);

    let actualEntryForEmpty = analysis.getLastEntry([]);
    let expectedEntryForEmpty = null;
    expect(actualEntryForEmpty).toEqual(expectedEntryForEmpty);

});