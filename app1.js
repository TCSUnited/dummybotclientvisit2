var restify = require('restify');
var builder = require('core');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3979, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());


//=========================================================
// Bots Middleware
//=========================================================

// Anytime the major version is incremented any existing conversations will be restarted.
bot.use(builder.Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i }));

//=========================================================
// Bots Global Actions
//=========================================================

bot.endConversationAction('goodbye', 'Goodbye :)', { matches: /^goodbye/i });
bot.beginDialogAction('help', '/help', { matches: /^help/i });
bot.beginDialogAction('items','/items', { matches: /^items/i });
bot.beginDialogAction('fees','/fees', { matches: /^fees/i });
bot.beginDialogAction('gate','/gate', { matches: /^gate/i });

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', [
    function (session, args, next) {
        
       /* if (!session.userData.name) {
            session.beginDialog('/profile');
            
        } else {
            next();
        }
    },*/
   
        session.send('Hello John');
        //session.send('How can I help you ??');
         //session.beginDialog('/menu');
    },
     
    //function (session, results) {
        // Always say goodbye
       
      // session.beginDialog("/carousel1");
   // },
    function (session, results) {
        // Always say goodbye
        session.send("Ok... See you later!");
    },
]);




bot.dialog('/help', [
    function (session) {
        session.endDialog("Global commands that are available anytime:\n\n* items- Asking item that can be taken.\n* fees - fees to upgrade seat.\n* gate - gate number of your flight.\n* help - Displays these commands.");
    }
]);
bot.dialog('/items', [
    function (session) {
        session.endDialog("Items you cannot carry include :\n\n Alcohol,knife,sharp objects that can be used as weapons,inflammable items");

        //builder.Prompts.choice(session, "Are you satisfied with the answer", "Yes|No");//, "cards|list|carousel|receipt|actions|(quit)"
   
    }
]);
bot.dialog('/fees', [
    function (session) {
        session.endDialog("Fees to upgrade your seat will be $50");
        //builder.Prompts.choice(session, "Are you satisfied with the answer", "Yes|No");
    }
]);

bot.dialog('/gate', [
    function (session) {
        session.endDialog("Your flight would depart from gate number A14");
        //builder.Prompts.choice(session, "Are you satisfied with the answer", "Yes|No");
    }
]);






