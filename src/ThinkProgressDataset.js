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

const dataset = {
    // Linear progression for 5 days
    "Book One": [
        {
            "Created": "2021-1-1",
            "Completed": 10,
            "Total": 100
        }, 
        {
            "Created": "2021-1-2",
            "Completed": 20,
            "Total": 100
        },
        {
            "Created": "2021-1-3",
            "Completed": 30,
            "Total": 100
        }, 
        {
            "Created": "2021-1-4",
            "Completed": 40,
            "Total": 100
        }, 
        {
            "Created": "2021-1-5",
            "Completed": 50,
            "Total": 100
        }
    ],
    // Linear progression for ten days
    "Book Two": [
      {
            "Created": "2021-1-1",
            "Completed": 10,
            "Total": 100
        }, 
        {
            "Created": "2021-1-2",
            "Completed": 20,
            "Total": 100
        },
        {
            "Created": "2021-1-3",
            "Completed": 30,
            "Total": 100
        }, 
        {
            "Created": "2021-1-4",
            "Completed": 40,
            "Total": 100
        }, 
        {
            "Created": "2021-1-5",
            "Completed": 50,
            "Total": 100
        },
        {
            "Created": "2021-1-6",
            "Completed": 60,
            "Total": 100
        }, 
        {
            "Created": "2021-1-7",
            "Completed": 70,
            "Total": 100
        },
        {
            "Created": "2021-1-8",
            "Completed": 80,
            "Total": 100
        }, 
        {
            "Created": "2021-1-9",
            "Completed": 90,
            "Total": 100
        }, 
        {
            "Created": "2021-1-10",
            "Completed": 100,
            "Total": 100
        }
    ],
    // Faster performance over time
    "Book Three": [
        {
            "Created": "2021-1-1",
            "Completed": 1,
            "Total": 100
        }, 
        {
            "Created": "2021-1-2",
            "Completed": 3,
            "Total": 100
        },
        {
            "Created": "2021-1-3",
            "Completed": 7,
            "Total": 100
        }, 
        {
            "Created": "2021-1-4",
            "Completed": 15,
            "Total": 100
        }, 
        {
            "Created": "2021-1-5",
            "Completed": 31,
            "Total": 100
        },
        {
            "Created": "2021-1-6",
            "Completed": 64,
            "Total": 100
        }, 
        {
            "Created": "2021-1-2",
            "Completed": 20,
            "Total": 100
        },
        {
            "Created": "2021-1-3",
            "Completed": 30,
            "Total": 100
        }, 
        {
            "Created": "2021-1-4",
            "Completed": 40,
            "Total": 100
        }, 
        {
            "Created": "2021-1-5",
            "Completed": 50,
            "Total": 100
        }
    ]
}

export {dataset, datesetCreatedParser, datasetCreatedTimeFormat};