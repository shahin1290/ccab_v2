import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Message from '../../layout/Message'
import { TASK_ADD_REST } from '../../../redux/constences/taskConst'
import { createTask, getTaskList } from '../../../redux/actions/taskAction'
import Loader from '../../layout/Loader'
import download from 'downloadjs'

export default function TaskUploadScreen({ match }) {
  const { bootcampId, weekId } = match.params
  const taskCreate = useSelector((state) => state.taskCreate)
  const { success: createSuccess, task, error: CreateTaskError } = taskCreate

  const [succ, setSucc] = useState(createSuccess)

  // We need to verify the user is logged in
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

  const dispatch = useDispatch()
  const history = useHistory()
  const taskList = useSelector((state) => state.taskList)
  const { tasks, loading, error } = taskList

  useEffect(() => {
    if (!userDetail) {
      history.push('/')
    } else if (createSuccess) {
      dispatch({ type: TASK_ADD_REST })

      toast.success(task.data.projectName + ', successfully created', {
        position: toast.POSITION.BOTTOM_RIGHT
      })

      setSucc(false)
    }
    dispatch(getTaskList(bootcampId))
  }, [dispatch, userDetail, createSuccess, history])

  // Clear Error message
  useEffect(() => {
    dispatch({ type: TASK_ADD_REST })
  }, [dispatch])

  const [AssignmentName, setAssignmentName] = useState('')
  const [description, setDescription] = useState('')
  const [err, setErr] = useState('')
  //form file lable state
  const [DocumentLable, setDocumentLable] = useState('PDF file...')
  // file holder
  const [File, setFile] = useState([])

  // Functions......................>
  function clearFileInput(ctrl) {
    try {
      ctrl.value = null
    } catch (ex) {}
    if (ctrl.value) {
      ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl)
    }
  }

  const _FileSubmitHandler = (e) => {
    if (e.target.files.length) {
      console.log(e.target.files[0])
      setDocumentLable(e.target.files[0].name)
      setFile(e.target.files[0])
      setErr('')
    }
    clearFileInput(document.getElementById('pdf-file'))
  }

  const submitHanlder = (e) => {
    e.preventDefault()

    if (File.name && AssignmentName && description) {
      console.log(AssignmentName, ' - ', File, '-', description)

      var form_data = new FormData()
      form_data.append('myfile', File)
      form_data.append('AssignmentName', AssignmentName)
      form_data.append('description', description)

      dispatch(createTask(form_data, bootcampId, weekId))

      //clear the fields
      setFile({})
      setAssignmentName('')
      setDescription('')
      setErr('')
      setDocumentLable('PDF file...')
      clearFileInput(document.getElementById('pdf-file'))
    } else {
      setErr('Please Fill In All The Fields')
    }

    // setAssignmentLink("");
  }

  //download task
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userDetail.token
    }
  }

  const DownloadAssignmentHandler = async (task) => {
    const res = await fetch('/api/tasks/' + task._id + '/download', config)
    const blob = await res.blob()
    download(blob, task.projectName + '-Assignment')
  }

  return (
    <div className="py-5">
      {console.log(tasks)}
      <h1>Task uploading</h1>

      <Row>
        <Col lg={3} md={6} sm={12}>
          <Form onSubmit={submitHanlder}>
            {err || CreateTaskError ? (
              <Message>{err || CreateTaskError}</Message>
            ) : null}
            <Form.Group controlId="title">
              <Form.Label>Assignment Name</Form.Label>
              <Form.Control
                type="text"
                value={AssignmentName}
                onChange={(e) => {
                  setAssignmentName(e.target.value)
                }}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Assignment Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Assignment Document</Form.Label>
              <Form.File id="custom-file" custom>
                <Form.File.Input onChange={_FileSubmitHandler} id="pdf-file" />
                <Form.File.Label data-browse="Upload File">
                  {DocumentLable}
                </Form.File.Label>
              </Form.File>
            </Form.Group>

            <Button variant="dark" type="submit" block>
              Submit
            </Button>
          </Form>
        </Col>
        <Col lg={8} md={6} sm={12}>
          <h4 className="py-2">Latest Task</h4>

          <Table striped bordered hover responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Assignment Name</th>
                <th>Date and Time</th>
                <th>Assignment</th>
              </tr>
            </thead>

            <tbody>
              {loading && <Loader />}
              {error && <Message>{error}</Message>}
              {tasks && tasks.length
                ? tasks.map((task) => (
                    <tr key={task._id}>
                      <th>1</th>
                      <td>{task.projectName}</td>
                      <td>
                        {task.createdAt.split('T')[0] +
                          ' : ' +
                          task.createdAt.split('T')[1].split('.')[0]}
                      </td>

                      <td>
                        <a
                          href="#"
                          onClick={() => {
                            DownloadAssignmentHandler(task)
                          }}
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                  ))[tasks.length - 1]
                : null}
            </tbody>
          </Table>

          <div className="py-3">
            <Link
              to={`/mentor-task-list/${bootcampId}`}
              style={{ color: 'green' }}
            >
              {' '}
              See your uploading history
            </Link>
          </div>
        </Col>
      </Row>

      {<ToastContainer />}
    </div>
  )
}
