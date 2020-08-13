const tmi = require('tmi.js');
const Decklist = require('./decklists');

const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

const client = new tmi.client(opts);
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.connect();

function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port} #${process.env.CHANNEL_NAME}`);
}

function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // ignore messages from the bot

  const command = msg.trim();
  
  // admin functions
  if (context.username === process.env.ADMIN && command === '!deckreview start') {
    // start decklist reviews
    Decklist.reset(function (err) {
      client.say(target, 'Decklist reviews started.');    
    });

  } else if (context.username === process.env.ADMIN && command === '!deckreview pick') {
    // choose a random decklist and remove it from list    
    Decklist.all(function(err, decklists) {
      if (!decklists.length && !err) return client.say(target, 'No decklists left to review.');
      const rnd = Math.floor(Math.random() * decklists.length);
      const list = decklists[rnd];

      Decklist.delete(list.username, function(err) {
        console.log("err", err);
        client.say(target, `${list.username}'s decklist has been chosen! ''${list.deck}''`);
      });
    });

  } else if (context.username === process.env.ADMIN && command === '!deckreview count') {
    // display the number of decklists submitted
    Decklist.all(function (err, decklists) {
      client.say(target, `There are ${decklists.length} decklists submitted.`);
    });

  } else if (context.username === process.env.ADMIN && command === '!deckreview debug') {
    // debug output
    Decklist.all(function (err, decklists) {
      client.say(target, JSON.stringify(decklists));
    });

  // viewer functions
  } else if (command === '!deckreview help' || command === '!deckreview') {
    // display howto message
    client.say(target, `Submit decklists by using command "!deckreview http://example.com/url-to-your-decklist"`);

  } else if (command.startsWith('!deckreview')) {
    // add decklist function
    if (!command.includes('http')) return client.say(target, `Please include a link to your decklist ${context.username}.`);
    
    Decklist.add(context.username, command.replace('!deckreview ', ''), function(err) {
      client.say(target, `Thanks ${context.username}! Your decklist has been submitted.`);
    });
    
  }
}
