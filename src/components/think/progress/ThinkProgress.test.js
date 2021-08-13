import {daysSinceStart} from "./ThinkProgress";
import { ThinkProgressDataset } from "./ThinkProgressDataset";

it('test days since length calculation accuracy', () => {
    let twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate()-2);

    let entries = {
        "entries": [{"Created": twoDaysAgo}]
    };
    let dataset = ThinkProgressDataset(
        "Test Dataset",
        100,
        entries,
        1
    );

    expect(daysSinceStart(entries)).toEqual(2);
});