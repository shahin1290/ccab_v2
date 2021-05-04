import {
  QUIZ_ANSWER_CREATE_REQUEST,
  QUIZ_ANSWER_CREATE_SUCCSESS,
  QUIZ_ANSWER_CREATE_FAIL,
  QUIZ_ANSWER_CREATE_REST,
  QUIZ_ANSWER_MY_LIST_REQUEST,
  QUIZ_ANSWER_MY_LIST_SUCCSESS,
  QUIZ_ANSWER_MY_LIST_FAIL,
  QUIZ_ANSWER_LIST_REQUEST,
  QUIZ_ANSWER_LIST_SUCCSESS,
  QUIZ_ANSWER_LIST_FAIL
} from '../constences/quizAnswerConst'
import axios from 'axios'

//get answers list for specific task
export const getQuizAnswerList = (bootcampId, quizId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: QUIZ_ANSWER_LIST_REQUEST
    })

    const {
      userLogin: { userDetail }
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userDetail.token
      }
    }

    const response = await axios.get(
      `/api/quizAnswer/${bootcampId}/${quizId}`,
      config
    )

    dispatch({
      type: QUIZ_ANSWER_LIST_SUCCSESS,
      payload: response.data.data
      // payload: console.log("payload: ", response.data),
    })
  } catch (error) {
    dispatch({
      type: QUIZ_ANSWER_LIST_FAIL,
      payload: error.response.data.message
    })
  }
}

export const createQuizAnswer = (answer, bootcampId, quizId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: QUIZ_ANSWER_CREATE_REQUEST
    })

    // Descruct from getState()
    const {
      userLogin: { userDetail }
    } = getState()
    const config = {
      headers: {
        Authorization: 'Bearer ' + userDetail.token
      }
    }
    const response = await axios.put(
      `/api/quizAnswer/${bootcampId}/${quizId}`,
      answer,
      config
    )

    dispatch({
      type: QUIZ_ANSWER_CREATE_SUCCSESS,
      //   payload: console.log("payload:", resconst response.data),
      payload: response.data
    })

    dispatch({
      type: QUIZ_ANSWER_CREATE_REST
      // this is turnng back to empty {}, not using the ACTION
    })
  } catch (error) {
    console.log('error:', error.response)
    dispatch({
      type: QUIZ_ANSWER_CREATE_FAIL,
      //    payload: error.res
      payload: error.response.data.message
    })
  }
}

//get user's answers
export const getMyQuizAnswerList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUIZ_ANSWER_MY_LIST_REQUEST
    })

    // Descruct from getState()
    const {
      userLogin: { userDetail }
    } = getState()
    const config = {
      headers: {
        // "Content-Type": "application/json", // we do not need this
        // becouse, we are sending GET requset!
        Authorization: 'Bearer ' + userDetail.token
      }
    }
    const response = await axios.get('/api/quizAnswer/myQuizAnswers', config)

    dispatch({
      type: QUIZ_ANSWER_MY_LIST_SUCCSESS,

      payload: response.data
    })
  } catch (error) {
    //console.log(error.response.data.message);
    dispatch({
      type: QUIZ_ANSWER_MY_LIST_FAIL,
      payload: error.response.data.message
    })
  }
}
