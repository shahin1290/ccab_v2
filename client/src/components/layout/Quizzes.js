import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../layout/Message'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import { getMyQuizAnswerList } from '../../redux/actions/quizAnswerAction'
import { getCourseList } from '../../redux/actions/courseAction'
import { getMyQuizList } from '../../redux/actions/quizAction'
import { getDate } from '../../util/getDate'

export default function Quizzes() {
  const dispatch = useDispatch()

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

  const getBootcampsForStudent = () =>
    courseList.filter((course) =>
      course.students.some((student) => student._id === userDetail._id)
    )

  // state from isValid reducer
  const isTokenValid = useSelector((state) => state.isTokenValid)
  const {
    error: ValidError,
    loading: ValidLoading,
    success: TokenSuccess
  } = isTokenValid

  const [loginSucc, setLoginSucc] = useState(TokenSuccess)
  // Getting user Details
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, user, error } = userDetails

  // updating process
  const userUpdate = useSelector((state) => state.userUpdate)
  const { updateSuccess, error: UpdateError } = userUpdate

  //get quiz list list
  const { myQuizList, loading: quizLoading, error: quizError } = useSelector(
    (state) => state.myQuizList
  )

  // getting myAnswerList

  const quizAnswerMyList = useSelector((state) => state.quizAnswerMyList)
  const {
    myQuizAnswers,
    loading: answerListLoading,
    error: answerListError,
    success: answerListSuccess
  } = quizAnswerMyList

  const quizStatus = (quizId) => {
    if (answerListSuccess && myQuizAnswers.length) {
      const foundAnswer = myQuizAnswers.find((ans) => ans.quiz === quizId)
      return foundAnswer
    }
  }

  useEffect(() => {
    if (userDetail.name && userDetail.user_type === 'StudentUser') {
      dispatch(getMyQuizList())

      dispatch(getMyQuizAnswerList())
    }
  }, [
    dispatch,
    userDetail,
    ValidLoading,
    updateSuccess,
    TokenSuccess,
    answerListSuccess
  ])

  return (
    <>
      <div style={{ paddingTop: '20px' }} className="manage-cource-section">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title">
            <div className="clearfix">
              <div className="pull-left">
                <h4>My Quizzes</h4>
              </div>
            </div>
          </div>
          <div className="inner-container">
            <div className="container-content">
              {quizLoading ? (
                <Loader />
              ) : quizError ? (
                <Message variant="danger">{quizError}</Message>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Quiz Name</th>
                      <th>Bootcamp</th>
                      <th>Created At</th>
                      {userDetail.user_type !== 'MentorUser' &&
                      userDetail.user_type !== 'AdminUser' ? (
                        <>
                          <th>Link</th>
                          <th>Result</th>
                          <th>Answer</th>
                        </>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {myQuizList.length ? (
                      myQuizList.map((quiz, index) => (
                        <tr key={quiz._id}>
                          <td>{index + 1}</td>
                          <td>{quiz.name}</td>
                          <td>{quiz.bootcamp.name}</td>
                          <td>{getDate(quiz.createdAt)}</td>

                          {userDetail.user_type !== 'MentorUser' &&
                            userDetail.user_type !== 'AdminUser' && (
                              <>
                                <td>
                                  {quizStatus(quiz._id) &&
                                  quizStatus(quiz._id).status === 'Not Sent' ? (
                                    <Link
                                      to={`/quiz/${quiz.bootcamp._id}/${quiz.week}/${quiz._id}`}
                                      style={{
                                        color: '#3366BB'
                                      }}
                                    >
                                      Take the quiz
                                    </Link>
                                  ) : (
                                    <div>Submitted</div>
                                  )}
                                </td>

                                {quizStatus(quiz._id) ? (
                                  quizStatus(quiz._id).status === 'Not Sent' ? (
                                    <td style={{ color: 'red' }}>
                                      {quizStatus(quiz._id).status}
                                    </td>
                                  ) : quizStatus(quiz._id).status ===
                                    'Pending' ? (
                                    <td
                                      style={{
                                        color: 'yellow'
                                      }}
                                    >
                                      {quizStatus(quiz._id).status}
                                    </td>
                                  ) : quizStatus(quiz._id).status ===
                                    'Failed' ? (
                                    <td
                                      style={{
                                        color: 'red'
                                      }}
                                    >
                                      {quizStatus(quiz._id).status}
                                    </td>
                                  ) : quizStatus(quiz._id).status === 'Sent' ? (
                                    <td style={{ color: '#171717' }}>
                                      {quizStatus(quiz._id).status}
                                    </td>
                                  ) : (
                                    <td
                                      style={{
                                        color: '#1aff1a'
                                      }}
                                    >
                                      {quizStatus(quiz._id).status}
                                    </td>
                                  )
                                ) : null}
                                <td>
                                  {quizStatus(quiz._id) &&
                                  quizStatus(quiz._id).status !== 'Not Sent' ? (
                                    <Link
                                      to={`/quiz-answer/${quiz.bootcamp._id}/${quiz.week}/${quiz._id}`}
                                      style={{
                                        color: '#3366BB'
                                      }}
                                    >
                                      Show answer
                                    </Link>
                                  ) : (
                                    'Not Available'
                                  )}
                                </td>
                              </>
                            )}
                        </tr>
                      ))
                    ) : (
                      <p className="pl-4 py-2 mt-4 text-dark bg-warning ">
                        You Don't have Any Quizzes yet !
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
