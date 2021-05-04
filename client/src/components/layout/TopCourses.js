import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCourseList } from '../../redux/actions/courseAction'
import { updateWeek } from '../../redux/actions/weekAction'

import Message from '../layout/Message'
import Loader from '../layout/Loader'
import { Link } from 'react-router-dom'

export default function TopCourses({ match }) {
  const dispatch = useDispatch()
  const { courseList, loading, error } = useSelector(
    (state) => state.courseList
  )

  

  useEffect(() => {
    dispatch(getCourseList())
  }, [dispatch])

  return (
    <>
      {/* Institution Section */}
      <section className="institution-section">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title style-two">
            <h2>Our top courses</h2>
            <div className="text"></div>
          </div>
          <div className="row clearfix">
            {/* Institution Block */}

            {loading ? (
              <Loader />
            ) : error ? (
              <Message>{error}</Message>
            ) : courseList.length ? (
              courseList.map((course) =>  (
                  <div className="institution-block col-lg-4 col-md-6 col-sm-12">
                    <div
                      className="inner-box wow fadeInLeft"
                      data-wow-delay="0ms"
                      data-wow-duration="1500ms"
                    >
                      <div className="icon-box">
                        <span className="icon flaticon-computer" />
                      </div>
                      <h4>
                        <Link to={`/courses/${course._id}`}>{course.name}</Link>
                      </h4>
                      <div className="text overflow-hidden">
                        {course.description}
                      </div>
                      <div className="price">${course.price}</div>
                      <Link
                        to="/get-start"
                        className="theme-btn btn-style-seven"
                      >
                        <span className="txt">Enroll Now</span>
                      </Link>
                    </div>
                  </div>
                )
              )
            ) : (
              ''
            )}
            {/* Institution Block */}
            <div className="institution-block empty-block col-lg-4 col-md-6 col-sm-12">
              <div
                className="inner-box wow fadeInRight"
                data-wow-delay="0ms"
                data-wow-duration="1500ms"
              >
                <a href="/course-grid" className="theme-btn btn-style-six">
                  <span className="txt">Browse All</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Institution Section */}
    </>
  )
}
