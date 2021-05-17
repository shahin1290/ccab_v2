import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getWeekList } from '../../redux/actions/weekAction'
import DayContent from '../layout/DayContent'
import ReactPlayer from 'react-player'
import { Card, Tabs, Tab, Accordion } from 'react-bootstrap'
import { getDayList } from '../../redux/actions/dayAction'
import { AiOutlineBars } from 'react-icons/ai'
import styled from 'styled-components'
import Plyr from 'plyr-react'
import 'plyr-react/dist/plyr.css'

export default function CourseContentScreen({ match }) {
  const dispatch = useDispatch()

  const id = match.params.id
  const { weekList, loading, error } = useSelector((state) => state.weekList)

  const dayDetails = useSelector((state) => state.dayDetails)
  const { day } = dayDetails
  console.log(day)
  useEffect(() => {
    dispatch(getWeekList(id))
  }, [dispatch, id])

  const findElementText = (el) => {
    if (day.name) {
      const sourceCode = day.source_code

      if (sourceCode.length > 0) {
        const elementType = sourceCode.find((a) => a.element_type === el)
        if (elementType) {
          return elementType.element_text
        } else {
          return null
        }
      }
    }
  }

  return (
    <>
      {/* Intro Section */}
      <section className="intro-section-two">
        <div
          className="patern-layer-one paroller"
          data-paroller-factor="0.40"
          data-paroller-factor-lg="0.20"
          data-paroller-type="foreground"
          data-paroller-direction="vertical"
          style={{ backgroundImage: 'url(images/icons/icon-1.png)' }}
        ></div>
        <div
          className="patern-layer-two paroller"
          data-paroller-factor="0.40"
          data-paroller-factor-lg="-0.20"
          data-paroller-type="foreground"
          data-paroller-direction="vertical"
          style={{ backgroundImage: 'url(images/icons/icon-2.png)' }}
        ></div>
        <div className="circle-one"></div>
        <div className="auto-container">
          <div className="inner-container">
            <h2>{day.name}</h2>
            <div className="row clearfix">
              {/* Content Column */}
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                {day.name ? (
                  <div className="inner-column">
                    <div className="course-video-box">
                      {/* <div
                        style={{
                          padding: '56.25% 0 0 0',
                          position: 'relative'
                        }}
                      >
                        <ReactPlayer
                          url={day.video_path}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0
                          }}
                          width="100%"
                          height="100%"
                          controls
                        
                        ></ReactPlayer>
                      </div> */}
                      <Plyr
                        source={{
                          type: 'video',
                          sources: [
                            {
                              src: day.video_path,
                              provider: 'youtube'
                            }
                          ]
                        }}
                        options={
                          {
                            /* ... */
                          }
                        }
                      />
                    </div>

                    {/* Intro Info Tabs*/}
                    <div className="intro-info-tabs">
                      {/* Intro Tabs*/}
                      <div className="intro-tabs tabs-box">
                        {/*Tab Btns*/}
                        <Tabs defaultActiveKey="content">
                          <Tab
                            eventKey="content"
                            title="Content"
                            style={{ fontSize: '30px' }}
                          >
                            <div
                              className="tabs-content"
                              style={{ padding: '0 15px' }}
                            >
                              <div className="content">
                                {findElementText('title') && (
                                  <h4 style={{ paddingTop: '25px' }}>
                                    {findElementText('title')}
                                  </h4>
                                )}

                                {findElementText('description') && (
                                  <p
                                    style={{
                                      fontSize: '16px'
                                    }}
                                  >
                                    {findElementText('description')}
                                  </p>
                                )}

                                {findElementText('image') && (
                                  <img
                                    src={`/uploads/Source_Code/${findElementText(
                                      'image'
                                    )}`}
                                    alt="img"
                                  />
                                )}

                                {findElementText('code') && (
                                  <p
                                    style={{
                                      width: '50%',
                                      margin: '20px auto',
                                      fontSize: '16px',
                                      padding: '10px',
                                      backgroundColor: '#F5F5F5'
                                    }}
                                  >
                                    {findElementText('code')}
                                  </p>
                                )}
                              </div>
                            </div>
                          </Tab>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="sec-title style-two">
                    <h2>Welcome to Course Content</h2>
                    <div className="text">
                      Please navigate to the side menu to see the daily content
                    </div>
                  </div>
                )}
              </div>

              {/* Accordian Column */}
              <div className="accordian-column col-lg-4 col-md-12 col-sm-12">
                <div className="inner-column sticky-top">
                  <h4>Table of contents</h4>
                  {/* Accordion Box */}
                  <Accordion className="accordion-box style-two">
                    {weekList.map((week, index) => (
                      <Card className="accordion block">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey={`${index}`}
                          className="acc-btn"
                          onClick={() => dispatch(getDayList(week._id))}
                        >
                          {week.name}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={`${index}`}>
                          <DayContent
                            weekId={week._id}
                            bootcampId={week.bootcamp}
                          />
                        </Accordion.Collapse>
                      </Card>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End intro Courses */}
    </>
  )
}
