const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;


//Midlewire 

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Patient Management Server is Running');
})
app.listen(port, (req, res) => {
    console.log('Server is Running on '+ port);
})