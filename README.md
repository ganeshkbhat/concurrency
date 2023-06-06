# concurrency.js

npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files


# Installation


```
npm install concurrency.js --save
```

Find the demos in the [demos folder](./demos)


## CONCURRENCY METHODS

`concurrency._concurrencyClusters(filename = __filename, num = cpus().length, options = {}, greet = false)` [deprecated in v0.0.5 in favour of clusters]

`concurrency.clusters(filename = __filename, num = cpus().length, options = {}, greet = false)`

`concurrency._concurrencyProcesses(filename = __filename, options = {}, greet = false)` [deprecated in v0.0.5 in favour of processes]

`concurrency.processes(filename = __filename, options = {}, greet = false)`

`concurrency._concurrencyThreads(filename = __filename, options = {}, greet = false)` [deprecated in v0.0.5 in favour of threads]

`concurrency.threads(filename = __filename, options = {}, greet = false)`

`concurrency._concurrencyThreadsAsync(command, options, nodeCmd = true)` [deprecated in v0.0.5 in favour of threadsAsync]

`concurrency.threadsAsync(command, options, nodeCmd = true)`



`loadbalancer.loadbalancer(serverOptions)`

`loadbalancer.processing(serverOptions)`

`loadbalancer.processingMultiple(serverOptions)`

`loadbalancer.clustering(serverOptions)`

`loadbalancer.threading(serverOptions)`

`loadbalancer.threadingMultiple(serverOptions)`


## Cluster and Process Methods

![Process Execution Functions](./docs/Concurrency.js.Process.jpg)

## Cluster Methods


`._concurrencyClusters(filename = __filename, num = cpus().length, options = {}, greet = false)`

<br/>

Create a cluster of nodejs processes using a filename to fork



```

const path = require("path");
let { clusters } = require("concurrency.js");

function concurrency() {
    return new Promise(function (resolve, reject) {
        clusters(path.join("node_module\\concurrency.js\\src\\worker.cluster.js"), 8, {
                data: {
                    data: "Testing parent data",
                    url: "https://www.google.com"
                },
                childData: "Test data from child"
            }
        )
        .then((d) => {
            console.log("Data fetched", JSON.stringify(d));
            resolve(d);
        })
        .catch((e) => {
            console.log(e.toString());
            reject(e);
        });
    });
}
concurrency();

```

```
_concurrencyClusters(path.join("node_module\\concurrency.js\\src\\worker.cluster.js"), 8, {...}, false)
```


```
// Any data type you wish to handle

options.data = {}

// All event handlers.
// The name of the key will be the exact event name in lowercase
// [TODO] consider parent child event handler names.
// Consider name all child thread, process, cluster process to be named as <childEVENT>.
// Example: childClose, childMessage

options.handlers = {
    message: () => {},
    error: () => {},
    exit: () => {},
    close: () => {}
}
```


## Process Methods


`._concurrencyProcesses(filename = __filename, options = {}, greet = false)`


```

const path = require("path");
let { processes } = require("concurrency.js");
processes(path.join("node_module\\concurrency.js\\src\\worker.process.js"), {
        data: {
            message: "Testing data",
            url: "https://www.google.com"
        }
    }, true)
    .then((d) => { console.log("Data fetched: ", JSON.stringify(d)); })
    .catch((e) => { console.log(e.toString()); setTimeout(() => { process.exit(e); }, 5000) })

```

```
_concurrencyProcesses(path.join("node_module\\concurrency.js\\src\\worker.process.js"), 8, {...}, false)
```

```
// Any data type you wish to handle

options.data = {}

// All event handlers.
// The name of the key will be the exact event name in lowercase
// [TODO] consider parent child event handler names.
// Consider name all child thread, process, cluster process to be named as <childEVENT>.
// Example: childClose, childMessage

options.handlers = {
    message: () => {},
    error: () => {},
    close: () => {},
    childExit: () => {}
}
```


## Threading and Multi-Threading Methods


![Threads Execution Functions](./docs/Concurrency.js.Threads.jpg)


## Threads Methods


`._concurrencyThreads(filename = __filename, options = {}, greet = false)`



```

const path = require("path");
let { threads } = require("concurrency.js");
threads(__filename, {
        data: {
            url: "https://www.google.com",
            data: "Testing data"
        },
        childData: "Testing child data"
    }, true)
    .then((d) => console.log(JSON.stringify(d)));

```

```
_concurrencyThreads(path.join(__filename), 8, {...}, false)
```

```
// Any data type you wish to handle

options.data = {}

// All event handlers.
// The name of the key will be the exact event name in lowercase
// [TODO] consider parent child event handler names.
// Consider name all child thread, process, cluster process to be named as <childEVENT>.
// Example: childClose, childMessage

options.handlers = {
    message: () => {},
    error: () => {},
    exit: () => {},
    close: () => {},
    childExit: () => {} // exception for child process exit event naming
}
```

## Thread Async Methods


`._concurrencyThreadsAsync(command, options, nodeCmd = true)`



```

const path = require("path");
let {  } = require("concurrency.js");

let threads = threadsAsync("node_module\\concurrency.js\\src\\demos\\demos.threads.js", {
        data: {
            data: "Testing parent data",
            url: "https://www.google.com"
        },
        childData: "Test data from child"
    }
);

```

