'use strict';

class App {
    /**
     * @param {String} [greeting]
     */
    constructor(greeting='Alo') {
        this.el = document.querySelector('#app');
        this.greeting = greeting;
    }

    sayGreeting() {
        this.el.innerHTML = `${this.greeting}\, ${this.greeting}!`;
    }
}

export default App;
