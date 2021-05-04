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
  QUIZ_UPDATE_FAIL
} from '../constences/quizConst'

import axios from 'axios'

export const getQuizList = (bootcampId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userDetail }
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userDetail.token
      }
    }

    const response = await axios.get('/api/quizzes/' + bootcampId, config)
    dispatch({
      type: QUIZ_LIST_REQUEST
    })

    dispatch({
      type: QUIZ_LIST_SUCCESS,
      payload: response.data.data
      // payload: console.log("payload: ",response.data)
    })
  } catch (error) {
    dispatch({
      type: QUIZ_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getMyQuizList = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userDetail }
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userDetail.token
      }
    }
    const response = await axios.get(`/api/quizzes/myquizlist`, config)

    dispatch({
      type: MY_QUIZ_LIST_REQUEST
    })

    dispatch({
      type: MY_QUIZ_LIST_SUCCESS,
      payload: response.data
      // payload: console.log("payload: ",response.data)
    })
  } catch (error) {
    dispatch({
      type: MY_QUIZ_LIST_FAIL,
      payload: error.response.data.message
    })
  }
}

export const getQuizDetails = (bootcampId, weekId, id) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: QUIZ_DETAILS_REQUEST
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
      `/api/quizzes/${bootcampId}/${weekId}/${id}`,
      config
    )

    dispatch({
      type: QUIZ_DETAILS_SUCCESS,
      payload: response.data.data
      // payload: console.log("payload: ", response.data),
    })
  } catch (error) {
    console.log(error.response.data.message)
    dispatch({
      type: QUIZ_DETAILS_FAIL,
      payload: error.response.data.message
    })
  }
}

export const createQuiz = (quizData, bootcampId, weekId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: QUIZ_CREATE_REQUEST
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
    const response = await axios.post(
      `/api/quizzes/${bootcampId}/${weekId}`,
      quizData,
      config
    )

    dispatch({
      type: QUIZ_CREATE_SUCCESS,
      //   payload: console.log("payload:", resconst response.data),
      payload: response.data
    })

    dispatch({
      type: QUIZ_CREATE_RESET
      // this is turnng back to empty {}, not using the ACTION
    })
  } catch (error) {
    console.log('error:', error.response)
    dispatch({
      type: QUIZ_CREATE_FAIL,
      //    payload: error.res
      payload: error.response.data.message
    })
  }
}

export const quizDelete = (bootcampId, weekId, id) => async (
  dispatch,
  getState
) => {
  try {
    const {
      userLogin: { userDetail }
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userDetail.token
      }
    }
    dispatch({
      type: QUIZ_DELETE_REQUEST
    })

    await axios.delete(`/api/quizzes/${bootcampId}/${weekId}/${id}`, config)

    dispatch({
      type: QUIZ_DELETE_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: QUIZ_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const updateQuiz = (bootcampId, weekId, id, quiz) => async (
  dispatch,
  getState
) => {
  try {
    const {
      userLogin: { userDetail }
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userDetail.token
      }
    }
    dispatch({
      type: QUIZ_UPDATE_REQUEST
    })

    await axios.put(`/api/quizzes/${bootcampId}/${weekId}/${id}`, quiz, config)

    dispatch({
      type: QUIZ_UPDATE_SUCCESS
    })
  } catch (error) {
    console.log(error.response.data)
    dispatch({
      type: QUIZ_UPDATE_FAIL,
      payload: error.response.data.message
    })
  }
}
