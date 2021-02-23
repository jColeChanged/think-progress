import * as d3 from "d3";

const dateFormat = "%Y-%m-%d";
const datasetCreatedTimeFormat = d3.timeFormat(dateFormat);
const datesetCreatedParser = d3.timeParse(dateFormat);

class ProgressDataset {

    constructor(name, total, entries) {
        this.name = name;
        this.total = total;
        this.entries = entries;
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
];



let dataset = {};
let bookOneProgressDataset = new ProgressDataset(
    bookOneName,
    bookOneTotal,
    bookOneEntries
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
];
dataset[bookTwoName] = bookTwoEntries // Linear progression for ten days
let bookTwoProgressDataset = new ProgressDataset(
    bookTwoName,
    bookTwoTotal,
    bookTwoEntries
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
];
dataset[bookThreeName] = bookThreeEntries;
let bookThreeProgressDataset = new ProgressDataset(
    bookThreeName,
    bookThreeTotal,
    bookThreeEntries
);

export {dataset, datesetCreatedParser, datasetCreatedTimeFormat};