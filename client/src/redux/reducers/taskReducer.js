import {
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAIL,
  TASK_DETAILS_REQUEST,
  TASK_DETAILS_SUCCESS,
  TASK_DETAILS_FAIL,
  TASK_ADD_REQUEST,
  TASK_ADD_SUCCESS,
  TASK_ADD_FAIL,
  TASK_ADD_REST,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_CHECKED_UPDATE_REQUEST,
  TASK_CHECKED_UPDATE_SUCCESS,
  TASK_CHECKED_UPDATE_FAIL,
  TASK_CHECKED_UPDATE_RESET,
  TASK_PASSED_UPDATE_REQUEST,
  TASK_PASSED_UPDATE_SUCCESS,
  TASK_PASSED_UPDATE_FAIL,
  TASK_PASSED_UPDATE_RESET,
  TASK_NO_PASSED_UPDATE_REQUEST,
  TASK_NO_PASSED_UPDATE_SUCCESS,
  TASK_NO_PASSED_UPDATE_FAIL,
  TASK_NO_PASSED_UPDATE_RESET,
  TASK_MY_LIST_REQUEST,
  TASK_MY_LIST_SUCCSESS,
  TASK_MY_LIST_FAIL,
  DOWNLOAD_ASSIGNMENT_FAIL
} from '../constences/taskConst'

export const taskListReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case TASK_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case TASK_LIST_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        tasks: action.payload
      }
    case TASK_LIST_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const taskDetailsReducer = (
  state = { task: {}, loading: false },
  action
) => {
  switch (action.type) {
    case TASK_DETAILS_REQUEST:
      return {
        ...state,
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case TASK_DETAILS_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        task: action.payload
      }

    case TASK_DETAILS_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const taskCreateReducer = (
  state = { task: {}, success: false },
  action
) => {
  switch (action.type) {
    case TASK_ADD_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case TASK_ADD_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        task: action.payload,
        // task: console.log("actionPayload: ",action.payload,),
        success: true
      }
    case TASK_ADD_FAIL:
      return {
        success: false,
        loading: false, // loading is done laoding!
        error: action.payload
      }
    case TASK_ADD_REST:
      return { task: {}, success: false }
    default:
      return state
  }
}

export const taskDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_DELETE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case TASK_DELETE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        successDelete: true
      }
    case TASK_DELETE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }
    default:
      return state
  }
}

export const taskCheckedReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_CHECKED_UPDATE_REQUEST:
      return {
        loading: true
      }
    case TASK_CHECKED_UPDATE_SUCCESS:
      return {
        loading: false,
        updateSuccess: true
      }
    case TASK_CHECKED_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    case TASK_CHECKED_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const taskPassedReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_PASSED_UPDATE_REQUEST:
      return {
        loading: true
      }
    case TASK_PASSED_UPDATE_SUCCESS:
      return {
        loading: false,
        updateSuccess: true
      }
    case TASK_PASSED_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    case TASK_PASSED_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const taskNotPassedReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_NO_PASSED_UPDATE_REQUEST:
      return {
        loading: true
      }
    case TASK_NO_PASSED_UPDATE_SUCCESS:
      return {
        loading: false,
        updateSuccess: true
      }
    case TASK_NO_PASSED_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    case TASK_NO_PASSED_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const taskMyListReducer = (state = { myTasks: [] }, action) => {
  switch (action.type) {
    case TASK_MY_LIST_REQUEST:
      return {
        ...state,
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case TASK_MY_LIST_SUCCSESS:
      return {
        loading: false, // loading is done laoding!
        myTasks: action.payload.data
      }

    case TASK_MY_LIST_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const DownloadAssignmentReducer = (state = {}, action) => {
  switch (action.type) {
    case DOWNLOAD_ASSIGNMENT_FAIL:
      return {
        ...state,
        error: action.payload // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    default:
      return state
  }
}
