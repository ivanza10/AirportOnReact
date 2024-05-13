const express = require('express');
const router = express.Router();
const Flight = require('../models/flightModel');

// GET all flights
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.getAllFlights();
    res.json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET flights by type (suda or tuda)
router.get('/suda', async (req, res) => {
  try {
    const flights = await Flight.getFlightsByType('прилет');
    res.json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/tuda', async (req, res) => {
  try {
    const flights = await Flight.getFlightsByType('вылет');
    res.json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new flight
router.post('/', async (req, res) => {
  const { time, direction, aviaComp, terminal, type } = req.body;
  try {
    const newFlight = await Flight.createFlight(time, direction, aviaComp, terminal, type);
    res.status(201).json(newFlight);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT update a flight
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { time, direction, aviaComp, terminal, type } = req.body;
  try {
    const updatedFlight = await Flight.updateFlight(id, time, direction, aviaComp, terminal, type);
    res.json(updatedFlight);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await Flight.deleteFlight(id);
    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
