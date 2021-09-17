import express from "express";
const router = express.Router();
import {
  getAllReservations,
  getSingleReservation,
} from "../controllers/reservationController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, admin, getAllReservations);

router.route("/:id").get(protect, admin, getSingleReservation);

export default router;
