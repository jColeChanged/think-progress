import {datesetCreatedParser} from "./Data";

class ThinkProgressAnalysis {

    constructor(entries, windowLength, windowUnits) {
        const window = this.makeWindow(windowLength, windowUnits);
        const recentProgress = this.progressDuringWindow(entries, window);

        this.name = windowLength;
        this.progressDelta = recentProgress;
        this.endDate = entries[entries.length-1].Date;

        let latest = this.getLastEntry(entries);
        this.completed = this.getCompleted(latest);
        this.total = this.getTotal(latest);
        this.endDate = this.getLastUpdated(latest);
    }

    getLastEntry(entries) {
        return (entries.length !== 0) ? entries[entries.length - 1] : null;

    }

    // Returns the amount completed. If no entry provided, defaults to 0.
    getCompleted(entry) {
        return entry ? entry.Completed : 0;
    }

    // Returns the amount needed to complete all. If not entry provided, defaults to 0.
    getTotal(entry) {
        return entry ? entry.Total : 0;
    }

    // Returns the date that the last update was given. if no updates exists, defaults to null.
    getLastUpdated(entry) {
        return entry ? datesetCreatedParser(entry.Created) : null;

    }

    // Returns [windowStart, windowEnd] given a windowLength.
    makeWindow(windowLength, windowUnits) {
        windowUnits = "days";
        if (windowUnits === "days") {
            let currentDate = new Date();
            let nDaysAgo = new Date();
            nDaysAgo.setDate(currentDate.getDate() - windowLength);
            return [nDaysAgo, currentDate];
        }
    }

    // A function which calculates the percentage of work which has been completed
    // from the start of a window until the end of the window. The progress prior to the
    // start of a window is the progress just before the window is reached.
    progressDuringWindow(entries, window) {
        // No progress over a window if the window is empty.
        if (entries.length === 0) {
            return 0;
        }

        let [windowStartDate, windowEndDate] = window;

        let isInWindow = ((entry) => {
            let date = datesetCreatedParser(entry.Created);
            return windowStartDate <= date && date <= windowEndDate;
        });

        let windowStartIndex = -1;
        for (let i = 0; i < entries.length; i++) {
            if (isInWindow(entries[i])) {
                windowStartIndex = i;
                break;
            }
        }

        // There is no data in the window so no progress was made.
        if (windowStartIndex === -1) {
            return 0;
        }

        let windowEndIndex = entries.length - 1;
        for (let i = windowStartIndex; i < entries.length; i++) {
            if (!isInWindow(entries[i])) {
                windowEndIndex = i - 1;
                break;
            }
        }

        // At this point windowsEnd is the last entry in the window,
        // window start is the first, and window start minus one is
        // the entry proceeding the window. Progress is therefore
        // window end entry progress minus the entry just before
        // window start.
        let initialRowIndex = windowStartIndex - 1;
        let initiallyCompleted = initialRowIndex === -1 ? 0 : entries[initialRowIndex].Completed;
        let finalCompleted = entries[windowEndIndex].Completed;
        return finalCompleted - initiallyCompleted;
    }
}

export {ThinkProgressAnalysis};