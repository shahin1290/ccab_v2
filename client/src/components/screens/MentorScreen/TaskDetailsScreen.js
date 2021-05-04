import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Col, Row, Form } from 'react-bootstrap'
import Message from '../../layout/Message'
import { ToastContainer, toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import download from 'downloadjs'
//************* importing form action ************/
import {
  getTaskAnswerList,
  updateAnswerStatus
} from '../../../redux/actions/answerAction'
import { getTaskDetails } from '../../../redux/actions/taskAction'

import Loader from '../../layout/Loader'
import { ANSWER_UPDATE_STATUS_REST } from '../../../redux/constences/answerConst'

export default function TaskDetailsScreen({ match }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const { id, bootcampId } = match.params
  // user must be logged in before!!!
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

  // gettign answers list for specific task
  const answerList = useSelector((state) => state.listAnswer)
  const { answers, loading, error } = answerList

  //getting specific task
  const taskDetails = useSelector((state) => state.taskDetails)
  const { task, loading: taskLoading, error: TaskError } = taskDetails

  // Update Check mark
  const taskCheck = useSelector((state) => state.taskCheck)
  const {
    loading: updateLoading,
    error: updateError,
    updateSuccess
  } = taskCheck

  // Update Pass mark
  const taskPassed = useSelector((state) => state.taskPassed)
  const {
    loading: passedLoading,
    error: passedError,
    updateSuccess: passedSuccess
  } = taskPassed

  // Update Not Passed  mark

  const AnswerStatus = useSelector((state) => state.AnswerStatus)
  const {
    loading: StatusLoading,
    error: StatusError,
    success: StatusSuccess
  } = AnswerStatus

  useEffect(() => {
    if (userDetail && !userDetail.user_type === 'StudentUser') {
      history.push('/')
    } else if (StatusSuccess) {
      dispatch(getTaskAnswerList(bootcampId, id))
      dispatch({ type: ANSWER_UPDATE_STATUS_REST })
    } else {
      dispatch(getTaskDetails(bootcampId, id))
      dispatch(getTaskAnswerList(bootcampId, id))
    }
  }, [dispatch, userDetail, history, StatusSuccess])

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userDetail.token
    }
  }
