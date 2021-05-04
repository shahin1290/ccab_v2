import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Col, Row, Form } from 'react-bootstrap'
import Message from '../../layout/Message'
import { ToastContainer, toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
//************* importing form action ************/
import { getQuizAnswerList } from '../../../redux/actions/quizAnswerAction'
import { getQuizDetails } from '../../../redux/actions/quizAction'

import Loader from '../../layout/Loader'

export default function TaskDetailsScreen({ match }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const { id, weekId, bootcampId } = match.params
  // user must be logged in before!!!
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

  // gettign answers list for specific task
  const answerList = useSelector((state) => state.quizAnswerList)
  const { answers, loading, error } = answerList

  //getting specific task
  const quizDetails = useSelector((state) => state.quizDetails)
  const { quiz, loading: quizLoading, error: QuizError } = quizDetails

  useEffect(() => {
    if (userDetail && !userDetail.user_type === 'StudentUser') {
      history.push('/')
    } else {
      dispatch(getQuizDetails(bootcampId, weekId, id))
      dispatch(getQuizAnswerList(bootcampId, id))
    }
  }, [dispatch, userDetail, history, bootcampId, weekId, id])

  const getDates = (date) => {
    const date1 = new Date(date)
    return (
      date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate()
    )
  }

  return (
    <div className="py-5">
      <h1>Quiz Details</h1>
      {quizLoading ? (
        <Loader />
      ) : QuizError ? (
        <Message>{QuizError}</Message>
      ) : quiz.name ? (
        <div className="p-3 container-fluid ">
          <div className="row">
            <div className="col-sm ">
              <h3 className="mb-2">{quiz.name}</h3>
              <p>{quiz.description}</p>
              <span className="mb-1 d-block">{getDates(quiz.createdAt)}</span>
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
            <th>status</th>
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

                  {answer.status !== 'Not Sent' ? (
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

                  <td>
                    <Row>
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
