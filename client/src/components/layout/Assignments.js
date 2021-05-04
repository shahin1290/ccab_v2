import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import download from 'downloadjs'
import Message from '../layout/Message'
import { Link, useHistory } from 'react-router-dom'
import Loader from '../layout/Loader'
import { getMyAnswerList } from '../../redux/actions/answerAction'
import { getCourseList } from '../../redux/actions/courseAction'
import { getMyTaskList } from '../../redux/actions/taskAction'
import { getTaskList } from '../../redux/actions/taskAction'

export default function Assignments() {
  const dispatch = useDispatch()
  const history = useHistory()

  //Get Student's Bootcamps
  const { userDetail } = useSelector((state) => state.userLogin)

  const {
    courseList,
    loading: bootcampLoading,
    error: bootcampError
  } = useSelector((state) => state.courseList)

  useEffect(() => {
    dispatch(getCourseList())
  }, [dispatch])

  // state from isValid reducer
  const isTokenValid = useSelector((state) => state.isTokenValid)
  const {
    error: ValidError,
    loading: ValidLoading,
    success: TokenSuccess
  } = isTokenValid

  // updating process
  const userUpdate = useSelector((state) => state.userUpdate)
  const { updateSuccess, error: UpdateError } = userUpdate

  //get task list
  const taskListMy = useSelector((state) => state.taskListMy)
  const { myTasks, loading: myTasksLoading, error: myTasksError } = taskListMy

  // getting myAnswerList

  const answerMyList = useSelector((state) => state.answerMyList)
  const {
    myanswers,
    loading: answerListLoading,
    error: answerListError,
    success: answerListSuccess
  } = answerMyList

  const taskStatus = (taskId) => {
    if (myanswers && myanswers.length > 0) {
      const foundAnswer = myanswers.find((ans) => ans.task._id === taskId)
      return foundAnswer
    }
  }

  useEffect(() => {
    if (userDetail.name && userDetail.user_type === 'StudentUser') {
      dispatch(getMyTaskList())
      dispatch(getMyAnswerList())
    }

    if (
      userDetail.name &&
      (userDetail.user_type === 'MentorUser' ||
        userDetail.user_type === 'AdminUser')
    ) {
      dispatch(getTaskList())
    }
  }, [
    dispatch,
    userDetail,
    ValidLoading,
    updateSuccess,
    TokenSuccess,
    answerListSuccess
  ])

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userDetail.token
    }
  }

  const DownloadAssignmentHandler = async (task) => {
    // dispatch(DownloadAssignemnt(task.task._id))
    const res = await fetch('/api/tasks/' + task._id + '/download', config)
    const blob = await res.blob()
    download(blob, task.projectName + '-Assignment')
  }

  const DownloadAnswerHandler = async (answer) => {
    // dispatch(DownloadAssignemnt(task.task._id))
    const res = await fetch('/api/answers/' + answer._id + '/download', config)
    const blob = await res.blob()
    download(blob, answer.task.projectName + '-' + userDetail.name + '-Answer')
  }

  const getDate = (date) => {
    let d = new Date(date)
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  }

  if (!myTasks > 0) {
    return null
  }

  return (
    <>
      <div style={{ paddingTop: '20px' }} className="manage-cource-section">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title">
            <div className="clearfix">
              <div className="pull-left">
                <h4>My Assignments</h4>
              </div>
            </div>
          </div>
          <div className="inner-container">
            <div className="container-content">
              {myTasksLoading ? (
                <Loader />
              ) : myTasksError ? (
                <Message variant="danger">{myTasksError}</Message>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Assignment Name</th>
                      <th>Bootcamp</th>
                      <th>Assignment</th>
                      <th>Created At</th>
                      {userDetail.user_type !== 'MentorUser' &&
                        userDetail.user_type !== 'AdminUser' && (
                          <>
                            <th>Status</th>
                            <th>Submit</th>
                          </>
                        )}
                    </tr>
                  </thead>
                  <tbody>
                    {myTasks.length ? (
                      myTasks.map((task, index) => (
                        <tr key={task._id}>
                          <td>{index + 1}</td>
                          <td>{task.projectName}</td>
                          {/* status */}
                          {/* date */}
                          {/* <td>{task.description}</td> */}
                          <td>{task.bootcamp.name}</td>
                          <td>
                            <Link
                              onClick={() => DownloadAssignmentHandler(task)}
                            >
                              <i class="fas fa-file-download"></i> DOWNLOAD
                            </Link>
                          </td>

                          <td>{getDate(task.createdAt)}</td>

                          {userDetail.user_type !== 'MentorUser' &&
                            userDetail.user_type !== 'AdminUser' && (
                              <>
                                {answerListLoading ? (
                                  <Loader />
                                ) : answerListError ? (
                                  <Message variant="danger">
                                    {answerListError}
                                  </Message>
                                ) : (
                                  <>
                                    {taskStatus(task._id) &&
                                    taskStatus(task._id).status ===
                                      'Not Sent' ? (
                                      <td style={{ color: 'red' }}>
                                        {taskStatus(task._id).status}
                                      </td>
                                    ) : taskStatus(task._id).status ===
                                      'Pending' ? (
                                      <td
                                        style={{
                                          color: '#ffc40c'
                                          
                                        }}
                                      >
                                        {taskStatus(task._id).status}
                                      </td>
                                    ) : taskStatus(task._id).status ===
                                      'Failed' ? (
                                      <td
                                        style={{
                                          color: 'red'
                                        }}
                                      >
                                        {taskStatus(task._id).status}
                                      </td>
                                    ) : taskStatus(task._id).status ===
                                      'Sent' ? (
                                      <td style={{ color: '#171717' }}>
                                        {taskStatus(task._id).status}
                                      </td>
                                    ) : (
                                      <td
                                        style={{
                                          color: '#1aff1a'
                                        }}
                                      >
                                        {taskStatus(task._id).status}
                                      </td>
                                    )}
                                  </>
                                )}

                                <td>
                                  {taskStatus(task._id) &&
                                  taskStatus(task._id).status !== 'Not Sent' ? (
                                    'Submitted'
                                  ) : (
                                    <Link
                                      to={`/assignment-details/${task.bootcamp._id}/${task._id}`}
                                      style={{ color: '#3366BB' }}
                                    >
                                      Submit Assignment
                                    </Link>
                                  )}
                                </td>
                              </>
                            )}
                        </tr>
                      ))
                    ) : (
                      <p className="pl-4 py-2 mt-4 text-dark bg-warning ">
                        You Don't have Any Assignments yet !
                      </p>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
