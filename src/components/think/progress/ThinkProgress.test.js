import {daysSinceStart} from "./ThinkProgress";

it('test days since length calculation accuracy', () => {
    let twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate()-2);

    let entries = {
        "entries": [{"Created": twoDaysAgo}]
    };

    expect(daysSinceStart(entries)).toEqual(2);
});