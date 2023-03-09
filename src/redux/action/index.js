export const LIST_0F_USER = "LIST_0F_USER";
export const SET_USERNAME = "SET_USERNAME";
export const List_OF_PATIENT = "List_OF_PATIENT";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const EDIT_PROFILE = "EDIT_PROFILE";

export const getUser = () => {
  return async (dispatch, getstate) => {
    try {
      let url = await fetch("http://localhost:3001/patient");

      if (url.ok) {
        const response = await url.json();
        const fetchedData = response;
        console.log(fetchedData);
        dispatch({
          type: LIST_0F_USER,
          payload: fetchedData,
        });
      }
    } catch (error) {}
  };
};
