import {
  QUIZ_ANSWER_CREATE_REQUEST,
  QUIZ_ANSWER_CREATE_SUCCSESS,
  QUIZ_ANSWER_CREATE_FAIL,
  QUIZ_ANSWER_CREATE_REST,
  QUIZ_ANSWER_MY_LIST_REQUEST,
  QUIZ_ANSWER_MY_LIST_SUCCSESS,
  QUIZ_ANSWER_MY_LIST_FAIL,
  QUIZ_ANSWER_LIST_FAIL,
  QUIZ_ANSWER_LIST_SUCCSESS,
  QUIZ_ANSWER_LIST_REQUEST
} from '../constences/quizAnswerConst'

export const quizAnswerListReducer = (
  state = { answers: [], loading: true },
  action
) => {
  switch (action.type) {
    case QUIZ_ANSWER_LIST_REQUEST:
      return {
        ...state,
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case QUIZ_ANSWER_LIST_SUCCSESS:
      return {
        loading: false, // loading is done laoding!
        answers: action.payload
      }

    case QUIZ_ANSWER_LIST_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const createQuizAnswerReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case QUIZ_ANSWER_CREATE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case QUIZ_ANSWER_CREATE_SUCCSESS:
      return {
        loading: false, // loading is done laoding!
        success: true,
        answer: action.payload
      }

    case QUIZ_ANSWER_CREATE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: console.log(action.payload),
        error: action.payload,

        success: false
      }

    case QUIZ_ANSWER_CREATE_REST:
      return {}

    default:
      return state
  }
}

export const quizAnswerMyListReducer = (
  state = { myQuizAnswers: [] },

  action
) => {
  switch (action.type) {
    case QUIZ_ANSWER_MY_LIST_REQUEST:
      return {
        ...state,
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case QUIZ_ANSWER_MY_LIST_SUCCSESS:
      return {
        loading: false, // loading is done laoding!
        myQuizAnswers: action.payload.data,
        success: true
        // mayanswers: console.log("myanswr: ",action.payload),
      }

    case QUIZ_ANSWER_MY_LIST_FAIL:
      console.log('mylist fail:', action.payload)
      return {
        loading: false, // loading is done laoding!
        error: action.payload,
        success: false,
        // error: console.log(action.payload),
        ...state
      }

    default:
      return state
  }
}
