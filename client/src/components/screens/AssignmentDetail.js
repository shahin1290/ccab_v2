import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import download from 'downloadjs'

//importing const
import { ANSWER_CREATE_REST } from './../../redux/constences/answerConst'
//importing from action...>
import { getTaskDetails } from '../../redux/actions/taskAction'
import { createAnswer, getUserAnswer } from '../../redux/actions/answerAction'

// importing component
import Loader from '../layout/Loader'
import Message from '../layout/Message'

export default function AssignmentDetail({ match }) {
  const history = useHistory()

  const { bootcampId, id } = match.params

  // const array1 = [1, 2, 3, 4];
  // const reducer = (accumulator, currentValue) => accumulator + currentValue;

  // We need to verify the user is logged in
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

  const dispatch = useDispatch()
  const taskDetails = useSelector((state) => state.taskDetails)
  const { task: taskDetail, loading, error } = taskDetails

  const answerCreate = useSelector((state) => state.answerCreate)
  const {
    loading: AnswerLoding,
    error: AnswerError,
    success: createSuccess
  } = answerCreate
  //console.log("taskDetail", taskDetail);

  const OneAnswer = useSelector((state) => state.OneAnswer)
  const { loading: OneAnswerLoding, answer, error: OneAnswerError } = OneAnswer

  useEffect(() => {
    if (!userDetail) {
      history.push('/')
    } else if (createSuccess) {
     history.push('/profile')
      toast.success('Assignemnt has been sent', {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }

    dispatch(getUserAnswer(id))
    dispatch(getTaskDetails(bootcampId, id))
  }, [dispatch, id, match, createSuccess, history, userDetail])

  useEffect(() => {
    dispatch({ type: ANSWER_CREATE_REST })
  }, [dispatch])

  // State.................>
  const [err, setErr] = useState('')
  const [AssignemntLink, setAssignemntLink] = useState('')

  //form file lable state
  const [DocumentLable, setDocumentLable] = useState('zip file...')
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
    } else {
      clearFileInput(document.getElementById('zip-file'))
    }
  }

  const submitHanlder = (e) => {
    e.preventDefault()
    //console.log(AssignemntLink);

    if (File.name && AssignemntLink) {
      /*  console.log(AssignemntLink, ' - ', File) */
      var form_data = new FormData()
      form_data.append('myfile', File)
      form_data.append('AssignmentLink', AssignemntLink)

      dispatch(createAnswer(form_data, bootcampId, taskDetail.task._id))

      //clear the fields
      setFile({})
      setAssignemntLink('')
      setErr('')
      setDocumentLable('zip file...')
    } else {
      setErr('Please Fill In All The Fields')
    }
  }
  //........................................

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userDetail.token
    }
  }
  //download Assignment
  const DownloadAssignmentHandler = async (task) => {
    // dispatch(DownloadAssignemnt(task.task._id))
    const res = await fetch('/api/tasks/' + task._id + '/download', config)

    console.log(res)
    const blob = await res.blob()
    download(blob, task.projectName + '-Assignment')
  }

  const getDates = (date) => {
    const date1 = new Date(date)
    return (
      date1.getFullYear() + '-' + date1.getMonth() + 1 + '-' + date1.getDate()
    )
  }

  return (
    <>
      <section className="login-nav-section">
        <div className="auto-container"></div>
      </section>
      <Container style={{ marginBottom: '120px' }}>
        <h1 className="">Assignment Details</h1>
        {loading ? (
          <Loader />
        ) : taskDetail && taskDetail.task ? (
          <Row>
            <Col>
              <div className="p-3 container-fluid ">
                <div className="row">
                  <div className="col-sm ">
                    <h3 className="mb-2">{taskDetail.task.projectName}</h3>
                    <span className="mb-1 d-block">
                      {getDates(taskDetail.task.createdAt)}
                    </span>
                    <p>{taskDetail.task.description}</p>
                  </div>
                </div>

                <div className="row justify-content-between mt-4">
                  <div className="col-sm ">
                    <cite>Assignment by : {taskDetail.task.user.name}</cite>
                  </div>

                  <div className="col-sm ">
                    <a
                      href="#"
                      onClick={() => {
                        DownloadAssignmentHandler(taskDetail.task)
                      }}
                    >
                      <i className="">Download Assignemnt</i>
                    </a>
                  </div>
                </div>
                {/* <div className="row mt-3">
                  <div className="col-sm">
                    <Link to="/assignment">Go back to assignment</Link>
                  </div>
                </div> */}
              </div>
            </Col>
            {!answer.isSend ? (
              <Col lg={4} md={6} sm={12}>
                <Form onSubmit={submitHanlder}>
                  {err || AnswerError ? (
                    <Message>{err || AnswerError}</Message>
                  ) : null}

                  <Form.Group controlId="link">
                    <Form.Label>Github Link</Form.Label>
                    <Form.Control
                      type="text"
                      value={AssignemntLink}
                      placeholder="github.com"
                      onChange={(e) => {
                        setAssignemntLink(e.target.value)
                      }}
                    />
                  </Form.Group>
                  <Form.Label>Project Document</Form.Label>

                  <Form.File id="custom-file" custom>
                    <Form.File.Input
                      onChange={_FileSubmitHandler}
                      id="zip-file"
                    />
                    <Form.File.Label data-browse="Upload file">
                      {DocumentLable}
                    </Form.File.Label>
                  </Form.File>

                  <div className="py-3">
                    <Button
                      variant="dark"
                      type="submit"
                      block
                      onClick={submitHanlder}
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
                <div className="py-3">
                  <Link to="/profile">
                    <i className="fas fa-user"></i>
                    <span className="px-1">Go back to profile</span>
                  </Link>
                </div>
              </Col>
            ) : (
              <Col
                lg={4}
                md={6}
                sm={12}
                className="d-flex align-items-center  justify-content-center flex-column"
              >
                <div className="card text-center p-3 ">
                  <h5 className="text-info">Assignemnt Is Already Sent</h5>
                </div>
                <div className="py-3 align-self-center ">
                  <Link to="/profile">
                    <i className="fas fa-user"></i>
                    <span className="px-1">Go back to profile</span>
                  </Link>
                </div>
              </Col>
            )}
          </Row>
        ) : (
          ''
        )}
      </Container>
    </>
  )
}
