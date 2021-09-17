import asyncHandler from "express-async-handler";
import Reservation from "../models/reservationModel.js";

// @ FETCH ALL RESERVATIONS
// @ GET /api/reservation
// @ Private/Admin
const getAllReservations = asyncHandler(async (req, res) => {
  const reservations = Reservation.find({});

  res.json(reservations);
});

// @ Get single reservation
// @ GET /api/reservation/:id
// @ Private/Admin
const getSingleReservation = asyncHandler(async (req, res) => {
  const reservation = Reservation.findById(req.params.id);

  res.json(reservation);
});

export { getAllReservations, getSingleReservation };
