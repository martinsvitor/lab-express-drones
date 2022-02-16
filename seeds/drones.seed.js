// Iteration #1
const mongoose = require('mongoose');
const Drone = require('../models/Drone.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/lab-express-drones';

mongoose
    .connect(MONGO_URI)
    .then(result => console.log(`Connected to Mongo! Database name: ${result.connections[0].name}`)
)
    .catch(error => console.log(`Problem when connecting to the database: ${error}`));

const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
  ];

Drone.create(drones)
    .then(createdDrones => {
      console.log(`created ${createdDrones.length} drones`);
      mongoose.connection.close();
  })
    .catch(error =>  console.log(`error occurred when trying to create drones: `, error));