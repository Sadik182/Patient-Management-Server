const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

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

    } catch (error) {
        console.log(error);
    }
    finally {
        client.close()
    }
}
run();


app.get("/", (req, res) => {
  res.send("Patient Management Server is Running");
});
app.listen(port, (req, res) => {
  console.log("Server is Running on " + port);
});
