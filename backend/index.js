const connectToMongo = require('./db')
const express = require('express');
var cors = require('cors')
//connecting to database
connectToMongo();
const app = express();
const port = 8000;

// app.get('/', (req, res) => {
//     res.send('hello Aarya');
// })

//available routes
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use(cors())

//listening to port
app.listen(port, () => {
    console.log(`Vocable backend listening at http://localhost:${port}`);
})
