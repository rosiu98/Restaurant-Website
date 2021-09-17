import mongoose from "mongoose";

const reservationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    persons: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    comment: String,
  },
  {
    timestamps: true,
  }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
