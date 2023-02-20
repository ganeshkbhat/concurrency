# concurrency.js

npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files

Find the demos in the [demos folder](./demos)


#### Cluster Methods


`_concurrencyClusters(filename = __filename, num = cpus().length, options = {}, greet = false)`

```

const path = require("path");
let { _concurrencyClusters } = require("concurrency.js");

function concurrency() {
    return new Promise(function (resolve, reject) {
        _concurrencyClusters(
            path.join("C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.cluster.js"),
            8,
            {
                data: {
                    data: "Testing parent data",
                    url: "https://www.google.com"
                },
                childData: "Test data from child"
            }
        ).then((d) => {
            console.log("Data fetched", JSON.stringify(d));
            resolve(d);
        }).catch((e) => {
            console.log(e.toString());
            reject(e);
        });
    });
}
concurrency();

```


#### Process Methods


`_concurrencyProcesses(filename = __filename, options = {}, greet = false)`

```

const path = require("path");
let { _concurrencyProcesses } = require("concurrency.js");
_concurrencyProcesses(
    path.join(
    "C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\src\\worker.process.js"),
    {
        data: {
            message: "Testing data",
            url: "https://www.google.com"
        }
    },
    true
    ).then((d) => { console.log("Data fetched: ", JSON.stringify(d)); })
    .catch((e) => { console.log(e.toString()); setTimeout(() => { process.exit(e); }, 5000) })

```


#### Threads Methods


`_concurrencyThreads(filename = __filename, options = {}, greet = false)`

```

const path = require("path");
let { _concurrencyThreads } = require("concurrency.js");
_concurrencyThreads(
    __filename,
    {
        data: {
            url: "https://www.google.com",
            data: "Testing data"
        },
        childData: "Testing child data"
    },
    true
).then((d) => console.log(JSON.stringify(d)));

```


#### Thread Async Methods


`_concurrencyThreadsAsync(command, options)`


```

const path = require("path");
let { _concurrencyThreadsAsync } = require("concurrency.js");

let threads = _concurrencyThreadsAsync(
    "C:\\Users\\GB\\Documents\\projects\\requireurl\\concurrency\\demos\\demos.threads.js",
    {
        data: {
            data: "Testing parent data",
            url: "https://www.google.com"
        },
        childData: "Test data from child"
    }
);

```


### Contributions

Contributions, Feature Improvements, Bugs, and Issues are invited. [raising an issue](https://github.com/ganeshkbhat/concurrency.js/issues)


### TODO

[TODO](./todo)


# License

[MIT License](./LICENSE)

