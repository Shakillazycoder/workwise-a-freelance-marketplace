const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// workwise
// iUNhIIYG2CQ2rZrb

const uri =
  "mongodb+srv://workwise:iUNhIIYG2CQ2rZrb@cluster0.0rmazcr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const jobsCollection = client.db("workwise").collection("jobs");
    const bidsCollection = client.db("workwise").collection("bids");

    //    jobs related api
    app.get("/jobs", async (req, res) => {
      const result = await jobsCollection.find({}).toArray();
      res.send(result);
    });

    app.post("/jobs", async (req, res) => {
      const job = req.body;
      const result = await jobsCollection.insertOne(job);
      res.status(201).send(result);
    });

    app.get("/jobs/:id", async (req, res) => {
      const id = req.params.id;
      const job = await jobsCollection.findOne({ _id: new ObjectId(id) });
      res.send(job);
    });
    
    app.post("/job", async (req, res) => {
        const jobData = req.body;
        const result = await jobsCollection.insertOne(jobData);
        res.send(result);
    })

    app.get("/job/:id", async (req, res) => {
        const id = req.params.id;
        const job = await jobsCollection.findOne({ _id: new ObjectId(id) });
        res.send(job);
      });

      app.delete("/jobs/:id", async (req, res) => {
        const id = req.params.id;
        const job = await jobsCollection.deleteOne({ _id: new ObjectId(id) });
        res.send(job);
      });

      app.get("/jobsId/:email", async (req, res) => {
        const email = req.params.email;
        const query = {"buyer.email": email}
        const result = await jobsCollection.find(query).toArray();
        res.send(result);
      });
      
      app.put("/updateJob/:id", async (req, res) => {
        const id = req.params.id;
        const updateJob = req.body;
        const filter = { _id: new ObjectId(id) }
        const options = {upsert: true}
        const updateDoc = {
            $set: {
                job_title: updateJob.job_title,
                description: updateJob.description,
                min_price: updateJob.min_price,
                max_price: updateJob.max_price,
                category: updateJob.category,
                deadline: updateJob.deadline,
                buyer: {
                    email: updateJob.buyer.email,
                    name: updateJob.buyer.name,
                    photo: updateJob.buyer.photo,
                }
            }
        }
        const result = await jobsCollection.updateOne( filter, updateDoc, options
        );
        res.send(result);
      });



    // bids related api
    app.post("/bids", async (req, res) => {
        const bid = req.body;
        const result = await bidsCollection.insertOne(bid);
        res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
