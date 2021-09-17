import axios from "axios";
import {
  RESERVATION_CREATE_FAIL,
  RESERVATION_CREATE_REQUEST,
  RESERVATION_CREATE_SUCCESS,
} from "../constants/reservationConstants";

export const createReservation =
  (reservation) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RESERVATION_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/reservation`,
        reservation,
        config
      );

      dispatch({
        type: RESERVATION_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RESERVATION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
