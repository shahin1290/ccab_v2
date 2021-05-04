import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getWeekList } from '../../../redux/actions/weekAction'
import DayContent from '../../layout/DayContent'
import { Card, Container, Accordion } from 'react-bootstrap'
import { getDayList } from '../../../redux/actions/dayAction'

export default function ManageMentorScreen({ match }) {
  const dispatch = useDispatch()

  const id = match.params.id
  const { weekList, loading, error } = useSelector((state) => state.weekList)

  useEffect(() => {
    dispatch(getWeekList(id))
  }, [dispatch, id])
  console.log(weekList);
  return (
    <>
      <section className="login-nav-section">
        <div className="auto-container"></div>
      </section>
      {/*End Page Title*/}
      {/* Intro Section */}
      <Container style={{ marginBottom: '200px' }}>
        {/* Accordian Column */}
        <h4>Table of contents</h4>
        {/* Accordion Box */}
        <Accordion className="accordion-box style-two">
          {weekList.map((week, index) => (
            <Card className="accordion block">
              <Accordion.Toggle
                as={Card.Header}
                eventKey={`${index}`}
                className="acc-btn"
                style={{ display: 'flex', justifyContent: 'space-between' }}
                onClick={() => dispatch(getDayList(week._id))}
              >
                <div>{week.name}</div>

                <div style={{ display: 'flex' }}>
                  <Link
                    to={`/mentor-add-quiz/${week.bootcamp}/${week._id}`}
                    className="btn btn-info bordered"
                  >
                    Add quiz
                  </Link>
                  <Link
                    to={`/mentor-upload-assignment/${week.bootcamp}/${week._id}`}
                    className="btn btn-danger bordered"
                  >
                    Upload Assignment
                  </Link>
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={`${index}`}>
                <DayContent weekId={week._id} bootcampId={week.bootcamp} />
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </Container>
      {/* End intro Courses */}
    </>
  )
}