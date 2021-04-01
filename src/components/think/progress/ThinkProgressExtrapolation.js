import * as d3 from "d3";
import {ThinkProgressDataset} from "./ThinkProgressDataset";


const EXTRAPOLATION_CASES = {
    "COMPLETED": 0,        // No extrapolation necessary.
    "UNREASONABLE": 1,     // Won't finish for a very long time if ever.
    "POSSIBILITY": 2       // Includes a reasonable extrapolation.
};


class ThinkProgressExtrapolation {

    // Calculates an interpolation starting from the amount that has
    // been completed and continuing until the total completion.
    // For sequences which will take longer than one thousands units
    // of progress no interpolation is returned.
    constructor(name, xStart, yStart, yEnd, delta) {
        this.name = name;
        this.total = yEnd;
        this.yStart = yStart;

        let progressNeeded = yEnd - yStart;
        if (progressNeeded <= 0) {
            this.case = EXTRAPOLATION_CASES.COMPLETED;
            return;
        }
        let deltaPercentage = delta / progressNeeded;
        if (deltaPercentage <= 0.001) {
            this.case = EXTRAPOLATION_CASES.UNREASONABLE;
            return;
        }

        this.case = EXTRAPOLATION_CASES.POSSIBILITY;
        let steps = [];
        for (let progress=yStart; progress < yEnd;) {
            progress = yEnd < progress + delta ? yEnd : progress + delta;
            steps.push(progress);
        }
        this.ySteps = steps;

        let xNext = d3.timeDay.offset(xStart, 1)
        this.xSteps = d3.timeDay.range(xNext, d3.timeDay.offset(xNext, steps.length), 1);
    }

    // Returns whether rendering an extrapolation is necessary.
    needsProgressExtrapolation() {
        return this.case !== EXTRAPOLATION_CASES.COMPLETED;
    }

    // Returns whether an array extrapolation is reasonable to return.
    // If there isn't and a progress extrapolation is necessary the UI
    // should indicate, not by redrawing the chart, but through some other
    // indication that won't distort the x dimension of the chart, that
    // it will be a long time before complete accomplishment.
    hasProgressionExtrapolation() {
        return this.case === EXTRAPOLATION_CASES.POSSIBILITY;
    }

    // Returns an array of extrapolated progress steps.
    extrapolatedProgression() {
        return [this.xSteps, this.ySteps];
    }

    // Returns extrapolated progress in ProgressData format.
    getData() {
        let [xSteps, ySteps] = this.extrapolatedProgression();
        let extrapolatedUpdates = [];
        extrapolatedUpdates.push({
            "Created": d3.timeDay.floor(new Date()),
            "Total": this.total,
            "Completed": this.yStart
        });
        for (let i=0; i<xSteps.length; i++) {
            extrapolatedUpdates.push({
                "Created": xSteps[i],
                "Total": this.total,
                "Completed": ySteps[i]
            });
        }


        let extrapolatedProgressDataset = new ThinkProgressDataset(
            this.name,
            this.total,
            extrapolatedUpdates
        );
        extrapolatedProgressDataset.extrapolated = true;
        return extrapolatedProgressDataset;
    }
}


export {ThinkProgressExtrapolation};