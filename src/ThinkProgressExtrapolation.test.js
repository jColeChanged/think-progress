import {ThinkProgressExtrapolation} from './ThinkProgressExtrapolation';

it('test reasonable progress interpolations', () => {
    let start = 10;
    let end = 50;
    let delta = 10;
    let expectedProgression = [20, 30, 40, 50];
    let y = 1;
    let extrapolation = new ThinkProgressExtrapolation("Reasonable Progression", start, end, delta);
    expect(extrapolation.needsProgressExtrapolation()).toEqual(true);
    expect(extrapolation.hasProgressionExtrapolation()).toEqual(true);
    expect(expectedProgression).toEqual(extrapolation.extrapolatedProgression()[y]);
});

it('test unreasonable progress', () => {
    let extrapolation = new ThinkProgressExtrapolation("Unreasonable Progress", 10,50,0);
    expect(extrapolation.hasProgressionExtrapolation()).toEqual(false);
    expect(extrapolation.needsProgressExtrapolation()).toEqual(true);
});

it('test not needing extrapolation cause finished', () => {
    let start = 50;
    let end = 50;
    let delta = 10;
    let extrapolation = new ThinkProgressExtrapolation("Finished Progression", start, end, delta);
    expect(extrapolation.needsProgressExtrapolation()).toEqual(false);
    expect(extrapolation.hasProgressionExtrapolation()).toEqual(false);
});