const { EventEmitter } = require('events');

class Element extends EventEmitter {
  constructor(name, parent = null) {
    super();
    this.name = name;
    this.parent = parent;
  }

  addEventListener(type, handler) {
    this.on(type, handler);
  }

  removeEventListener(type, handler) {
    this.off(type, handler);
  }

  dispatchEvent(type, data = {}) {
   
    const target = this;

  
    const event = {
      type,
      target,
      currentTarget: null,
      data,
      propagationStopped: false,

      stopPropagation() {
        this.propagationStopped = true;
      }
    };

   
    let current = this;

    while (current) {
      event.currentTarget = current;

      
      current.emit(type, event);

      
      if (event.propagationStopped) {
        break;
      }

      current = current.parent;
    }
  }
}


const documentElement = new Element('document');
const form = new Element('form', documentElement);
const button = new Element('button', form);


const documentClickHandler = (event) => {
  console.log(
    `document: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
  );
};

const formClickHandler = (event) => {
  console.log(
    `form: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
  );
};

const buttonClickHandler = (event) => {
  console.log(
    `button: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
  );
};

documentElement.addEventListener('click', documentClickHandler);
form.addEventListener('click', formClickHandler);
button.addEventListener('click', buttonClickHandler);

 

console.log('\n--- Scenario A ---');
button.dispatchEvent('click', { message: 'Button clicked' });

// --------------------------------------------------
// Scenario B: stop propagation at form
// --------------------------------------------------

console.log('\n--- Scenario B ---');

form.removeEventListener('click', formClickHandler);

const stoppingFormHandler = (event) => {
  console.log(
    `form: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
  );

  console.log('form: stopPropagation() called');
  event.stopPropagation();
};

form.addEventListener('click', stoppingFormHandler);

button.dispatchEvent('click', { message: 'Button clicked again' });


console.log('\n--- Scenario C ---');

button.removeEventListener('click', buttonClickHandler);

button.dispatchEvent('click', { message: 'Button clicked after removal' });


console.log('\n--- Keypress Event ---');

form.addEventListener('keypress', (event) => {
  console.log(
    `form keypress: target=${event.target.name}, currentTarget=${event.currentTarget.name}, key=${event.data.key}`
  );
});

form.dispatchEvent('keypress', { key: 'Enter' });
