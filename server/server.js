const express = require('express');
const cors = require('cors');
const fs = require('fs');   
const fs1 = require('fs').promises;
const path = require('path');  
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

// app.get('/api/summa',(req,res)=>{
//     // console.log('client reached  the server');
//     res.json({message: 'message from server'})
// })



// // const { MongoClient, ServerApiVersion } = require('mongodb');
// // const uri = `mongodb+srv://lokeshvlw2004:Lokesh@25@cluster0.64lfh.mongodb.net/client?retryWrites=true&w=majority`;



// // // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// // const client = new MongoClient(uri, {
// //   serverApi: {
// //     version: ServerApiVersion.v1,
// //     strict: true,
// //     deprecationErrors: true,
// //   }
// // });

// // async function run() {
// //   try {
// //     // Connect the client to the server	(optional starting in v4.7)
// //     await client.connect();
// //     // Send a ping to confirm a successful connection
// //     await client.db("client").command({ ping: 1 });
// //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
// //   } finally {
// //     // Ensures that the client will close when you finish/error
// //     await client.close();
// //   }
// // }
// // run().catch(console.dir);



// // const { MongoClient, ServerApiVersion } = require('mongodb');
// // const uri = "mongodb+srv://lokeshvlw2004:Lokesh@25@cluster0.64lfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// // const client = new MongoClient(uri, {
// //   serverApi: {
// //     version: ServerApiVersion.v1,
// //     strict: true,
// //     deprecationErrors: true,
// //   }
// // });

// // async function run() {
// //   try {
// //     // Connect the client to the server	(optional starting in v4.7)
// //     await client.connect();
// //     // Send a ping to confirm a successful connection
// //     await client.db("client").command({ ping: 1 });
// //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
// //   } finally {
// //     // Ensures that the client will close when you finish/error
// //     await client.close();
// //   }
// // }
// // run().catch(console.dir);



// const { MongoClient } = require("mongodb");

// async function run() {
//     console.log('entered run');
//     // TODO:
//     // Replace the placeholder connection string below with your
//     // Altas cluster specifics. Be sure it includes
//     // a valid username and password! Note that in a production environment,
//     // you do not want to store your password in plain-text here.
//     const pass="lokesh@25"
//     const uri =
//     `mongodb+srv://lokeshvlw2004:${pass}@cluster0.64lfh.mongodb.net?retryWrites=true&w=majority`;
    
//     // The MongoClient is the object that references the connection to our
//     // datastore (Atlas, for example)
//     const client = new MongoClient(uri);
//     console.log('point 1');
    
    
//     // The connect() method does not attempt a connection; instead it instructs
//     // the driver to connect using the settings provided when a connection
//     // is required.
//     await client.connect();
//     console.log('point 2');

//   // Provide the name of the database and collection you want to use.
//   // If the database and/or collection do not exist, the driver and Atlas
//   // will create them automatically when you first write data.
//   const dbName = "client";
//   const collectionName = "client_data";

//   // Create references to the database and collection in order to run
//   // operations on them.
//   const database = client.db(dbName);
//   const collection = database.collection(collectionName);

//   /*
//    *  *** INSERT DOCUMENTS ***
//    *
//    * You can insert individual documents using collection.insert().
//    * In this example, we're going to create four documents and then
//    * insert them all in one call with collection.insertMany().
//    */

//   const recipes = [
//     {
//       name: "sample1",
//       email:"sample1@gmail.com",
//       password:"sample1",
//     },
//     {
//         name: "sample2",
//         email:"sample2@gmail.com",
//         password:"sample2",
//     },
//     {
//         name: "sample3",
//         email:"sample3@gmail.com",
//         password:"sample3",
//     },
//   ];

//   try {
//     const insertManyResult = await collection.insertMany(recipes);
//     console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
//   } catch (err) {
//     console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
//   }
// }






// run().catch(console.dir);

app.post('/api/signup', (req, res) => {
    const user = req.body;
    user.timestamp = new Date().toISOString();

    let userData = [];
    try {
        const data = fs.readFileSync('user.json', 'utf8');
        userData = JSON.parse(data);
        
        // Check if email already exists
        const emailExists = userData.some(existingUser => existingUser.email === user.email);
        
        if (emailExists) {
            return res.json({ status: false }); // Email already exists
        }
        
    } catch (error) {
        // If the file does not exist, an empty array is used.
    }

    userData.push(user);
    fs.writeFileSync('user.json', JSON.stringify(userData, null, 2));
    res.json({ status: true }); // Successfully registered
});


app.post('/api/signin', (req, res) => {
    const { email, password } = req.body;

    try {
        const data = fs.readFileSync('user.json', 'utf8');
        const userData = JSON.parse(data);
        
        // Find user with matching email and password
        const user = userData.find(user => 
            user.email === email && 
            user.password === password
        );
        
        if (user) {
            // Remove password from response for security
            // const { password, ...userWithoutPassword } = user;
            return res.json({ 
                status: true, 
                // user: userWithoutPassword 
            });
        } else {
            return res.json({ 
                status: false, 
                message: 'Invalid email or password' 
            });
        }
        
    } catch (error) {
        return res.status(500).json({ 
            status: false, 
            message: 'Server error' 
        });
    }
});



app.listen(PORT,()=>{
    console.log("server running in http://localhost:5000/");
})