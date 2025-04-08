const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");

const Connection = "mongodb+srv://marvellousatare:NBPyqXWImHgWG2IB@marvel.grg9lsn.mongodb.net/?retryWrites=true&w=majority&appName=Marvel";

mongoose.connect(Connection).then(() => console.log("connected to db"));

const FormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const PostSchema = new mongoose.Schema({
    user: {
      type: String,
      required: false, // Now optional
    },
    title: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: false,
    },
    media: {
      type: String,
      required: false,
    },
    Impressions: {
      likes: {
        type: [String],
        default: [],
      },
      reposts: {
        type: [String],
        default: [],
      },
      comments: {
        type: [String],
      },
      createdAT: {
        type: Date,
        default: Date.now,
      },
    },
  });
  

const Post = mongoose.model('Post', PostSchema);

const FormDataRulesforcollection = mongoose.model("formDataCollection", FormSchema);

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: 'GET, POST, PUT, DELETE',
}));

app.use(express.json());
const PORT = 4000;


// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, 'C:/Users/Chukwudi/Downloads/FrontEnd/vite-project/public'); 
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.originalname); 
//   }
// });

// const upload = multer({ storage: storage });

// Sample user profile
const myProfile = {
  "name": "John Doe",
  "age": "60",
  "gender": "male",
  "occupation": "Lawyer",
  "marital_status": "married"
};

app.get("/username", async (req, res) => {
  res.send(myProfile);
});

// Upload form data (same as the original logic)
app.post('/Upload', async (req, res) => {
  try {
    const newEntry = new FormDataRulesforcollection(req.body);
    console.log(req.body);
    await newEntry.save();
    res.json({ message: "Data saved successfully", data: newEntry });
  } catch (error) {
    res.json({ message: "Server failed to save data" });
  }
});

app.post('/Post', upload.single('media'), async (req, res) => {
    try {
      console.log("Received Data:", req.body);
      console.log("Received File:", req.file);
  
      const { title, body } = req.body;
      const media = req.file ? req.file.path : '';
  
      const user = req.body.user || 'Anonymous'; 
  
      const newPost = new Post({
        title,
        body,
        media,
        user, 
        Impressions: {
          likes: [],
          reposts: [],
          comments: [],
        }
      });
  
      await newPost.save();
      res.json({ message: "Post saved successfully", data: newPost });
    } catch (error) {
      console.error("Error saving post:", error);
      res.status(500).json({ error: "Failed to save post" });
    }
  });
  
  db.unicorns.insertOne({
    name : "Marvel",
    gender: "Male"
    })

  app.post('/add', async (req, res) =>{
      try{
          const add = new FormDataRulesforcollection({
            name : "Marvel",
            email: "Male@gmail.com"
          })
        await add.save()
        res.json({message: "Data has Entered", data: add})
      }catch(error){
          
      }
  })

//  to find all documents in a collection
// db.unicorns.find()

app.get('/getAll', async (req, res)=>{
  try{
    const getAll = await FormDataRulesforcollection.find()
    res.json(getAll)
  }catch(error){

  }
})

// db.unicorns.find({
//   name: "defs"
//   })

app.get('/getAll', async (req, res)=>{
  try{
    const getAll = await FormDataRulesforcollection.find()
    res.json(getAll)
  }catch(error){

  }
})


app.get('/userName', async (req, res)=>{
  try{
    const getAll = await FormDataRulesforcollection.find({
      name: "defs"
    })
    res.json(getAll)
  }catch(error){

  }
})

// 
//  db.unicorns.updateOne({_id: ObjectId('67aa097f72138b1a13a81626')}, {$set:{gender:'f'}})

app.put("/update/:id", async (req, res)=>{
  try{
    const updatedEntry = await FormDataRulesforcollection.findByIdAndUpdate(
      req.params.id.trim(),
      {name: "Eddie", email: "semo@gmail.com"},{new: true}
    )
    if(!updatedEntry) return res.status(404).json({message: "Entry not found"})
    res.json({message: "Entry Updated", data: updatedEntry})
  }catch(error){
    res.status(500).json({message: "Error updating entry", error})
  }
})


// del

app.delete("/api/forms/:id", async (req, res) => {
  try {
    const deletedEntry = await FormDataRulesforcollection.findByIdAndDelete(req.params.id);
    if (!deletedEntry) return res.status(404).json({ message: "Entry not found" });
    res.json({ message: "Entry deleted", data: deletedEntry });
  } catch (error) {
    res.status(500).json({ message: "Error deleting entry", error });
  }
});


app.listen(PORT, () => console.log(`listening on port ${PORT}`));