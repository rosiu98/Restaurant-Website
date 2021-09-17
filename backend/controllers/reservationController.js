import asyncHandler from "express-async-handler";
import Reservation from "../models/reservationModel.js";

// @ FETCH ALL RESERVATIONS
// @ GET /api/reservation
// @ Private/Admin
const getAllReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({});

  res.json(reservations);
});

// @ Get single reservation
// @ GET /api/reservation/:id
// @ Private/Admin
const getSingleReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);

  if (reservation) {
    res.json(reservation);
  } else {
    res.status(404)
    throw new Error('Reservation not Found')
  }
});

// @ Post reservation
// @ POST /api/reservation
// @ Private/Admin
const createReservation = asyncHandler(async (req, res) => {
  const { name, phone, persons, date, time, email, comment } = req.body;

  const reservation = new Reservation({
    name,
    phone,
    persons,
    date,
    time,
    email,
    comment,
  });

  const createdReservation = await reservation.save();

  res.status(201).json(createdReservation);
});

export { getAllReservations, getSingleReservation, createReservation };
