import {
  WEEK_LIST_REQUEST,
  WEEK_LIST_SUCCESS,
  WEEK_LIST_FAIL,
  WEEK_UPDATE_REQUEST,
  WEEK_UPDATE_SUCCESS,
  WEEK_UPDATE_FAIL
} from '../constences/weekConst'

export const weekListReducer = (state = { weekList: [] }, action) => {
  switch (action.type) {
    case WEEK_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case WEEK_LIST_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        weekList: action.payload
      }
    case WEEK_LIST_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const weekUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case WEEK_UPDATE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case WEEK_UPDATE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        success: true
      }
    case WEEK_UPDATE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}
