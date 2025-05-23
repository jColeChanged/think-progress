import {ThinkProgressAnalysis} from './ThinkProgressAnalysis';
import {bookOneProgressDataset} from "./ThinkProgressDataset";


it('test progress over window', () => {

    let windowStart = new Date("2021-1-1");
    let windowEnd = new Date("2021-1-3");
    let window = [windowStart, windowEnd];
    let entries = bookOneProgressDataset.entries;

    let analysis = new ThinkProgressAnalysis(entries, 1, "days");
    let expectedProgress = 30;
    let actualProgress = analysis.progressDuringWindow(entries, window);

    expect(actualProgress).toEqual(expectedProgress);
});


it('test last entry is returned or null', () => {
    let entries = bookOneProgressDataset.entries;
    let analysis = new ThinkProgressAnalysis(entries, 1, "days");
    let entry = analysis.getLastEntry(entries);
    let expectedEntry = entries[entries.length-1];
    expect(entry).toEqual(expectedEntry);

    let actualEntryForEmpty = analysis.getLastEntry([]);
    let expectedEntryForEmpty = null;
    expect(actualEntryForEmpty).toEqual(expectedEntryForEmpty);
});

it('test completion fetch', () => {
    let entries = bookOneProgressDataset.entries;
    let analysis = new ThinkProgressAnalysis(entries, 1, "days");
    let actualCompleted = analysis.getCompleted(analysis.getLastEntry(entries));
    let expectedCompleted = entries[entries.length-1].Completed;
    expect(actualCompleted).toEqual(expectedCompleted);

    let actualCompletedForEmpty = analysis.getCompleted(analysis.getLastEntry([]));
    expect(actualCompletedForEmpty).toEqual(0);

});

it('test total fetch', () => {
    let entries = bookOneProgressDataset.entries;
    let analysis = new ThinkProgressAnalysis(entries, 1, "days");
    let actualTotal = analysis.getTotal(analysis.getLastEntry(entries));
    let expectedTotal = entries[entries.length-1].Total;
    expect(actualTotal).toEqual(expectedTotal);

    let actualTotalForEmpty = analysis.getTotal(analysis.getLastEntry([]));
    expect(actualTotalForEmpty).toEqual(0);

});

it('test date fetch', () => {
    let entries = bookOneProgressDataset.entries;
    let analysis = new ThinkProgressAnalysis(entries, 1, "days");
    let parsedDate = analysis.getLastUpdated(analysis.getLastEntry(entries));
    expect(parsedDate).not.toBe(null);

    let parsedDateForEmpty = analysis.getLastEntry([]);
    expect(parsedDateForEmpty).toEqual(null);
});

it('test date fetch', () => {
    let entries = bookOneProgressDataset.entries;
    let analysis = new ThinkProgressAnalysis(entries, 1, "days");
    let actualName = analysis.getName(10);
    expect(actualName).toBe("last 10 days");
});

it('makeWindow honors day units', () => {
    let analysis = new ThinkProgressAnalysis([], 1, "days");
    let [start, end] = analysis.makeWindow(3, "days");
    let diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
    expect(diff).toBe(3);
});

it('makeWindow honors week units', () => {
    let analysis = new ThinkProgressAnalysis([], 1, "days");
    let [start, end] = analysis.makeWindow(2, "weeks");
    let diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
    expect(diff).toBe(14);
});

it('makeWindow honors month units', () => {
    let analysis = new ThinkProgressAnalysis([], 1, "days");
    let [start, end] = analysis.makeWindow(1, "months");
    // approximate month length 30 days as used in implementation
    let diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
    expect(diff).toBe(30);
});

it('makeWindow honors year units', () => {
    let analysis = new ThinkProgressAnalysis([], 1, "days");
    let [start, end] = analysis.makeWindow(1, "years");
    let diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
    expect(diff).toBe(365);
});