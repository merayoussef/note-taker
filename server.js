const apiRoutes = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes.js');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();


// middleware
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

app.use('/api/notes', apiRoutes);
app.use('*', htmlRoutes);
// parse incoming JSON data
app.use(express.json());
// connected the style and javascript code in /public folder.
app.use(express.static('public'));


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
