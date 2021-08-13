import {daysSinceStart} from "./ThinkProgress";
import { ThinkProgressDataset } from "./ThinkProgressDataset";

it('test days since length calculation accuracy', () => {
    let twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate()-2);

    let entries = [{"Created": twoDaysAgo}];
    let dataset = new ThinkProgressDataset(
        "Test Dataset",
        100,
        entries,
        1
    );

    expect(daysSinceStart(dataset)).toEqual(2);
});