var context = require.context('./unitTest', true, /\.spec\.js$/);
context.keys().forEach(context);

