
import { GET_RECIPIENTS, GET_OPTINS, CLEAR_REPORTS } from '../actions/types';

const initialState = {
  optins: {},
  recipients: {},
  reportData: {},
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_REPORTS:
        return {
            ...state,
            optins: {},
            recipients: {},
            loading: true
        }
    case GET_RECIPIENTS:
      return {
        ...state,
        recipients: action.payload,
        loading: false
      };
    case GET_OPTINS:
        return {
          ...state,
          optins: action.payload,
          loading: false
        };
    default:
      return state;
  }
}