```
_concurrencyThreadsAsync("node_module\\concurrency.js\\src\\demos\\demos.threads.js", {...}, true)
```

## Loadbalancer Methods (Multi - Threading or Multi - Processing Methods)


`.threading`, `threadingMultiple`, `.threadPool`, `.processing`, `.processingMultiple`, `.clustering`

<br/>

## Loadbalancer Threading Methods


`.threading` Create loadbalancer threads.


```
'use strict';

var threading = require("loadbalancerjs").threading;
var httpSocketServer = require("loadbalancerjs").sockets.httpSocketServer;
var server = require("./express-app");

threading({
    "server": server,
    "protocol": "http",
    "createCerts": true,
    "host": "localhost",
    "proxy": {
        "proxy": true,
        "protocol": "http",
        "host": "localhost",
        "port": 7000,
        "proxyHost": "",
        "proxyPort": 9000
    },
    "certs": {
        "key": "./certs/ssl.key",
        "cert": "./certs/ssl.cert"
    },
    "port": 8000,
    "ws": true,
    "processes": 5,
    "threads": 10,
    "mainProcessCallback": () => { },
    "forkCallback": (opts, pr) => {
        // console.log(opts, pr);
        // console.log(opts);
        httpSocketServer(opts);
    },
    "callbacks": {
        "wsOnData": null,
        "wsOnEnd": null,
        "wsUpgrade": null,
        "server": null,
        "listen": null
    }
})

```


## Loadbalancer Multi Threading Methods


`.threadingMultiple` Create loadbalancer threads multiple.


```
'use strict';

var threadingMultiple = require("loadbalancerjs").threadingMultiple;
var httpSocketServer = require("loadbalancerjs").sockets.httpSocketServer;
var server = require("./express-app");

threadingMultiple({
    "server": server,
    "protocol": "http",
    "createCerts": true,
    "host": "localhost",
    "proxy": {
        "proxy": true,
        "protocol": "http",
        "host": "localhost",
        "port": 7000,
        "proxyHost": "",
        "proxyPort": 9000
    },
    "certs": {
        "key": "./certs/ssl.key",
        "cert": "./certs/ssl.cert"
    },
    "port": 8000,
    "ws": true,
    "processes": 5,
    "threads": 10,
    "mainProcessCallback": () => { },
    "forkCallback": (opts, pr) => {
        // console.log(opts, pr);
        // console.log(opts);
        httpSocketServer(opts);
    },
    "callbacks": {
        "wsOnData": null,
        "wsOnEnd": null,
        "wsUpgrade": null,
        "server": null,
        "listen": null
    }
})

```


## Loadbalancer Processing Methods


`.processing` Create loadbalancer processing. 


```
'use strict';

var processing = require("loadbalancerjs").processing;
var httpSocketServer = require("loadbalancerjs").sockets.httpSocketServer;
var server = require("./express-app");

processing({
    "server": server,
    "protocol": "http",
    "createCerts": true,
    "host": "localhost",
    "proxy": {
        "proxy": true,
        "protocol": "http",
        "host": "localhost",
        "port": 7000,
        "proxyHost": "",
        "proxyPort": 9000
    },
    "certs": {
        "key": "./certs/ssl.key",
        "cert": "./certs/ssl.cert"
    },
    "port": 8000,
    "ws": true,
    "processes": 5,
    "threads": 10,
    "mainProcessCallback": () => { },
    "forkCallback": (opts, pr) => {
        // console.log(opts, pr);
        // console.log(opts);
        httpSocketServer(opts);
    },
    "callbacks": {
        "wsOnData": null,
        "wsOnEnd": null,
        "wsUpgrade": null,
        "server": null,
        "listen": null
    }
})

```


## Loadbalancer Multi Processing Methods


`.processingMultiple` Create loadbalancer multi processing.


```
'use strict';

var processingMultiple = require("loadbalancerjs").processingMultiple;
var httpSocketServer = require("loadbalancerjs").sockets.httpSocketServer;
var server = require("./express-app");

processingMultiple({
    "server": server,
    "protocol": "http",
    "createCerts": true,
    "host": "localhost",
    "proxy": {
        "proxy": true,
        "protocol": "http",
        "host": "localhost",
        "port": 7000,
        "proxyHost": "",
        "proxyPort": 9000
    },
    "certs": {
        "key": "./certs/ssl.key",
        "cert": "./certs/ssl.cert"
    },
    "port": 8000,
    "ws": true,
    "processes": 5,
    "threads": 10,
    "mainProcessCallback": () => { },
    "forkCallback": (opts, pr) => {
        // console.log(opts, pr);
        // console.log(opts);
        httpSocketServer(opts);
    },
    "callbacks": {
        "wsOnData": null,
        "wsOnEnd": null,
        "wsUpgrade": null,
        "server": null,
        "listen": null
    }
})

```


## Contributions

Contributions, Feature Improvements, Bugs, and Issues are invited. [raising an issue](https://github.com/ganeshkbhat/concurrency.js/issues)

## TODO

[Todo](./todo)

# License

[MIT License](./LICENSE)
