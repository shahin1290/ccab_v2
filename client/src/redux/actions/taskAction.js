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
  TASK_PASSED_UPDATE_REQUEST,
  TASK_PASSED_UPDATE_SUCCESS,
  TASK_PASSED_UPDATE_FAIL,
  TASK_NO_PASSED_UPDATE_REQUEST,
  TASK_NO_PASSED_UPDATE_SUCCESS,
  TASK_NO_PASSED_UPDATE_FAIL,
  TASK_MY_LIST_REQUEST,
  TASK_MY_LIST_SUCCSESS,
  TASK_MY_LIST_FAIL
} from '../constences/taskConst'

import axios from 'axios'

export const getTaskList = (bootcampId) => async (dispatch, getState) => {
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

    const response = await axios.get('/api/tasks/' + bootcampId, config)
    dispatch({
      type: TASK_LIST_REQUEST
    })

    dispatch({
      type: TASK_LIST_SUCCESS,
      payload: response.data.data
      // payload: console.log("payload: ",response.data)
    })
  } catch (error) {
    dispatch({
      type: TASK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getTaskDetails = (bootcampId, id) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: TASK_DETAILS_REQUEST
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

    const response = await axios.get(`/api/tasks/${bootcampId}/${id}`, config)

    dispatch({
      type: TASK_DETAILS_SUCCESS,
      payload: response.data
      // payload: console.log("payload: ", response.data),
    })
  } catch (error) {
    dispatch({
      type: TASK_DETAILS_FAIL,
      payload: error.response.data.message
    })
  }
}

export const createTask = (task, bootcampId, weekId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: TASK_ADD_REQUEST
    })

    // Descruct from getState()
    const {
      userLogin: { userDetail }
    } = getState()
    const config = { headers: { Authorization: 'Bearer ' + userDetail.token } }

    const response = await axios.post(
      `/api/tasks/${bootcampId}/${weekId}`,
      task,
      config
    )

    console.log('create:', response)

    dispatch({
      type: TASK_ADD_SUCCESS,
      //   payload: console.log("payload:", resconst response.data),
      payload: response.data
    })

    dispatch({
      type: TASK_ADD_REST
      // this is turnng back to empty {}, not using the ACTION
    })
  } catch (error) {
    dispatch({
      type: TASK_ADD_FAIL,
      //    payload: error.res
      payload: error.response.data.message
    })
  }
}

export const taskDelete = (bootcampId, id) => async (
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
      type: TASK_DELETE_REQUEST
    })

    await axios.delete(`/api/tasks/${bootcampId}/${id}`, config)

    dispatch({
      type: TASK_DELETE_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: TASK_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const taskChecked = (task) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_CHECKED_UPDATE_REQUEST
    })

    const {
      userLogin: { userDetail }
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json', // we do not need this
        // becouse, we are sending GET requset!
        Authorization: 'Bearer ' + userDetail.token
      }
    }

    const response = await axios.put(
      '/api/tasks/' + task._id + '/checked',
      {},
      config
    )

    // console.log("res: ", res);
    dispatch({
      type: TASK_CHECKED_UPDATE_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: TASK_CHECKED_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const taskAsPassed = (task) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_PASSED_UPDATE_REQUEST
    })

    const {
      userLogin: { userDetail }
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json', // we do not need this
        // becouse, we are sending GET requset!
        Authorization: 'Bearer ' + userDetail.token
      }
    }

    const response = await axios.put(
      '/api/tasks/' + task._id + '/passed',
      {},
      config
    )

    // console.log("res: ", res);
    dispatch({
      type: TASK_PASSED_UPDATE_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: TASK_PASSED_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const taskAsNotPassed = (task) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_NO_PASSED_UPDATE_REQUEST
    })

    const {
      userLogin: { userDetail }
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json', // we do not need this
        // becouse, we are sending GET requset!
        Authorization: 'Bearer ' + userDetail.token
      }
    }

    const response = await axios.put(
      '/api/tasks/' + task._id + '/nopassed',
      {},
      config
    )

    // console.log("res: ", res);
    dispatch({
      type: TASK_NO_PASSED_UPDATE_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: TASK_NO_PASSED_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getMyTaskList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_MY_LIST_REQUEST
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
    const response = await axios.get('/api/tasks/mytasklist', config)

    dispatch({
      type: TASK_MY_LIST_SUCCSESS,
      // payload: console.log("payload:", res.data),
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: TASK_MY_LIST_FAIL,
      //    payload: error.res
      payload: error.response.data.message
    })
  }
}
