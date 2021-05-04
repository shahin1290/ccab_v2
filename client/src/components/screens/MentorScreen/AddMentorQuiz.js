import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

import { Card, Accordion, Container } from 'react-bootstrap'
import {
  createQuiz,
  getQuizDetails,
  updateQuiz
} from '../../../redux/actions/quizAction'
import Message from '../../layout/Message'

export default function UpdateMentorCourse({ location, match }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const redirect = location.search
    ? location.search.split('=')[1]
    : '/mentor-courses-list'

  const { quiz: quizDetails } = useSelector((state) => state.quizDetails)
  const { error: updateError, success: updateSuccess } = useSelector(
    (state) => state.quizUpdate
  )

  const { quiz, loading, error } = useSelector((state) => state.quizCreate)

  const { bootcampId, weekId, id } = match.params

  useEffect(() => {
    dispatch(getQuizDetails(bootcampId, weekId, id))
    if (quiz && quiz.success) {
      history.push(redirect)
    }
  }, [quiz, bootcampId, weekId, dispatch])

  const [name, setName] = useState()
  const [time, setTime] = useState()
  const [description, setDescription] = useState()
  const [question, setQuestion] = useState('')
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), content: '', correct: '' }
  ])

  const [questionWithAnswer, setQuestionWithAnswer] = useState([])

  useEffect(() => {
    setQuestionWithAnswer(quizDetails.name ? quizDetails.question : [])
    setName(quizDetails.name)
    setDescription(quizDetails.description)
    setTime(quizDetails.time)
  }, [quizDetails])

  const addQuestionWithAnswer = () => {
    setQuestionWithAnswer([
      ...questionWithAnswer,
      {
        content: question,
        answers: [...inputFields]
      }
    ])
    setQuestion('')
    setInputFields([{ id: uuidv4(), content: '', correct: '' }])
  }

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i
    })

    setInputFields(newInputFields)
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), content: '', correct: '' }])
  }

  const handleRemoveFields = (id) => {
    const values = [...inputFields]
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    )
    setInputFields(values)
  }

  //handle form submit
  const _handleAddQuiz = () => {
    const quizData = { name, description, time, question: questionWithAnswer }
    dispatch(createQuiz(quizData, bootcampId, weekId))
  }

  const _handleupdateQuiz = () => {
    const quizData = { name, description, time, question: questionWithAnswer }
    dispatch(updateQuiz(bootcampId, weekId, id, quizData))
  }

  return (
    <>
      <Container>
        <div className="edit-cource-section">
          {/* Sec Title */}
          <div className="sec-title">
            <div className="clearfix">
              <div className="pull-left">
                <h4>Add Quiz</h4>
                {updateError ? (
                  <p className="text-danger bg-light p-2 ">{updateError}</p>
                ) : updateSuccess ? (
                  <p className="text-success bg-light p-2 ">
                    Quiz Updated successfully
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="inner-container">
            <div className="row clearfix">
              {/* Left Column */}
              <div className="left-column col-lg-7 col-md-12 col-sm-12">
                <div className="inner-column">
                  <h6>Basic Information</h6>
                  {/* Edit Course Form */}
                  <div className="edit-course-form">
                    {error && <Message>{error}</Message>}
                    <form>
                      {/* Form Group */}
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          name="name"
                          value={name}
                          placeholder="Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      {/* descriptopn  */}
                      <div className="form-group">
                        <label>Description</label>

                        <input
                          name="message"
                          placeholder="Shortly describe this course"
                          defaultValue={description}
                          onChange={(e) => {
                            setDescription(e.target.value)
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Time</label>

                        <input
                          type="text"
                          name="time"
                          value={time}
                          placeholder="Time"
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </div>
                      <h6>Add Question and Possible Answers</h6>
                      <div className="form-group">
                        <label>Question</label>
                        <input
                          type="text"
                          placeholder="Question"
                          name="question"
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                        />
                      </div>
                      {inputFields.map((inputField, index) => (
                        <Card key={inputField.id}>
                          <div style={{ display: 'flex' }}>
                            <div className="form-group form-group col-lg-7 col-md-12 col-sm-12">
                              <label>{`Answer Choice ${1 + index}`} </label>
                              <input
                                type="text"
                                placeholder="Enter Possible Choice"
                                name="content"
                                value={inputField.content}
                                onChange={(event) =>
                                  handleChangeInput(inputField.id, event)
                                }
                              />
                            </div>

                            <div className="form-group col-lg-5 col-md-12 col-sm-12">
                              <label>Correct?</label>
                              <select
                                className="custom-select myDropDown"
                                value={inputField.correct}
                                name="correct"
                                onChange={(event) =>
                                  handleChangeInput(inputField.id, event)
                                }
                              >
                                <option value="" selected>
                                  Select true or false
                                </option>
                                <option value="true">True</option>
                                <option value="false" selected>
                                  False
                                </option>
                              </select>
                            </div>
                          </div>
                          <div
                            style={{
                              fontSize: '30px',
                              display: 'flex',
                              width: '70px',
                              justifyContent: 'space-between',
                              margin: '0 auto'
                            }}
                          >
                            <button type="button" onClick={handleAddFields}>
                              <i class="fas fa-plus-square"></i>
                            </button>
                            <button
                              type="button"
                              disabled={inputFields.length === 1}
                              onClick={() => handleRemoveFields(inputField.id)}
                            >
                              <i class="fas fa-minus-square"></i>
                            </button>
                          </div>
                        </Card>
                      ))}

                      <div className="form-group col-lg-12 col-md-12 col-sm-12 text-center">
                        <div
                          className="theme-btn btn-style-two"
                          onClick={addQuestionWithAnswer}
                        >
                          <span className="txt">
                            Submit the Question{' '}
                            <i className="fa fa-angle-right" />
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* Right Column */}
              <div className="right-column col-lg-4 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="edit-course-form">
                    {/* Form Group */}
                    <div className="form-group">
                      <h6>Quiz Questions</h6>

                      <Accordion
                        className="accordion-box style-two"
                        defaultActiveKey="0"
                      >
                        {questionWithAnswer &&
                          questionWithAnswer.map((x, index) => (
                            <Card className="accordion block">
                              <Card.Header>
                                <Accordion.Toggle
                                  variant="link"
                                  eventKey={`${index}`}
                                >
                                  Q: {x.content}
                                </Accordion.Toggle>
                              </Card.Header>
                              <Accordion.Collapse eventKey={`${index}`}>
                                <Card.Body>
                                  {x.answers.map((answer) => (
                                    <div>
                                      A1: {answer.content} C1: {answer.correct}
                                    </div>
                                  ))}
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          ))}
                      </Accordion>
                    </div>

                    <div className="button-box text-center">
                      {id ? (
                        <button
                          type="button"
                          className="theme-btn btn-style-one"
                          style={{ zIndex: '0' }}
                        >
                          <span className="txt" onClick={_handleupdateQuiz}>
                            Save Changes
                          </span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="theme-btn btn-style-one"
                          style={{ zIndex: '0' }}
                        >
                          <span className="txt" onClick={_handleAddQuiz}>
                            Submit Quiz
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
