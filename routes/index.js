/*var express = require('express');
var router = express.Router();*/

//was here....

/*module.exports = router;*/

const router = require("express").Router();
// import your pg client
const client = require("../client");
module.exports = router;
const express=require('express');
const app=express();

//now here...
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.get("/input", (req, res) => {
  // use our client to get all of our hats from our database
  // by creating raw sql query to be passed to query method
  client.query("select * from input", (err, data) => {
    // log any errors that you encounter
    if (err) return console.error(err);
    // map over the array of returned rows and log them into your console
    data.rows.forEach(rowObject => {
      console.log(rowObject);
    });
    // send back via http response body the data
    res.send(data.rows);
  });
  return;
});

router.post("/input", (req, res) => {
  // destructure the values you will need off of your response body
  const { input, length } = req.body;

  client.query(
      // use string interpolation to create sql query to insert values into db
      `insert into input (input, length) values ('${name}', 
    '${id}', ${input}, ${length})`,
      (err, data) => {
        if (err) return console.error(err);
        console.log(data);
        // once successful, use query to get all hats from hats table again
        client.query("select * from hats", (err, data) => {
          data.rows.forEach(rowObject => {
            console.log(rowObject);
          });
          // send all hats back. 201 is http response code for creation successful
          res.status(201).send(data.rows);
        });
      }
  );
  return;
});

app.use(router);

// app.listen(8080, () => {
//   console.log('listening on port 8080');
//
// });
