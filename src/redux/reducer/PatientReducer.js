import { LIST_OF_PATIENT } from "../../redux/action/index.js";

const listOFPatient = {
  patient: [],
};

export const fetchAllPatient = (state = listOFPatient, action) => {
  switch (action.type) {
    case LIST_OF_PATIENT: {
      return {
        ...state,
        patient: action.payload,
      };
    }

    default:
      return state;
  }
};
