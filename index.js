const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('node Server running');
})

app.use(cors());
app.use(express.json());

const users = [
    {id: 01, name: 'Sabana', email: 'sabana@gmail.com'},
    {id: 02, name: 'Sabnoor', email: 'sabnoor@gmail.com'},
    {id: 03, name: 'Sabila', email: 'sabila@gmail.com'},
];


// username: dbUser1
// password: tdGI4B6aWl2aS80U



const uri = "mongodb+srv://dbUser1:tdGI4B6aWl2aS80U@cluster0.nfyjflh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
        const userCollection = client.db('simpleNodes').collection('users');
        // const user = {name: 'Pk', email: 'pk@gmail.com'};
        // const result = await userCollection.insertOne(user);
        // console.log(result);

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId;
            res.send(user);
        })
    }
    finally{

    }
}

run().catch(err => console.log(err))


// app.get('/users', (req, res) => {
//    if(req.query.name){
//         const search = req.query.name;
//         const filtered = users.filter(user => user.name.toLowerCase.indexOf(search));
//         res.send(filtered);
//    }
//    else{
//     res.send(users);
//    }
// })

// app.post('/users', (req, res) => {
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     console.log(user);
//     res.send(user);
// })

app.listen(port, ()=> {
    console.log(`server running on port ${port}`)
})