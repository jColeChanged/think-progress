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

it('test completion fetch', () => {
    let entries = dataset['Book One'];
    let analysis = new ThinkProgressAnalysis(entries, 1, "days");
    let actualCompleted = analysis.getCompleted(analysis.getLastEntry(entries));
    let expectedCompleted = entries[entries.length-1].Completed;
    expect(actualCompleted).toEqual(expectedCompleted);

    let actualCompletedForEmpty = analysis.getCompleted(analysis.getLastEntry([]));
    expect(actualCompletedForEmpty).toEqual(0);

});

it('test total fetch', () => {
    let entries = dataset['Book One'];
    let analysis = new ThinkProgressAnalysis(entries, 1, "days");
    let actualTotal = analysis.getTotal(analysis.getLastEntry(entries));
    let expectedTotal = entries[entries.length-1].Total;
    expect(actualTotal).toEqual(expectedTotal);

    let actualTotalForEmpty = analysis.getTotal(analysis.getLastEntry([]));
    expect(actualTotalForEmpty).toEqual(0);

});

it('test date fetch', () => {
    let entries = dataset['Book One'];
    let analysis = new ThinkProgressAnalysis(entries, 1, "days");
    let parsedDate = analysis.getLastUpdated(analysis.getLastEntry(entries));
    expect(parsedDate).not.toBe(null);

    let parsedDateForEmpty = analysis.getLastEntry([]);
    expect(parsedDateForEmpty).toEqual(null);
});