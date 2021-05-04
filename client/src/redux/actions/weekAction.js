import {
  WEEK_LIST_REQUEST,
  WEEK_LIST_SUCCESS,
  WEEK_LIST_FAIL,
  WEEK_UPDATE_REQUEST,
  WEEK_UPDATE_SUCCESS,
  WEEK_UPDATE_FAIL
} from '../constences/weekConst'

import axios from 'axios'

export const getWeekList = (id) => async (dispatch, getState) => {
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
    const response = await axios.get(`/api/weeks/` + id, config)

    dispatch({
      type: WEEK_LIST_REQUEST
    })

    dispatch({
      type: WEEK_LIST_SUCCESS,
      payload: response.data.data
      // payload: console.log("payload: ",response.data)
    })
  } catch (error) {
    dispatch({
      type: WEEK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

// update course
export const updateWeek = (bootcampId) => async (dispatch, getState) => {
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
      type: WEEK_UPDATE_REQUEST
    })

    await axios.put('/api/weeks/' + bootcampId, config)

    dispatch({
      type: WEEK_UPDATE_SUCCESS
    })
  } catch (error) {
    console.log(error.response.data)
    dispatch({
      type: WEEK_UPDATE_FAIL,
      payload: error.response.data.message
    })
  }
}
