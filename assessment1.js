const { EventEmitter } = require('events');

class SessionManager extends EventEmitter {
  constructor() {
    super();

    
    this.on('greet', (username) => {
      console.log(`Hello, ${username}! Welcome.`);
    });

    this.once('greet', () => {
      console.log('First login of the day!');
    });

    this.on('exit', (code) => {
      console.log(`Session closed with code ${code}. Goodbye!`);
    });


    this.on('error', (message) => {
      console.log(`Error: ${message}`);
    });
  }

  trigger(command, ...args) {
    if (command === 'greet' || command === 'exit') {
      this.emit(command, ...args);
    } else {
      console.log(`Unknown event: ${command}`);
    }
  }
}


const session = new SessionManager();

session.trigger('greet', 'divyanshu');
session.trigger('greet', 'Anuj');
session.trigger('greet', 'Ayush');


console.log(`Greet listener count: ${session.listenerCount('greet')}`);


session.trigger('exit', 0);

session.trigger('login');


session.emit('error', 'Something went wrong during the session.');
