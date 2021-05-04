import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getQuizDetails, updateQuiz } from '../../redux/actions/quizAction'
import { createQuizAnswer } from '../../redux/actions/quizAnswerAction'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import { useHistory } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import CountDown from '../layout/CountDown'

export default function QuizScreen({ match, location }) {
  const { bootcampId, weekId, id } = match.params

  const history = useHistory()
  const dispatch = useDispatch()
  const [inputFields, setInputFields] = useState([])

  const { userDetail } = useSelector((state) => state.userLogin)
  const [show, setShow] = useState(
    userDetail.name && userDetail.user_type === 'StudentUser' ? false : true
  )

  const handleChangeInput = (question, e) => {
    const answer = {
      question,
      answer: e.target.value
    }

    let answers

    if (inputFields.some((i) => i.question === question)) {
      answers = [...inputFields.filter((i) => i.question !== question), answer]
    } else {
      answers = [...inputFields, answer]
    }
    setInputFields(answers)
  }

  const { quiz, loading, error } = useSelector((state) => state.quizDetails)

  const {
    answer,
    loading: quizAnswerLoading,
    error: quizAnswerError
  } = useSelector((state) => state.answerCreate)

  const { error: updateError, success: updateSuccess } = useSelector(
    (state) => state.quizUpdate
  )

  useEffect(() => {
    dispatch(getQuizDetails(bootcampId, weekId, id))
    if (answer && answer.success) {
      history.push('/quizzes')
    }
  }, [dispatch, bootcampId, weekId, id, answer, history, updateSuccess])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createQuizAnswer(inputFields, bootcampId, id))
    localStorage.removeItem('timestamp')
  }

  //handle delete quiz question (for mentor)

  const deleteQuizQuestion = (questionToDelete) => {
    const updateQuizQuestion =
      quiz &&
      quiz.question.filter((q) => q.content !== questionToDelete.content)

    const quizData = {
      name: quiz.name,
      description: quiz.description,
      time: quiz.time,
      question: updateQuizQuestion
    }
    dispatch(updateQuiz(bootcampId, weekId, id, quizData))
  }

  return (
    <>
      <section className="login-nav-section">
        <div className="auto-container"></div>
      </section>

      {/* Test View Section */}
      <div className="testview-section py-5">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title">
            <h4 style={{ marginTop: '30px' }}>Quiz Name: {quiz.name}</h4>
          </div>
          <div className="inner-container">
            {/* Upper Box */}
            <div className="upper-box">
              {/* Question Box */}
              <div className="question-box">
                <div className="row clearfix">
                  {/* Column */}
                  <div className="column col-lg-6 col-md-6 col-sm-12">
                    <h6>Questions</h6>
                    <div className="question" style={{ marginBottom: '20px' }}>
                      {quiz.question && quiz.question.length}{' '}
                      <span>Questions</span>
                    </div>
                    {userDetail.name && userDetail.user_type !== 'StudentUser' && (
                      <Link
                        className="theme-btn btn-style-eight"
                        to={{
                          pathname: `/mentor-add-quiz/${bootcampId}/${weekId}/${id}`
                        }}
                      >
                        <span className="txt">Add Questions</span>
                      </Link>
                    )}
                  </div>

                  {/* Column */}
                  <div className="column col-lg-3 col-md-6 col-sm-12">
                    <h6>Time</h6>
                    <div className="time-counter-two">
                      <span>{quiz.time} Minutes </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Lower Box */}

            <div className="lower-box" style={{ marginTop: '50px' }}>
              {/* Quiz Form */}
              {show ? (
                <div className="quiz-form">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      fontSize: '20px'
                    }}
                  >
                    {userDetail.name &&
                      userDetail.user_type === 'StudentUser' && <CountDown />}
                  </div>

                  <form onSubmit={submitHandler}>
                    {quiz.question &&
                      quiz.question.map((q, index) => {
                        return (
                          <Card className="form-group">
                            <Card.Body>
                              <Card.Title>{q.content}</Card.Title>

                              {q.answers.map((a, i) => (
                                <Card.Text key={a._id}>
                                  <input
                                    type="radio"
                                    name={`Q - ${index}`}
                                    value={a.content}
                                    onChange={(e) => {
                                      handleChangeInput(q.content, e)
                                    }}
                                  />
                                  <label style={{ marginLeft: '10px' }}>
                                    {a.content}{' '}
                                  </label>
                                </Card.Text>
                              ))}
                            </Card.Body>

                            {userDetail.name &&
                              userDetail.user_type !== 'StudentUser' && (
                                <span>
                                  <Link
                                    to={{
                                      pathname: `/edit-quiz/${bootcampId}/${weekId}/${id}`
                                    }}
                                    onClick={() =>
                                      localStorage.setItem(
                                        'quiz',
                                        JSON.stringify(q)
                                      )
                                    }
                                    style={{ padding: '0 20px' }}
                                  >
                                    <i class="fas fa-edit">edit</i>
                                  </Link>
                                  <Link
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          'Are you sure you wish to delete this item?'
                                        )
                                      )
                                        deleteQuizQuestion(q)
                                    }}
                                  >
                                    <i class="fas fa-trash">Delete</i>
                                  </Link>
                                </span>
                              )}
                          </Card>
                        )
                      })}
                    {userDetail.name && userDetail.user_type === 'StudentUser' && (
                      <div className="form-group text-right">
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                          name="submit-form"
                          id="quiz"
                        >
                          <span className="txt">Submit Test</span>
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              ) : (
                <div className="button-box">
                  <button
                    type="text"
                    className="theme-btn btn-style-one"
                    style={{ zIndex: '0' }}
                    onClick={() => {
                      setShow(true)
                      if (!localStorage.getItem('timestamp')) {
                        JSON.stringify(
                          localStorage.setItem(
                            'timestamp',
                            new Date().getTime() + quiz.time * 60000
                          )
                        )
                      }
                    }}
                  >
                    <span className="txt">Start Quiz</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* End Test View Section */}
    </>
  )
}
