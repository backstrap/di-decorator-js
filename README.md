# Easy Javascript Dependency Injection
A dead-simple Dependency Injection container for javascript,
using Babel 7 decorators.
(Should also work on older versions of Babel.)

This package provides a very simple, performant decorator-based DI/IoC solution.
You simply declare each of your service classes to be injectable
using the decorator function `@injectable()`.
If the service has any dependencies, you list those service classes as arguments to `@injectable()`,
in the same order that they appear in the constructor.
Then you can start up your application by using the `resolve` function
to get an instance of your top-level service ("application") class
on which to make the initial method call.

This package started out as a fork of
[di-decorator-js](https://www.npmjs.com/package/di-decorator-js),
but it quickly morphed into a major re-write
to improve the API and streamline the codebase.
I kept his fundamental ideas, but overhauled the implementation.

This package encourages adherence to good programming practices by...

  - only exposing the `injectable` and `resolve` functions,
    so you're not tempted to mis-use the container for other things.
  - requiring all injectable service classes be declared as such.
  - supporting a fully-realized Service + Entity application model
    where the services are stateless service providers which depend only on other services,
    and all state is held in entity objects created by the services as needed.

The codebase is fully covered by Jest unit tests, and
[documented with JSDoc](https://backstrap.github.io/di-decorator-js/module.exports.html).


**Required:**
[@babel/plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)
(for older versions of Babel, babel-plugin-transform-decorators-legacy)
in your project.

**Setup:**
Install the Babel decorators plugin: `npm install -D @babel/plugin-proposal-decorators`
and add `{ "plugins": ["@babel/plugin-proposal-decorators"] }` to your .babelrc.

**Install:**
`npm install -D di-decorator-js`

**Example**
```js
// file: MyService.js
import {injectable} from 'di-decorator-js';

@injectable()
export class MyService {
    result() {
        return 'Eureka!';
    }
}
```

```js
// file MyApplication.js
import {injectable} from 'di-decorator-js';
import {MyService}  from './MyService';

// Services must be listed in the same order as the class constructor.
@injectable(MyService)
class MyApplication {
    constructor(myService) {
        this.myService = myService;
    }
    run() {
        console.log(this.myService.result());
    }
}
```

```js
// file index.js
import {resolve}       from 'di-decorator-js';
import {MyApplication} from './MyApplication';

// prints 'Eureka!'
resolve(MyApplication).run();
```

**If you prefer namespaced names, you can also do it this way:**
```js
// file: MyService.js
import IoC from 'di-decorator-js';

@IoC.injectable()
export class MyService { ... }
```

```js
// file index.js
import IoC             from 'di-decorator-js';
import {MyApplication} from './MyApplication';

// prints 'Eureka!'
IoC.resolve(MyApplication).run();
```
