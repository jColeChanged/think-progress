

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
    constructor(name, start, end, delta) {
        this.name = name;

        let progressNeeded = end - start;
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
        for (let progress=start; progress < end;) {
            progress = end < progress + delta ? end : progress + delta;
            steps.push(progress);
        }
        this.steps = steps;
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
        return this.steps;
    }
}


export {ThinkProgressExtrapolation};