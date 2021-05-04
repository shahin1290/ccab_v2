import {
  DAY_LIST_REQUEST,
  DAY_LIST_SUCCESS,
  DAY_LIST_FAIL,
  DAY_DETAILS_REQUEST,
  DAY_DETAILS_SUCCESS,
  DAY_DETAILS_FAIL,
  DAY_UPDATE_REQUEST,
  DAY_UPDATE_SUCCESS,
  DAY_UPDATE_FAIL,
  DAY_UPDATE_RESET
} from '../constences/dayConst'

export const dayListReducer = (state = { dayList: [] }, action) => {
  switch (action.type) {
    case DAY_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DAY_LIST_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        dayList: action.payload
      }
    case DAY_LIST_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const dayDetailsReducer = (
  state = { day: {}, loading: false },
  action
) => {
  switch (action.type) {
    case DAY_DETAILS_REQUEST:
      return {
        ...state,
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case DAY_DETAILS_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        day: action.payload
      }

    case DAY_DETAILS_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const dayUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DAY_UPDATE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case DAY_UPDATE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        success: true
      }
    case DAY_UPDATE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }

    case DAY_UPDATE_RESET:
      return {
        loading: false, // loading is done laoding!
        error: null,
        success: false
      }
    default:
      return state
  }
}
