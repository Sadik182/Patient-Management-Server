const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//Midlewire

app.use(cors());
app.use(express.json());

// userName PatientDB
//pass CraIp76IfqLr15ca

const uri =
  "mongodb+srv://PatientDB:CraIp76IfqLr15ca@cluster0.ebl0t.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        await client.connect();
        const database = client.db('PatientDB');
        const dataCollection = database.collection('patient');
        console.log('Database is Connected');
        const ObjectId = require('mongodb').ObjectId;

        //GET API
        app.get('/patient', async(req, res) => {
            const query = {};
            const cursor = dataCollection.find(query);
           const patients = await cursor.toArray();
           res.send(patients);
        });

        //Get Single Patient

        app.get('/patient/:id', async(req, res) => {
          const id = req.params.id;
          const query = {_id: ObjectId(id)};
          const result = await dataCollection.findOne(query);
          res.send(result);
        })

        //POST API
        app.post('/patient', async(req, res) => {
            const newPatient = req.body;
            const result = await dataCollection.insertOne(newPatient);
            res.send(result);
        });

        //DELETE API

        app.delete('/patient/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await dataCollection.deleteOne(query);
            res.send(result);
        });

        // UPDATE API

        app.put("/patient/:id", async(req, res) => {
          let result = await dataCollection.updateOne({_id: ObjectId(req.params.id)}, {$set: req.body}, {upsert: true});
          res.send(result);
        })


        // app.put('/patient/:id', async(req, res) => {
        //   // const id = req.params.id;
        //   // const updatedPatient = req.body;
        //   // const filter = {_id: ObjectId(id)};
        //   // const options = {upsert: true};
        //   // const updatedDoc = {
        //   //   $set: {updatedPatient},
        //   // };
        //   let result = await dataCollection.updateOne({_id: req.params.id}, { $set: req.body}, {upsert: true});
        //   res.send(result);
        // });

    } finally {
        // client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Patient Management Server is Running");
});
app.listen(port, (req, res) => {
  console.log("Server is Running on " + port);
});
