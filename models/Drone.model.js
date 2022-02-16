// Iteration #1
const  { Schema, model } = require('mongoose');

const droneSchema = new Schema({
    name: String,
    propellers: Number,
    maxSpeed: {
        type: Number,
        max: 30
    }
});

const Drone = model('Drone', droneSchema);

module.exports = Drone;