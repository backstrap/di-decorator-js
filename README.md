# Javascript - Dependency Injection Decorator
Simple Dependency Injection Decorator for javascript

**Required:** [babel-plugin-transform-decorators-legacy](http://babeljs.io/docs/en/babel-plugin-transform-decorators) in your project...

**install** npm i -D di-decorator-js or yarn add di-decorator-js


**example**


```js
// file: my.provider.js

import { Injectable }  from 'di-decorator-js';

@Injectable({
    providers:[]
})
export class MyProvider {
    result() {
        return 'Eureka!';
    }
}
```



```js
// file my.component.js
import { Injectable }  from 'di-decorator-js';
import { MyProvider } from './my.provider'

@Injectable({
    providers:[ MyProvider ] // must be the same order as the class constructor
})
class MyComponent {
    constructor(provider) {
        this.myProvider = provider;
    }

    resolve() {
        console.log(this.myProvider.result()); // out: 'Eureka!'
    }
}
```