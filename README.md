# Effortless Dependency Injection for Javascript

### ***-- New! --***

### Now with Constructor-less Dependency Injection!

Now you can declare your service classes as "@autoinjectable()"
and skip defining the constructors!
An @autoinjectable service automatically gets a constructor which
assumes that any passed constructor args are (injectable) objects,
and attaches them all as properties of the object being created.


### Introduction

Effortless-DI is a dead-simple Dependency Injection container for javascript,
using Babel 7 decorators.
(It should also work on older versions of Babel with the legacy decorator plugin,
if that's what you're using.)

This package provides a very clean, efficient, decorator-based DI/IoC solution
for doing constructor injection.
You simply declare each of your service classes to be "injectable"
using one of the class decorator functions `@injectable()` or  `@autoinjectable()`.
If the service has any dependencies, you list those service classes
as arguments to the decorator
(in the same order as they would appear in the constructor.)
Then you can run your application by using the `resolve()` function
to get an instance of your top-level service ("application") class
on which to make the initial method call.
A complete example is given [below](#Usage).

An `@autoinjectable` service automatically gets a constructor which
assumes that any passed constructor args are (injectable) objects,
and attaches them all as properties of the object being created.
Each property is automatically named based on the classname of the object being attached.
(The property name is the camel-case version of the classname -
so an instance of MyClass will be named this.myClass,
and an instance of ABCClass will be named this.abcClass.)
This gives you a standard naming convention for accessing the injected services,
and a cleaner implementation,
since you don't have to write a boilerplate constructor to handle them.
If you don't want this behavior,
then simply declare your class as usual, using the `@injectable()` decorator.
You can include a constructor definition for an `@autoinjectable` class
if you have other initialization to do,
and it will get run as well.
(It gets run after any superclass constructors,
but *before* the `@autoinjectable` constructor for this class,
so don't expect all your injector properties to be set yet.)

This package encourages adherence to good programming practices by...

  - Only exposing the `injectable()`, `autoinjectable()` and `resolve()` functions,
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
import {autoinjectable} from 'effortless-di';
import {MyService}      from './MyService';
import {MyOtherService} from './MyOtherService';

@autoinjectable(MyService, MyOtherService)
class MyApplication {
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

### Alternate Example - Using The DI Namespace

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

@DI.autoinjectable(MyService, MyOtherService)
class MyApplication {
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

### Alternate Example - Explicit Constructor

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
