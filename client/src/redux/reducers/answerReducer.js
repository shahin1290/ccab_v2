import {
  ANSWER_CREATE_REQUEST,
  ANSWER_CREATE_SUCCSESS,
  ANSWER_CREATE_FAIL,
  ANSWER_CREATE_REST,
  //   ANSWER_DETAILS_REQUEST,
  // ANSWER_DETAILS_SUCCSESS,
  // ANSWER_DETAILS_FAIL  ,
  ANSWER_LIST_REQUEST,
  ANSWER_LIST_SUCCSESS,
  ANSWER_LIST_FAIL,
  ANSWER_LIST_DELETE_REQUEST,
  ANSWER_LIST_DELETE_SUCCSESS,
  ANSWER_LIST_DELETE_FAIL,
  ANSWER_MY_LIST_REQUEST,
  ANSWER_MY_LIST_SUCCSESS,
  ANSWER_MY_LIST_FAIL,
  ANSWER_ONE_REQUEST,
  ANSWER_ONE_SUCCSESS,
  ANSWER_ONE_FAIL,
  ANSWER_UPDATE_STATUS_REQUEST,
  ANSWER_UPDATE_STATUS_SUCCSESS,
  ANSWER_UPDATE_STATUS_FAIL,
  ANSWER_UPDATE_STATUS_REST
} from '../constences/answerConst'

export const createAnswerReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case ANSWER_CREATE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case ANSWER_CREATE_SUCCSESS:
      return {
        loading: false, // loading is done laoding!
        success: true,
        answer: action.payload
      }

    case ANSWER_CREATE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload,

        success: false
      }

    case ANSWER_CREATE_REST:
      return {}

    default:
      return state
  }
}

// export const answerDetailsReducer = (
//   state = { studentAnswers: [], loading: true },

//   action
// ) => {
//   switch (action.type) {
//     case ANSWER_DETAILS_REQUEST:
//       return {
//         ...state,
//         loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
//       };

//     case ANSWER_DETAILS_SUCCSESS:
//       return {
//         loading: false, // loading is done laoding!
//         answer: action.payload,
//       };

//     case ANSWER_DETAILS_FAIL:
//       return {
//         loading: false, // loading is done laoding!
//         error: action.payload,
//       };

//     default:
//       return state;
//   }
// };

export const answerMyListReducer = (
  state = { myanswers: [] },

  action
) => {
  switch (action.type) {
    case ANSWER_MY_LIST_REQUEST:
      return {
        ...state,
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case ANSWER_MY_LIST_SUCCSESS:
      return {
        loading: false, // loading is done laoding!
        myanswers: action.payload.answers,
        success: true
        // mayanswers: console.log("myanswr: ",action.payload),
      }

    case ANSWER_MY_LIST_FAIL:
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

export const answersListReducer = (
  state = { answers: [], loading: true },
  action
) => {
  switch (action.type) {
    case ANSWER_LIST_REQUEST:
      return {
        ...state,
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case ANSWER_LIST_SUCCSESS:
      return {
        loading: false, // loading is done laoding!
        answers: action.payload
      }

    case ANSWER_LIST_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const answerListDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ANSWER_LIST_DELETE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case ANSWER_LIST_DELETE_SUCCSESS:
      return {
        loading: false, // loading is done laoding!
        success: true
      }
    case ANSWER_LIST_DELETE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }
    default:
      return state
  }
}

// Getting specific answer for specific task
export const OneAnswerReducer = (
  state = { answer: { status: 'Not Sent' }, loading: false },
  action
) => {
  switch (action.type) {
    case ANSWER_ONE_REQUEST:
      return {
        ...state,
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case ANSWER_ONE_SUCCSESS:
      return {
        loading: false, // loading is done laoding!
        answer: action.payload.data
      }

    case ANSWER_ONE_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const UpdateAnswerStatusReducer = (
  state = {
    answer: { status: 'Not Sent' },
    loading: false,
    success: false
  },
  action
) => {
  switch (action.type) {
    case ANSWER_UPDATE_STATUS_REQUEST:
      return {
        ...state,
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case ANSWER_UPDATE_STATUS_SUCCSESS:
      return {
        ...state,
        loading: false, // loading is done laoding!
        answer: action.payload.data,
        success: true
      }

    case ANSWER_UPDATE_STATUS_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload,
        success: false
      }

    case ANSWER_UPDATE_STATUS_REST:
      return {
        ...state,
        success: false,
        error: '',
        loading: false
      }
    default:
      return state
  }
}
