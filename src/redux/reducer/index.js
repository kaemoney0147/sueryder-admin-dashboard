import {
  List_OF_PATIENT,
  LOGIN_REQUEST,
  EDIT_PROFILE,
} from "../action/index.js";
const initialState = {
  patientFood: {
    patient: [],
  },
  userInfo: {
    _id: "",
    username: "",
  },
  data: {
    changeVaules: [],
  },
};

export const getListOfUser = (state = initialState, action) => {
  switch (action.type) {
    case List_OF_PATIENT:
      return {
        ...state,
        patient: action.payload,
      };
    case LOGIN_REQUEST: {
      return {
        ...state,
        userInfo: action.payload,
      };
    }
    case EDIT_PROFILE: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default:
      return state;
  }
};
