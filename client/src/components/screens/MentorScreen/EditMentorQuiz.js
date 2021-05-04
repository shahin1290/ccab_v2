import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'

import { Card, Container } from 'react-bootstrap'
import { getQuizDetails, updateQuiz } from '../../../redux/actions/quizAction'
import Message from '../../layout/Message'

export default function UpdateMentorCourse({ match }) {
  const dispatch = useDispatch()
  const { query } = useLocation()
  const history = useHistory()

  const { bootcampId, weekId, id } = match.params

  const { quiz, loading, error } = useSelector((state) => state.quizDetails)
  const { error: updateError, success: updateSuccess } = useSelector(
    (state) => state.quizUpdate
  )

  useEffect(() => {
    dispatch(getQuizDetails(bootcampId, weekId, id))
    if (updateSuccess) {
      localStorage.removeItem('quiz')
      history.push(`/mentor-show-quiz/:bootcampId/:weekId/:id`)
    }
  }, [bootcampId, weekId, id, dispatch, updateSuccess])

  const [question, setQuestion] = useState(
    JSON.parse(localStorage.getItem('quiz')).content
  )
  const [inputFields, setInputFields] = useState(
    JSON.parse(localStorage.getItem('quiz')).answers
  )

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i._id) {
        i[event.target.name] = event.target.value
      }
      return i
    })

    setInputFields(newInputFields)
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: '', content: '', correct: '' }])
  }

  const handleRemoveFields = (id) => {
    const values = [...inputFields]
    values.splice(
      values.findIndex((value) => value._id === id),
      1
    )
    setInputFields(values)
  }

  //handle form submit
  const submitHandler = (e) => {
    e.preventDefault()

    const updateQuizQuestion =
      quiz &&
      quiz.question.map((q) =>
        q.content === JSON.parse(localStorage.getItem('quiz')).content
          ? { ...q, content: question, answers: inputFields }
          : q
      )

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
      <Container>
        <div className="edit-cource-section">
          {/* Sec Title */}
          <div className="sec-title">
            <div className="clearfix">
              <div className="pull-left">
                <h4>Edit Quiz</h4>
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
              <div className="left-column col-lg-12 col-md-12 col-sm-12">
                <div className="inner-column">
                  {/* Edit Course Form */}
                  <div className="edit-course-form">
                    {error && <Message>{error}</Message>}
                    <form onSubmit={submitHandler}>
                      {/* Form Group */}

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
                      {inputFields &&
                        inputFields.map((inputField, index) => (
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
                                    handleChangeInput(inputField._id, event)
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
                                    handleChangeInput(inputField._id, event)
                                  }
                                >
                                  <option value="" selected>
                                    Select true or false
                                  </option>
                                  <option value={true}>True</option>
                                  <option value={false} selected>
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
                                onClick={() =>
                                  handleRemoveFields(inputField._id)
                                }
                              >
                                <i class="fas fa-minus-square"></i>
                              </button>
                            </div>
                          </Card>
                        ))}

                      <div className="button-box text-center">
                        <button
                          type="submit"
                          className="theme-btn btn-style-one"
                          style={{ zIndex: '0', marginTop: '30px' }}
                        >
                          <span className="txt">Update Question</span>
                        </button>
                      </div>
                    </form>
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
