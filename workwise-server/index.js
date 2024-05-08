const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const port = process.env.PORT || 3000;

// middleware
app.use(
  cors({
    origin: ["http://localhost:5173", 'https://workwise-markerplace.web.app'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  })
);
app.use(express.json());
app.use(cookieParser());

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0rmazcr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const logger = (req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  const token = req?.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "unauthorized" });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const jobsCollection = client.db("workwise").collection("jobs");
    const bidsCollection = client.db("workwise").collection("bids");

    // //  auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "1h" });

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.send({ success: true });
    });

    app.post("/logout", async (req, res) => {
      const user = req.body;
      console.log("loging out user", user);
      res.clearCookie("token", { maxAge: 0 });
      res.send({ success: true });
    });

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
    });

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

    app.get("/jobsId/:email", logger, async (req, res) => {
      console.log("token", req.user.email);
      const tokenEmail = req.user.email;
      const email = req.params.email;
      console.log("user email", email);
      if (tokenEmail !== email) {
        return (
          res.status(401).send({ message: "unauthorized" }) ||
          res.status(403).send({ message: "forbidden" })
        );
      }
      const query = { "buyer.email": email };
      const result = await jobsCollection.find(query).toArray();
      res.send(result);
    });

    app.put("/updateJob/:id", async (req, res) => {
      const id = req.params.id;
      const updateJob = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
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
          },
        },
      };
      const result = await jobsCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // bids related api
    app.post("/bids", async (req, res) => {
      // check if it's a duplicate request
      const bid = req.body;
      const query = {
        email: bid.email,
        jobId: bid.jobId,
      };
      const alreadyApplied = await bidsCollection.findOne(query);
      if (alreadyApplied) {
        return res.status(400).send("You have already applied for this job");
      }
      const result = await bidsCollection.insertOne(bid);

      // update bid count in jobs collection
      const jobQuery = { _id: new ObjectId(bid.jobId) };
      const BidCountUpdate = {
        $inc: {
          bid_count: 1,
        },
      };

      const BidCountUpdateResult = await jobsCollection.updateOne(
        jobQuery,
        BidCountUpdate
      );
      res.send(result);
    });

    // get all bids for a user by email from db
    app.get("/myBids/:email", logger, async (req, res) => {
      console.log("token", req.user.email);
      const tokenEmail = req.user.email;
      const email = req.params.email;
      console.log("user email", email);
      if (tokenEmail !== email) {
        return (
          res.status(401).send({ message: "unauthorized" }) ||
          res.status(403).send({ message: "forbidden" })
        );
      }
      const query = { email: email };
      const result = await bidsCollection.find(query).toArray();
      res.send(result);
    });

    // get all bids request from  db for job owner
    app.get("/bidsRequest/:email", logger, async (req, res) => {
      console.log("token", req.user.email);
      const tokenEmail = req.user.email;
      const email = req.params.email;
      if (tokenEmail !== email) {
        return (
          res.status(401).send({ message: "unauthorized" }) ||
          res.status(403).send({ message: "forbidden" })
        );
      }
      const query = { buyer_email: email };
      const result = await bidsCollection.find(query).toArray();
      res.send(result);
    });

    // bids Update Status
    app.patch("/bids/:id", async (req, res) => {
      const id = req.params.id;
      const status = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: status,
      };
      const result = await bidsCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    //  get all jobs data from db for pagination
    app.get("/allJobs", async (req, res) => {
      const size = parseInt(req.query.size);
      const page = parseInt(req.query.page) - 1;
      const filter = req.query.filter;
      const sort = req.query.sort;
      const search = req.query.search;
      let query = {
        job_title: { $regex: search, $options: "i" },
      };
      if (filter) query.category = filter;
      let options = {};
      if (sort) options = { sort: { deadline: sort === "asc" ? 1 : -1 } };
      const result = await jobsCollection
        .find(query, options)
        .skip(page * size)
        .limit(size)
        .toArray();
      res.send(result);
    });

    // get all jobs data count from db
    app.get("/jobsCount", async (req, res) => {
      const filter = req.query.filter;
      const search = req.query.search;
      let query = {
        job_title: { $regex: search, $options: "i" },
      };
      if (filter) query.category = filter;
      const count = await jobsCollection.countDocuments(query);
      res.send({ count });
    });

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
