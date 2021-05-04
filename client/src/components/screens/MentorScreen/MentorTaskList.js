import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import download from 'downloadjs'
import { Table, Col, Row, Modal, Button } from 'react-bootstrap'
import Message from '../../layout/Message'
import { ToastContainer, toast } from 'react-toastify'
import { getTaskList, taskDelete } from '../../../redux/actions/taskAction'
import { useHistory, Link } from 'react-router-dom'
import Loader from '../../layout/Loader'
import {
  TASK_CHECKED_UPDATE_RESET,
  TASK_PASSED_UPDATE_RESET
} from '../../../redux/constences/taskConst'

export default function TaskListScreen({ match }) {
  const dispatch = useDispatch()
  const history = useHistory()

  // user must be logged in before!!!
  const { userDetail } = useSelector((state) => state.userLogin)
  const { tasks, loading, error } = useSelector((state) => state.taskList)

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

  const taskNotPassed = useSelector((state) => state.taskNotPassed)
  const {
    loading: notPassedLoading,
    error: notPassedError,
    updateSuccess: notPassedSuccess
  } = taskNotPassed

  // Delete transaction

  const deleteTransaction = useSelector((state) => state.taskDelete)
  const { successDelete, error: delError } = deleteTransaction

  const [delSucc, setDelSucc] = useState(successDelete)

  useEffect(() => {
    if (!userDetail) {
      history.push('/')
    } else if (successDelete) {
      dispatch(getTaskList(match.params.bootcampId))
      setDelSucc(false)
    } else if (updateSuccess) {
      dispatch(getTaskList(match.params.bootcampId))
      dispatch({
        type: TASK_CHECKED_UPDATE_RESET
      })
    } else if (passedSuccess) {
      dispatch(getTaskList(match.params.bootcampId))
      dispatch({
        type: TASK_PASSED_UPDATE_RESET
      })
    } else {
      dispatch(getTaskList(match.params.bootcampId))
    }
  }, [
    dispatch,
    userDetail,
    history,
    successDelete,
    updateSuccess,
    passedSuccess
  ])

  const deleteHandler = (id) => {
    dispatch(taskDelete(match.params.bootcampId, id))
    toast.info('Task has been deleted', {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }

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

  // modal

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [clickTaskDelete, setClickTaskDelete] = useState('')

  if (!tasks > 0) {
    return null
  }

  return (
    <div style={{ margin: '100px 0' }}>
      <h1>Tasks</h1>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>Nr</th>
            <th>Assignment Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>File</th>
            <th>delete</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error}</Message>
          ) : tasks.length > 0 ? (
            tasks
              .map((task) => (
                <tr key={task._id}>
                  <td>{tasks.indexOf(task) + 1}</td>
                  <td>
                    <Link  className="text-info" to={`/task-details/${task.bootcamp}/${task._id}`}>
                      {task.projectName}
                    </Link>
                  </td>
                  <td>{task.description.substring(0, 20)}</td>
                  <td>
                    {task.createdAt.split('T')[0] +
                      ' : ' +
                      task.createdAt.split('T')[1].split('.')[0]}
                  </td>

                  {passedLoading && <Loader />}
                  {passedError && <Message>{passedError}</Message>}
                  <td>
                    <Link
                      onClick={() => {
                        DownloadAssignmentHandler(task)
                      }}
                    >
                      Download
                    </Link>
                  </td>
                  {updateLoading && <Loader />}
                  {updateError && <Message>{updateError}</Message>}

                  {delError && <Message>{delError}</Message>}
                  <td>
                    <i
                      className="fas fa-trash-restore"
                      onClick={() => {
                        setClickTaskDelete(task)
                        handleShow()
                      }}
                    ></i>

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Deleting Task</Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ color: 'red' }}>
                        Are you sure to delete {clickTaskDelete.projectName} ?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => {
                            deleteHandler(clickTaskDelete._id)

                            setShow(false)
                          }}
                        >
                          Ok
                        </Button>
                      </Modal.Footer>
                    </Modal>
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

//  <td>{task.description.substring(1, 5)}</td>;
