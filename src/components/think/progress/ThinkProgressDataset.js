import * as d3 from "d3";

const dateFormat = "%Y-%m-%d";
const datasetCreatedTimeFormat = d3.timeFormat(dateFormat);
const datesetCreatedParser = d3.timeParse(dateFormat);

function convertDateStringToDate(entry) {
    entry.Created = datesetCreatedParser(entry.Created);
    return entry;
}

class ThinkProgressDataset {

    constructor(name, total, entries, id) {
        this.name = name;
        this.total = total;
        this.entries = entries;
        this.id = id;

        if (this.entries && this.entries.length) {
            let lastEntry = this.entries[this.entries.length-1];
            let currentDate = new Date();
            if (datesetCreatedParser(datasetCreatedTimeFormat(currentDate)) > lastEntry.Created) {
                this.entries.push({
                    "Created": datesetCreatedParser(datasetCreatedTimeFormat(currentDate)),
                    "Total": lastEntry.Total,
                    "Completed": lastEntry.Completed
                });
            }
        }
        this.extrapolated = false;
    }

    isEmpty() {
        return this.entries.length === 0;
    }
}

const bookOneName = "Book One";
const bookOneTotal = 100;
const bookOneEntries = [
    {
        "Created": "2021-1-1",
        "Completed": 10,
        "Total": bookOneTotal
    },
    {
        "Created": "2021-1-2",
        "Completed": 20,
        "Total": bookOneTotal
    },
    {
        "Created": "2021-1-3",
        "Completed": 30,
        "Total": bookOneTotal
    },
    {
        "Created": "2021-1-4",
        "Completed": 40,
        "Total": bookOneTotal
    },
    {
        "Created": "2021-1-5",
        "Completed": 50,
        "Total": bookOneTotal
    }
].map(convertDateStringToDate);



let dataset = {};
let bookOneProgressDataset = new ThinkProgressDataset(
    bookOneName,
    bookOneTotal,
    bookOneEntries,
    1
);
dataset[bookOneName] = bookOneEntries; // Linear progression for 5 days

const bookTwoName = "Book Two";
const bookTwoTotal = 100;
const bookTwoEntries = [
    {
        "Created": "2021-1-1",
        "Completed": 10,
        "Total": bookTwoTotal
    },
    {
        "Created": "2021-1-2",
        "Completed": 20,
        "Total": bookTwoTotal
    },
    {
        "Created": "2021-1-3",
        "Completed": 30,
        "Total": bookTwoTotal
    },
    {
        "Created": "2021-1-4",
        "Completed": 40,
        "Total": bookTwoTotal
    },
    {
        "Created": "2021-1-5",
        "Completed": 50,
        "Total": bookTwoTotal
    },
    {
        "Created": "2021-1-6",
        "Completed": 60,
        "Total": bookTwoTotal
    },
    {
        "Created": "2021-1-7",
        "Completed": 70,
        "Total": bookTwoTotal
    },
    {
        "Created": "2021-1-8",
        "Completed": 80,
        "Total": bookTwoTotal
    },
    {
        "Created": "2021-1-9",
        "Completed": 90,
        "Total": bookTwoTotal
    },
    {
        "Created": "2021-1-10",
        "Completed": 100,
        "Total": bookTwoTotal
    }
].map(convertDateStringToDate);
dataset[bookTwoName] = bookTwoEntries // Linear progression for ten days
let bookTwoProgressDataset = new ThinkProgressDataset(
    bookTwoName,
    bookTwoTotal,
    bookTwoEntries,
    2
);

const bookThreeName = "Book Three";
const bookThreeTotal = 100;
const bookThreeEntries = [
    {
        "Created": "2021-1-1",
        "Completed": 1,
        "Total": bookThreeTotal
    },
    {
        "Created": "2021-1-2",
        "Completed": 3,
        "Total": bookThreeTotal
    },
    {
        "Created": "2021-1-3",
        "Completed": 7,
        "Total": bookThreeTotal
    },
    {
        "Created": "2021-1-4",
        "Completed": 15,
        "Total": bookThreeTotal
    },
    {
        "Created": "2021-1-5",
        "Completed": 31,
        "Total": bookThreeTotal
    },
    {
        "Created": "2021-1-6",
        "Completed": 64,
        "Total": bookThreeTotal
    },
].map(convertDateStringToDate);
dataset[bookThreeName] = bookThreeEntries;
let bookThreeProgressDataset = new ThinkProgressDataset(
    bookThreeName,
    bookThreeTotal,
    bookThreeEntries,
    3
);

const bookFourEntries = [];
const bookFourName = "Empty dataset";
dataset[bookFourName] = bookFourEntries;
let bookFourProgressDataaset = new ThinkProgressDataset(
    bookFourName,
    0,
    [],
    4
);

export {
    bookFourProgressDataaset,
    bookOneProgressDataset,
    bookTwoProgressDataset,
    bookThreeProgressDataset,
    dataset,
    datesetCreatedParser,
    datasetCreatedTimeFormat,
    ThinkProgressDataset
};