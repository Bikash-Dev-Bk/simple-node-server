const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send('node Server running');
})

app.use(cors());

const users = [
    {id: 01, name: 'Sabana', email: 'sabana@gmail.com'},
    {id: 02, name: 'Sabnoor', email: 'sabnoor@gmail.com'},
    {id: 03, name: 'Sabila', email: 'sabila@gmail.com'},
];

app.get('/users', (req, res) => {
    res.send(users);
})

app.listen(port, ()=> {
    console.log(`server running on port ${port}`)
})