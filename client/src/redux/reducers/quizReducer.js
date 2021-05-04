import {
  MY_QUIZ_LIST_REQUEST,
  MY_QUIZ_LIST_SUCCESS,
  MY_QUIZ_LIST_FAIL,
  QUIZ_DETAILS_REQUEST,
  QUIZ_DETAILS_SUCCESS,
  QUIZ_DETAILS_FAIL,
  QUIZ_CREATE_REQUEST,
  QUIZ_CREATE_FAIL,
  QUIZ_CREATE_SUCCESS,
  QUIZ_CREATE_RESET,
  QUIZ_LIST_REQUEST,
  QUIZ_LIST_SUCCESS,
  QUIZ_LIST_FAIL,
  QUIZ_DELETE_REQUEST,
  QUIZ_DELETE_SUCCESS,
  QUIZ_DELETE_FAIL,
  QUIZ_UPDATE_REQUEST,
  QUIZ_UPDATE_SUCCESS,
  QUIZ_UPDATE_FAIL,
  QUIZ_UPDATE_RESET
} from '../constences/quizConst'

export const quizListReducer = (state = { quizzes: [] }, action) => {
  switch (action.type) {
    case QUIZ_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case QUIZ_LIST_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        quizzes: action.payload
      }
    case QUIZ_LIST_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const myQuizListReducer = (state = { myQuizList: [] }, action) => {
  switch (action.type) {
    case MY_QUIZ_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case MY_QUIZ_LIST_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        myQuizList: action.payload.data
      }
    case MY_QUIZ_LIST_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const quizDetailsReducer = (
  state = { quiz: {}, loading: false },
  action
) => {
  switch (action.type) {
    case QUIZ_DETAILS_REQUEST:
      return {
        ...state,
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case QUIZ_DETAILS_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        quiz: action.payload
      }

    case QUIZ_DETAILS_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const quizCreateReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case QUIZ_CREATE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case QUIZ_CREATE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        success: true,
        quiz: action.payload
      }

    case QUIZ_CREATE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: console.log(action.payload),
        error: action.payload,

        success: false
      }

    case QUIZ_CREATE_RESET:
      return {}

    default:
      return state
  }
}

export const quizDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case QUIZ_DELETE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case QUIZ_DELETE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        successDelete: true
      }
    case QUIZ_DELETE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }
    default:
      return state
  }
}

export const quizUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUIZ_UPDATE_REQUEST:
      return {
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case QUIZ_UPDATE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        success: true,
      };
    case QUIZ_UPDATE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload,
      };

case QUIZ_UPDATE_RESET:
      return {
        loading: false, // loading is done laoding!
        error: null,
        success:false,
      };
    default:
      return state;
  }
};