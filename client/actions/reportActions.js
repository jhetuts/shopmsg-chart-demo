import {
  GET_OPTINS,
  GET_RECIPIENTS,
  CLEAR_REPORTS
} from './types';

// get Optins
export const getReport = (from, to) => dispatch => {

  dispatch(clearReport());
  
  fetch(`/api/reports/optins.json?from=${from}&to=${to}`)
    .then(res => res.json())
    .then( data => 
      dispatch({
        type: GET_OPTINS,
        payload: data
      })
    )
    .catch(error => console.log(error));

    fetch(`/api/reports/recipients.json?from=${from}&to=${to}`)
    .then(res => res.json())
    .then( data => 
      dispatch({
        type: GET_RECIPIENTS,
        payload: data
      })
    )
    .catch(error => console.log(error));
};

// // get Recipients
// export const getRecipients = (from, to) => dispatch => {
  
  
// };

// Clear Report
export const clearReport = () => {
  return {
    type: CLEAR_REPORTS
  };
};