console.log(answers);
  const DownloadAssignmentHandler = async () => {
    // dispatch(DownloadAssignemnt(task.task._id))
    const res = await fetch('/api/tasks/' + task.task._id + '/download', config)
    const blob = await res.blob()
    download(blob, task.task.projectName + '-Assignment')
  }

  //download user answers
  const DownloadAnswerHandler = async (answer) => {
    const res = await fetch('/api/answers/' + answer._id + '/download', config)
    const blob = await res.blob()
    download(blob, answer.task.projectName + '-' + answer.user.name + '-Answer')
    dispatch(getTaskAnswerList(bootcampId, id))
  }

  // const deleteHandler = (id) => {
  //   dispatch(taskDelete(id));
  //   toast.info("Task has been deleted", {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //   });
  // };

  // Splite the Date
  // 2021-02-10T11:22:19.511Z
  // const crAt = transactions.createdAt;

  // const onlyDate = crAt.split("T");
  // const splitZ = onlyDate[1].split(".");
  // console.log(splitZ[0]);

  // viewed update

  // const taskCheckHandler = () => {
  //   dispatch(taskChecked(task));

  //   toast.info("Task has been viewed", {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //   });
  // };

  {
    /*  
Did Good
Did Not Bad
Failed
*/
  }

  const _handleStatusOptions = (e, answer) => {
    let textMessage = ''
    let value = ''
    switch (e.target.value) {
      case '1':
        textMessage = 'Did Excellent'
        value = 'Excellent'
        break
      case '2':
        textMessage = 'Did Good'
        value = 'Good'
        break
      case '3':
        textMessage = 'Did Not Bad'
        value = 'Not Bad'
        break
      case '4':
        textMessage = 'Failed'
        value = 'Failed'
        break
      default:
        break
    }
    if (textMessage && value) {
      dispatch(
        updateAnswerStatus(bootcampId, id, answer._id, { status: value })
      )

      toast.info(answer.user.name + ' ' + textMessage, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  }

  const getDates = (date) => {
    const date1 = new Date(date)
    return (
      date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate()
    )
  }

  return (
    <div className="py-5">
      <h1>Task Details</h1>
      {taskLoading ? (
        <Loader />
      ) : TaskError ? (
        <Message>{TaskError}</Message>
      ) : task.success ? (
        <div className="p-3 container-fluid ">
          <div className="row">
            <div className="col-sm ">
              <h3 className="mb-2">{task.task.projectName}</h3>
              <span className="mb-1 d-block">
                {getDates(task.task.createdAt)}
              </span>
              <p>{task.task.description}</p>
            </div>
          </div>

          <div className="row d-flex justify-content-between">
            <div className="col-sm-3 ">
              <cite>Assignment by {task.task.user.name}</cite>
            </div>

            <div className="col-sm-4 mt-3 ">
              <button
                type="button"
                className="float-right btn btn-outline-dark btn-sm"
                onClick={DownloadAssignmentHandler}
              >
                <i className="">Download</i>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <Table striped bordered hover size="sm" mt-2>
        <thead>
          <tr>
            <th>Nr</th>
            <th>Student Name</th>
            <th>Created At</th>

            <th>grade</th>
            <th>status</th>
            <th>Answer</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error}</Message>
          ) : answers.length ? (
            answers
              .map((answer) => (
                <tr key={answer._id}>
                  <td>{answers.indexOf(answer) + 1}</td>
                  <td>{answer.user.name}</td>

                  {/* task Control */}

                  {/* //answer.status */}

                  {answer.isSend ? (
                    <>
                      {/* created at  */}
                      <td>
                        {getDates(answer.createdAt) +
                          ' : ' +
                          answer.createdAt.split('T')[1].split('.')[0]}
                      </td>
                    </>
                  ) : (
                    <>
                      {' '}
                      <td>Not Available</td>
                    </>
                  )}

                  {passedLoading && <Loader />}
                  {passedError && <Message>{passedError}</Message>}
                  {answer.isSend && answer.isViewed ? (
                    <td>
                      <td>
                        <Row>
                          <Col lg={10}>
                            <Form.Control
                              as="select"
                              custom
                              onChange={(e) => {
                                //dispatch(taskAsPassed(task));
                                _handleStatusOptions(e, answer)
                              }}
                            >
                              <option>Choose Option</option>
                              <option value="1">Excellent</option>
                              <option value="2">Good</option>
                              <option value="3">Not Bad</option>
                              <option value="4">Failed</option>
                            </Form.Control>
                          </Col>
                        </Row>
                      </td>
                    </td>
                  ) : (
                    <td>Not Available</td>
                  )}

                  {updateLoading && <Loader />}
                  {updateError && <Message>{updateError}</Message>}

                  <td>
                    <Row>
                      <Col>
                        {answer.isViewed ? (
                          <i
                            className="fas fa-eye eyeIcon"
                            style={{ color: 'green', pointer: 'auto' }}
                          ></i>
                        ) : (
                          <i
                            className="far fa-eye-slash eyeIcon"
                            style={{ color: '#adb5bd' }}
                          ></i>
                        )}
                      </Col>
                      <Col class="statusCol-Admin">
                        {/* answer status */}
                        {answer.status === 'Not Sent' ? (
                          <td style={{ color: 'red' }}>{answer.status}</td>
                        ) : answer.status === 'Pending' ? (
                          <td
                            style={{
                              backgroundColor: 'yellow',
                              color: '#171717'
                            }}
                          >
                            {answer.status}
                          </td>
                        ) : answer.status === 'Failed' ? (
                          <td
                            style={{
                              backgroundColor: 'red',
                              color: '#171717'
                            }}
                          >
                            {answer.status}
                          </td>
                        ) : answer.status === 'Sent' ? (
                          <td style={{ color: '#171717' }}>{answer.status}</td>
                        ) : (
                          <td
                            style={{
                              backgroundColor: '#1aff1a',
                              color: '#171717'
                            }}
                          >
                            {answer.status}
                          </td>
                        )}
                      </Col>
                    </Row>
                  </td>

                  {/* {delError && <Message>{delError}</Message>} */}
                  {/* <td>
                    <i
                      className="fas fa-trash-restore"
                      onClick={() => {
                        deleteHandler(answer._id);
                      }}
                    ></i>
                  </td> */}

                  <td>{answer.status === 'Sent'?
                           <button
                      onClick={() => {
                        DownloadAnswerHandler(answer)
                      }}
                    >
                      Download
                    </button>
                :'Not Available'
                }
           
                  </td>
                </tr>
              ))
              .reverse()
          ) : null}
        </tbody>
      </Table>
      <ToastContainer />
    </div>
  )
}
