import {ThinkProgressExtrapolation} from './ThinkProgressExtrapolation';

it('test reasonable progress interpolations of progress', () => {
    let start = 10;
    let end = 50;
    let delta = 10;
    let expectedProgression = [20, 30, 40, 50];
    let y = 1;
    let extrapolation = new ThinkProgressExtrapolation("Reasonable Progression", new Date(), start, end, delta);
    expect(extrapolation.needsProgressExtrapolation()).toEqual(true);
    expect(extrapolation.hasProgressionExtrapolation()).toEqual(true);
    expect(expectedProgression).toEqual(extrapolation.extrapolatedProgression()[y]);
});

it('test reasonable progress interpolations of timeline', () => {
    let start = 10;
    let end = 50;
    let delta = 10;
    let expectedProgression = [
        new Date(2021, 1, 2),
        new Date(2021, 1, 3),
        new Date(2021, 1, 4),
        new Date(2021, 1, 5),
    ];
    let x = 0;
    let extrapolation = new ThinkProgressExtrapolation("Reasonable Progression", new Date(2021, 1, 1), start, end, delta);

    expect(extrapolation.needsProgressExtrapolation()).toEqual(true);
    expect(extrapolation.hasProgressionExtrapolation()).toEqual(true);
    expect(expectedProgression).toEqual(extrapolation.extrapolatedProgression()[x]);
});


it('test unreasonable progress', () => {
    let extrapolation = new ThinkProgressExtrapolation("Unreasonable Progress", new Date(), 10,50,0);
    expect(extrapolation.hasProgressionExtrapolation()).toEqual(false);
    expect(extrapolation.needsProgressExtrapolation()).toEqual(true);
});

it('test not needing extrapolation cause finished', () => {
    let start = 50;
    let end = 50;
    let delta = 10;
    let extrapolation = new ThinkProgressExtrapolation("Finished Progression", new Date(), start, end, delta);
    expect(extrapolation.needsProgressExtrapolation()).toEqual(false);
    expect(extrapolation.hasProgressionExtrapolation()).toEqual(false);
});


// TODO: Create test which validates that progress extrapolation returns progress dataset.
it('test getData return type', () => {
    let start = 50;
    let end = 50;
    let delta = 10;
    let extrapolation = new ThinkProgressExtrapolation("Finished Progression", new Date(), start, end, delta);
    expect(true).toEqual(true);
});