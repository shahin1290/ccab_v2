import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL
} from '../constences/orderConst'

export const orderCreateReducer = (
  state = { order: {}, success: false },
  action
) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case ORDER_CREATE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        order: action.payload,
        success: true
      }
    case ORDER_CREATE_FAIL:
      return {
        success: false,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const orderListReducer = (state = { orderList: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ORDER_LIST_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        orderList: action.payload
      }
    case ORDER_LIST_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}
