# Effortless Dependency Injection for Javascript

### Introduction
####
A dead-simple Dependency Injection container for javascript,
using Babel 7 decorators.
(Should also work on older versions of Babel.)

This package provides a very simple, performant decorator-based DI/IoC solution
for doing constructor injection.
You simply declare each of your service classes to be "injectable"
using the class decorator function `@injectable()`.
If the service has any dependencies, you list those service classes as arguments to `@injectable()`
in the same order as they appear in the constructor.
Then you can start up your application by using the `resolve()` function
to get an instance of your top-level service ("application") class
on which to make the initial method call.
A complete example is given below.

This package encourages adherence to good programming practices by...

  - Only exposing the `injectable()` and `resolve()` functions,
    so you're not tempted to mis-use the container for other things.
  - Requiring all injectable service classes be declared as such.
  - Using a declarative style through the use of class decorators.
  - Supporting a fully-realized Service / Entity (Injectable / Newable) application model
    where the services are stateless service providers which depend only on other services
    (through injection),
    and all state is held in entity objects created by the services as needed.

The codebase is fully covered by Jest unit tests, and
[documented with JSDoc](https://backstrap.github.io/effortless-di/module.exports.html).

This package started out as a fork of
[di-decorator-js](https://www.npmjs.com/package/di-decorator-js),
but it quickly morphed into a major re-write
to improve the API and streamline the codebase.
I kept the fundamental ideas, but overhauled the implementation.


### Philosophy

Why use effortless-di?  Well, if you're using one of the popular frameworks like Angular or React,
you don't need effortless-di - you'll just use the tools that come with your framework.
But if you're writing an application without one of those, using something like effortless-di
to help you organize your code architecture is a really good practice.
I use it for writing small CLI's and back-end service mesh components in NodeJs.
I design my code using a Service / Entity architecture based on the principles outlined
[in this post by Miško Hevery](http://misko.hevery.com/2008/09/30/to-new-or-not-to-new/)
and further elaborated in
[this Loose Couplings post](https://www.loosecouplings.com/2011/01/how-to-write-testable-code-overview.html).
Defining the dependency tree of Service Objects with effortless-di is quick, easy and painless.

While we're on the subject of architecture, I also encourage strongly incremental architecture -
design and develop incrementally, don't write any piece of code until you need it.
And I use a "test-centric" continuous integration development cycle with 100% unit test coverage.
Using effortless-di allows me to easily set up mocks in my test suites.

### Requirements

The Babel Decorators Plugin:
[@babel/plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)

(For older versions of Babel, babel-plugin-transform-decorators-legacy should work fine.)

### Preparation

If you don't already have it, you'll need to install the Babel decorators plugin: 

`npm install -D @babel/plugin-proposal-decorators`

...and add this to your .babelrc:
 
```
  { "plugins": ["@babel/plugin-proposal-decorators"] }
```

### Installation

`npm install effortless-di`

### Usage

```js
// file: MyService.js
import {injectable} from 'effortless-di';

@injectable()
export class MyService {
    result() {
        return 'Eureka!';
    }
}
```

```js
// file MyApplication.js
import {injectable}     from 'effortless-di';
import {MyService}      from './MyService';
import {MyOtherService} from './MyOtherService';

@injectable(MyService, MyOtherService)
class MyApplication {
    constructor(myService, myOtherService) {
        this.myService = myService;
        this.myOtherService = myOtherService;
    }
    run() {
        console.log(this.myService.result());
    }
}
```

```js
// file index.js
import {resolve}       from 'effortless-di';
import {MyApplication} from './MyApplication';

// prints 'Eureka!'
resolve(MyApplication).run();
```

### Alternate Example

If you prefer namespaced names, you can do it this way:
```js
// file: MyService.js
import {DI} from 'effortless-di';

@DI.injectable()
export class MyService {
    result() {
        return 'Eureka!';
    }
}
```

```js
// file MyApplication.js
import {DI}             from 'effortless-di';
import {MyService}      from './MyService';
import {MyOtherService} from './MyOtherService';

@DI.injectable(MyService, MyOtherService)
class MyApplication {
    constructor(myService, myOtherService) {
        this.myService = myService;
        this.myOtherService = myOtherService;
    }
    run() {
        console.log(this.myService.result());
    }
}
```

```js
// file index.js
import {DI}            from 'effortless-di';
import {MyApplication} from './MyApplication';

// prints 'Eureka!'
DI.resolve(MyApplication).run();
```
