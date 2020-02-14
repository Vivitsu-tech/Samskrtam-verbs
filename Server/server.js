const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const router = express.Router();
var Schema = mongoose.Schema;
//var lakarasRouter = require("./routes/lakaras");

// Creates an express application
const app = express();

// BodyParser middleware
app.use(bodyParser.urlencoded({
        extended: false})
        );
app.use(bodyParser.json());

//Configure Mongo database
const db = "mongodb://localhost:27017/VerbFormsDB";
var lakaraschema = new Schema({
    //_id: Number,
    dhatu: String,
    voice: String,
    lakara: String,
    purusha: String,
    eka: String,
    dvi: String,
    bahu: String
  }, {
  collection: 'lakarasCollection'
});

var Model = mongoose.model('Model', lakaraschema);

//Connect to the db
mongoose.connect (
    db, {useNewUrlParser: true}
)
/*    .then(() => console.log("Mongo connected"))
    .catch(err => console.log(err));*/

// Declare connection handler
var connection = mongoose.connection;

connection.on("open", function(){
    console.log("mongodb is connected!!");
  });

app.get('/lakaras', function(req, res, next) {
    //res.send('before calling db')
    Model.distinct("dhatu")
    .then(forms => {
        res.send(forms);
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        })
     })
})

app.get('/lakaras/:root', function(req, res, next) {
    //res.send('before calling db')
    Model.find({dhatu: req.params.root})
    .then(forms => {
        res.send(forms);
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        })
     })
})

app.get('/lakaras/:root/:form', function(req, res, next) {
        //res.send('before calling db')
        Model.find({dhatu: req.params.root, voice: req.params.form})
        .then(forms => {
            res.send(forms);
        }).catch(err => {
            res.status(500).send({
                message: err.message 
            })
         })
})

app.post('/lakaras', (req, res) => {
    // Validate request
    console.log("from server")
    console.log(req)
    if(!req.body) {
        return res.status(400).send({
            message: "forms content can not be empty"
        });
    }

    // Create a form
    const form = new Model({
       // _id: req.body._id, 
      dhatu: req.body.root,
      voice: req.body.voice,
      lakara: req.body.tense,
      purusha: req.body.purusha,
      eka: req.body.eka,
      dvi: req.body.dvi,
      bahu: req.body.bahu
    });

    // Save form in the database
    form.save()
    .then(data => {
        //res.send(data);
        res.json("Verb forms added succesfully")
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while adding verb forms."
        });
    });
});

//app.use("/",lakarasRouter);

// Specify the Port where the backend server can be accessed and start listening on that port
const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`Server started on port ${port}...`);
});
