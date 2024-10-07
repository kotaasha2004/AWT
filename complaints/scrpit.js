const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));


app.set("view engine", "ejs");


app.use(express.static("public"));


const uri = `mongodb+srv://22pa1a1284:Asha84@cluster0.53xs1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri);


async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}


app.get("/", async (req, res) => {
  try {
    await connectToDatabase();
    const storage = client.db("mydb").collection("mycollection");

 
    const fetchedComplaints = await storage.find().toArray();
    console.log("Fetched Complaints:", fetchedComplaints); 

    const sortedList = fetchedComplaints.sort((a, b) => 
      {
        if (a.likes < b.likes) {
          return 1;
        } else if (a.likes > b.likes) {
          return -1;
        } else {
          return 0;
        }
      });
    console.log("Sorted Complaints:", sortedList); 
    res.render("home", { data: sortedList });
  } catch (err) {
    console.error("Error rendering home page:", err);
    res.status(500).send("Error loading home page");
  }
});

app.post("/likes", async (req, res) => {
  const likedId = req.body.thumbsup;

  try {
    await connectToDatabase();
    const storage = client.db("mydb").collection("mycollection");

    
    const result = await storage.updateOne(
      { _id: new ObjectId(likedId) },
      { $inc: { likes: 1 } },
    );
    console.log(`Likes updated for ID: ${likedId}, result1`);
    


    res.redirect("/");
  } catch (err) {
    console.error("Error processing like:", err);
    
  }
});


app.post("/filter", async (req, res) => {
  const filter = req.body.filterValue;
  console.log("Selected Filter:", filter);

  try {
    await connectToDatabase();
    const storage = client.db("mydb").collection("mycollection");

    let filteredData;

    if (filter === "all") {
      filteredData = await storage.find().toArray();
    } else {
      filteredData = await storage.find({ dept: filter }).toArray();
    }
    console.log(filteredData); 

    const sortedFilteredList = filteredData.sort((a, b) => b.likes - a.likes);
    console.log( sortedFilteredList);
   
    res.render("home", { data: sortedFilteredList });
  } catch (error) {
    console.error("Error filtering data:", error);
    
  }
});


app.post("/delete", async (req, res) => {
  const postId = req.body.postId;

  try {
    await connectToDatabase();
    const storage = client.db("mydb").collection("mycollection");

    
    const result = await storage.deleteOne({ _id: new ObjectId(postId) });
    console.log(`Complaint deleted with ID: ${postId}, result`);

    
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting complaint:", err);
    res.status(500).send("Error deleting complaint");
  }
});


app.get("/complaints", (req, res) => {
  res.render("addcomplaints");
});


app.post("/complaints", async (req, res) => {
  const data = req.body;
  console.log(data)

  try {
    await connectToDatabase();
    const storage = client.db("mydb").collection("mycollection");

    
    const newComplaint = {
      ...data,
      likes: 0, 
    };

    const result = await storage.insertOne(newComplaint);
    console.log("Complaint inserted:", result); 

    
    res.redirect("/");
  } catch (err) {
    console.error("Error submitting complaint:", err);
    res.status(500).send("Error submitting complaint");
  }
});




app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
