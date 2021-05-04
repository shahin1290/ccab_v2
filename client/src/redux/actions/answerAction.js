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
 
  ANSWER_MY_LIST_REQUEST,
  ANSWER_MY_LIST_SUCCSESS,
  ANSWER_MY_LIST_FAIL,
  ANSWER_ONE_REQUEST,
  ANSWER_ONE_SUCCSESS,
  ANSWER_ONE_FAIL,
  ANSWER_UPDATE_STATUS_REQUEST,
  ANSWER_UPDATE_STATUS_SUCCSESS,
  ANSWER_UPDATE_STATUS_FAIL
} from '../constences/answerConst'
import axios from 'axios'

export const createAnswer = (answer, bootcampId, quizId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ANSWER_CREATE_REQUEST
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
      `/api/answers/${bootcampId}/${quizId}`,
      answer,
      config
    )

    dispatch({
      type: ANSWER_CREATE_SUCCSESS,
      //   payload: console.log("payload:", resconst response.data),
      payload: response.data
    })

    dispatch({
      type: ANSWER_CREATE_REST
      // this is turnng back to empty {}, not using the ACTION
    })
  } catch (error) {
    console.log('error:', error.response)
    dispatch({
      type: ANSWER_CREATE_FAIL,
      //    payload: error.res
      payload: error.response.data.message
    })
  }
}

//get user's answers
export const getMyAnswerList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANSWER_MY_LIST_REQUEST
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
    const response = await axios.get('/api/answers/myanswers', config)
    dispatch({
      type: ANSWER_MY_LIST_SUCCSESS,
      // payload: console.log("payload:", response),
      payload: response.data
    })
  } catch (error) {
    //console.log(error.response.data.message);
    dispatch({
      type: ANSWER_MY_LIST_FAIL,
      payload: error.response.data.message
    })
  }
}

//get answers list for specific task
export const getTaskAnswerList = (bootcampId, taskId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ANSWER_LIST_REQUEST
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
      `/api/answers/${bootcampId}/${taskId}`,
      config
    )

    dispatch({
      type: ANSWER_LIST_SUCCSESS,
      payload: response.data.data
      // payload: console.log("payload: ", response.data),
    })
  } catch (error) {
    dispatch({
      type: ANSWER_LIST_FAIL,
      payload: error.response.data.message
    })
  }
}

//get specific answer for specific user
export const getUserAnswer = (bootcampId, taskId, id) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ANSWER_ONE_REQUEST
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
      `/api/answers/${bootcampId}/${taskId}/${id}`,
      config
    )

    dispatch({
      type: ANSWER_ONE_SUCCSESS,
      payload: response.data
      // payload: console.log("payload: ", response.data),
    })
  } catch (error) {
    dispatch({
      type: ANSWER_ONE_FAIL,
      payload: error.response.data.message
    })
  }
}

export const updateAnswerStatus = (
  bootcampId,
  taskId,
  answerId,
  status
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANSWER_UPDATE_STATUS_REQUEST
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

    const response = await axios.put(
      `/api/answers/${bootcampId}/${taskId}/${answerId}`,
      status,
      config
    )

    dispatch({
      type: ANSWER_UPDATE_STATUS_SUCCSESS,
      payload: response.data
      // payload: console.log("payload: ", response.data),
    })
  } catch (error) {
    dispatch({
      type: ANSWER_UPDATE_STATUS_FAIL,
      payload: error.response.data.message
    })
  }
}
