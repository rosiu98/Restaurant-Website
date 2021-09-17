import {
  RESERVATION_CREATE_FAIL,
  RESERVATION_CREATE_REQUEST,
  RESERVATION_CREATE_SUCCESS,
} from "../constants/reservationConstants";

export const reservationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RESERVATION_CREATE_REQUEST:
      return {
        loading: true,
      };
    case RESERVATION_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        reservation: action.payload,
      };
    case RESERVATION_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
