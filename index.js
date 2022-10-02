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

        app.post('/patient', async(req, res) => {
            const newPatient = req.body;
            const result = await dataCollection.insertOne(newPatient);
            res.send(result);
        });

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
