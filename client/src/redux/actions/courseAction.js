import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
  COURSE_DELETE_REQUEST,
  COURSE_DELETE_SUCCESS,
  COURSE_DELETE_FAIL,
  COURSE_UPDATE_REQUEST,
  COURSE_UPDATE_SUCCESS,
  COURSE_UPDATE_FAIL,
  COURSE_ADD_REQUEST,
  COURSE_ADD_SUCCESS,
  COURSE_ADD_FAIL,
  ADMIN_COURSE_LIST_REQUEST,
  ADMIN_COURSE_LIST_SUCCESS,
  ADMIN_COURSE_LIST_FAIL
} from '../constences/courseConst'

import axios from 'axios'

export const getCourseList = (pageNumber = '') => async (
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
    const response = await axios.get(
      `/api/bootcamp?pageNumber=${pageNumber}`,
      config
    )

    dispatch({
      type: COURSE_LIST_REQUEST
    })

    dispatch({
      type: COURSE_LIST_SUCCESS,
      payload: response.data.data
      // payload: console.log("payload: ",response.data)
    })
  } catch (error) {
    dispatch({
      type: COURSE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getCourseListForAdmin = (pageNumber = '') => async (
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
    const response = await axios.get(
      `/api/bootcamp/mange?pageNumber=${pageNumber}`,
      config
    )

    dispatch({
      type: ADMIN_COURSE_LIST_REQUEST
    })

    dispatch({
      type: ADMIN_COURSE_LIST_SUCCESS,
      payload: response.data.data
      // payload: console.log("payload: ",response.data)
    })
  } catch (error) {
    dispatch({
      type: ADMIN_COURSE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getCourseDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_DETAILS_REQUEST
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

    const response = await axios.get('/api/bootcamp/' + id, config)

    dispatch({
      type: COURSE_DETAILS_SUCCESS,
      payload: response.data.data
      // payload: console.log("payload: ", response.data),
    })
  } catch (error) {
    dispatch({
      type: COURSE_DETAILS_FAIL,
      payload: error.response.data.message
    })
  }
}

export const createCourse = (course) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_ADD_REQUEST
    })

    // Descruct from getState()
    const {
      userLogin: { userDetail }
    } = getState()
    const config = { headers: { Authorization: 'Bearer ' + userDetail.token } }

    const response = await axios.post('/api/bootcamp', course, config)

    // console.log("response:", response)

    dispatch({
      type: COURSE_ADD_SUCCESS,
      //   payload: console.log("payload:", resconst response.data),
      payload: response.data
    })
  } catch (error) {
    console.log('error:', error)
    dispatch({
      type: COURSE_ADD_FAIL,
      //    payload: error.res
      payload: error.response.data.message
    })
  }
}

export const deleteCourse = (id) => async (dispatch, getState) => {
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
      type: COURSE_DELETE_REQUEST
    })

    await axios.delete('/api/bootcamp/' + id, config)

    dispatch({
      type: COURSE_DELETE_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: COURSE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

// update course
export const updateCourse = (course, id) => async (dispatch, getState) => {
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
      type: COURSE_UPDATE_REQUEST
    })
    //console.log(course);
    await axios.put('/api/bootcamp/'+id,course, config)

    dispatch({
      type: COURSE_UPDATE_SUCCESS
    })
  } catch (error) {
   // console.log(error.response.data);
    dispatch({
      type: COURSE_UPDATE_FAIL,
      payload: error.response.data.message
    })
  }
}
