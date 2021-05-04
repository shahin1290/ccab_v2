import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCourseList } from '../../redux/actions/courseAction'
import Message from '../layout/Message'
import Loader from '../layout/Loader'

export default function CourseListScreen({ match }) {
  const dispatch = useDispatch()

  const pageNumber = match.params.pageNumber || 1

  const { courseList, page, pages, loading, error } = useSelector(
    (state) => state.courseList
  )

  useEffect(() => {
    dispatch(getCourseList(pageNumber))
  }, [dispatch, pageNumber])

  return (
    <>
      {/* Page Title */}
      <section className="login-nav-section">
        <div className="auto-container"></div>
      </section>
      {/*End Page Title*/}
      {/*Sidebar Page Container*/}
      <div className="sidebar-page-container">
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
        <div className="circle-two"></div>
        <div className="auto-container">
          <div className="row clearfix">
            {/* Content Side */}
            <div className="content-side col-lg-9 col-md-12 col-sm-12">
              <div className="our-courses">
                {/* Options View */}
                <div className="options-view">
                  <div className="clearfix">
                    <div className="pull-left">
                      <h3>Browse UI/ UX Courses</h3>
                    </div>
                    <div className="pull-right clearfix">
                      {/* List View */}
                      <ul className="list-view">
                        <li>
                          <Link to="/course-grid">
                            <span className="icon flaticon-grid"></span>
                          </Link>
                        </li>
                        <li className="active">
                          <Link to="/course-list">
                            <span className="icon flaticon-list-1"></span>
                          </Link>
                        </li>
                      </ul>

                      {/* Type Form */}
                      <div className="type-form">
                        <form method="post" action="index.html">
                          {/* Form Group */}
                          <div className="form-group">
                            <select className="custom-select-box">
                              <option>Newest</option>
                              <option>Old</option>
                            </select>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message>{error}</Message>
                ) : courseList.length ? (
                  courseList.map((course) => (
                    <div className="cource-block-three" key={course._id}>
                      <div className="inner-box">
                        <div className="image">
                          <Link to={`/courses/${course._id}`}>
                            <img
                              src="https://via.placeholder.com/270x250"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="content-box">
                          <div className="box-inner">
                            <h5>
                              <Link to={`/courses/${course._id}`}>
                                {course.name}
                              </Link>
                            </h5>
                            <div className="text">{course.description}</div>
                            <div className="clearfix">
                              <div className="pull-left">
                                <div className="level-box">
                                  <span className="icon flaticon-settings-1"></span>
                                  Advance Level
                                </div>
                              </div>
                              <div className="pull-right clearfix">
                                <div className="students">
                                  {course.weeks * 5} Lectures
                                </div>
                                <div className="hours">54 Hours</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  ''
                )}
              </div>
            </div>

            {/* Sidebar Side */}
            <div className="sidebar-side col-lg-3 col-md-12 col-sm-12">
              <div className="sidebar-inner">
                <aside className="sidebar">
                  {/* Filter Widget */}
                  <div className="filter-widget">
                    <h5>Filter By</h5>

                    <div className="skills-box">
                      {/* Skills Form */}
                      <div className="skills-form">
                        <form method="post" action="index.html">
                          <span>Skill Level</span>

                          {/* Radio Box */}
                          <div className="radio-box">
                            <input
                              type="radio"
                              name="remember-password"
                              checked
                              id="type-1"
                            />
                            <label for="type-1">Beginner</label>
                          </div>

                          {/* Radio Box */}
                          <div className="radio-box">
                            <input
                              type="radio"
                              name="remember-password"
                              id="type-2"
                            />
                            <label for="type-2">Intermediate</label>
                          </div>

                          {/* Radio Box */}
                          <div className="radio-box">
                            <input
                              type="radio"
                              name="remember-password"
                              id="type-3"
                            />
                            <label for="type-3">Expert</label>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="skills-box-two">
                      {/* Skills Form */}
                      <div className="skills-form-two">
                        <form method="post" action="index.html">
                          <span>Skill Level</span>

                          {/* Radio Box */}
                          <div className="radio-box">
                            <input
                              type="radio"
                              name="remember-password"
                              checked
                              id="type-4"
                            />
                            <label for="type-4">Free (14)</label>
                          </div>

                          {/* Radio Box */}
                          <div className="radio-box">
                            <input
                              type="radio"
                              name="remember-password"
                              id="type-5"
                            />
                            <label for="type-5">Paid</label>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="skills-box-three">
                      {/* Skills Form */}
                      <div className="skills-form-three">
                        <form method="post" action="index.html">
                          <span>Duration Time</span>

                          {/* Radio Box */}
                          <div className="radio-box-three">
                            <input
                              type="radio"
                              name="remember-password"
                              checked
                              id="type-7"
                            />
                            <label for="type-7">5+ hours (30)</label>
                          </div>

                          {/* Radio Box */}
                          <div className="radio-box-three">
                            <input
                              type="radio"
                              name="remember-password"
                              id="type-8"
                            />
                            <label for="type-8">10+ hours (20)</label>
                          </div>

                          {/* Radio Box */}
                          <div className="radio-box-three">
                            <input
                              type="radio"
                              name="remember-password"
                              id="type-9"
                            />
                            <label for="type-9">15+ hours (5)</label>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>

          {/* Post Share Options */}
          <div className="styled-pagination">
            <ul className="clearfix">
              <li className="prev">
                <Link to={`/page/${page > 1 ? page - 1 : 1}`}>
                  <span className="fa fa-angle-left"></span>{' '}
                </Link>
              </li>
              {[...Array(pages).keys()].map((x) => (
                <li className={x + 1 === page && 'active'}>
                  <Link key={x + 1} to={`/page/${x + 1}`}>
                    {x + 1}
                  </Link>
                </li>
              ))}

              <li className="next">
                <Link to={`/page/${page === pages ? page : page + 1}`}>
                  <span className="fa fa-angle-right"></span>{' '}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Popular Courses */}
      <section className="popular-courses-section">
        <div className="auto-container">
          <div className="sec-title">
            <h2>Most Popular Courses</h2>
          </div>

          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error}</Message>
          ) : courseList.length ? (
            courseList.map((course) => (
              <div className="cource-block-three" key={course._id}>
                <div className="inner-box">
                  <div className="image">
                    <Link to="/course/1/details">
                      <img src="https://via.placeholder.com/270x250" alt="" />
                    </Link>
                  </div>
                  <div className="content-box">
                    <div className="box-inner">
                      <h5>
                        <Link to="/course/1/details">{course.name}</Link>
                      </h5>
                      <div className="text">{course.description}</div>
                      <div className="clearfix">
                        <div className="pull-left">
                          <div className="level-box">
                            <span className="icon flaticon-settings-1"></span>
                            Advance Level
                          </div>
                        </div>
                        <div className="pull-right clearfix">
                          <div className="students">
                            {course.weeks * 5} Lecturer
                          </div>
                          <div className="hours">54 Hours</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            ''
          )}
        </div>
      </section>
      {/* End Popular Courses */}

      {/* Call To Action Section Two */}
      <section
        className="call-to-action-section-two"
        style={{ backgroundImage: 'url(images/background/3.png)' }}
      >
        <div className="auto-container">
          <div className="content">
            <h2>Ready to get started?</h2>
            <div className="text">
              Replenish him third creature and meat blessed void a fruit
              gathered you’re, they’re two <br /> waters own morning gathered
              greater shall had behold had seed.
            </div>
            <div className="buttons-box">
              <Link to="course.html" className="theme-btn btn-style-one">
                <span className="txt">
                  Get Stared <i className="fa fa-angle-right"></i>
                </span>
              </Link>
              <Link to="course.html" className="theme-btn btn-style-two">
                <span className="txt">
                  All Courses <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* End Call To Action Section Two */}
    </>
  )
}
