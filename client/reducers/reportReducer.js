
import { GET_RECIPIENTS, GET_OPTINS, CLEAR_REPORTS } from '../actions/types';

const initialState = {
  optins: {},
  recipients: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPIENTS:
      return {
        ...state,
        recipients: action.payload
      };
    case GET_OPTINS:
        return {
            ...state,
            optins: action.payload
        };
    case CLEAR_REPORTS:
        return {
            ...state,
            optins: {},
            recipients: {},
            loading: true
        }
    default:
      return state;
  }
}
