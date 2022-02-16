const express = require('express');
const Drone = require('../models/Drone.model');
const router = express.Router();

// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find()
    .then(listOfDrones => res.render('drones/list', { drones: listOfDrones }))
    .catch(error => console.log(`The following error occured when trying to get the list of drones: ${error}`));
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render('drones/create-form');
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  const { name, propellers, maxSpeed } = req.body
  Drone.create({ name, propellers, maxSpeed })
    .then(newDrone => {
      console.log(`Created a new Drone: ${newDrone}`);
      res.redirect('/drones');
    })
    .catch(error => {
      console.log(`An error occured when creating the drone: ${error}`);
      res.render('drones/create-form');
    });
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const { id } = req.params;
  Drone.findById(id)
    .then(chosenDrone => res.render('drones/update-form', chosenDrone))
    .catch(error => console.log('This error happened when trying to find the drone: ', error));
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body

  Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed })
    .then(updatedDrone => {
      console.log(`Uptated the following drone: ${updatedDrone.name}`);
      res.redirect('/drones');
    })
    .catch(error => console.log('The following error occurred when trying to update drone`s info', error));
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  const { id } = req.params;
  Drone.findByIdAndDelete(id)
    .then(removedDrone => {
      console.log('Removed the following drone properly: ', removedDrone);
      res.redirect('/drones');
    }
    )
    .catch(error => console.log('The following error occurred when trying to remove the drone: ', error));
});

module.exports = router;
