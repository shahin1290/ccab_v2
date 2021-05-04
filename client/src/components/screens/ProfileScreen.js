import React, { useState, useEffect } from 'react'
import { Tabs, Tab, Table, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getMyTaskList } from '../../redux/actions/taskAction'
import {
  userProfileUpdate,
  getProfile,
  getUserDetails
} from '../../redux/actions/userAction'
import Message from '../layout/Message'
import Assignments from '../layout/Assignments'
import Quizzes from '../layout/Quizzes'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import { getMyAnswerList } from '../../redux/actions/answerAction'
import { getMyQuizAnswerList } from './../../redux/actions/quizAnswerAction'
import { getCourseList } from '../../redux/actions/courseAction'
import { getMyQuizList } from '../../redux/actions/quizAction'
import CountUp from 'react-countup'

export default function ProfileScreen() {
  const dispatch = useDispatch()

  const { userDetail } = useSelector((state) => state.userLogin)
  const { myQuizAnswers } = useSelector((state) => state.quizAnswerMyList)

  const {
    courseList,
    loading: bootcampLoading,
    error: bootcampError
  } = useSelector((state) => state.courseList)

  //Get Student's Bootcamps

  const filterCourseList = () => {
    if (userDetail.user_type === 'StudentUser') {
      return courseList.filter((course) =>
        course.students.some((student) => student._id === userDetail._id)
      )
    }

    if (
      userDetail.user_type === 'MentorUser' ||
      userDetail.user_type === 'AdminUser'
    ) {
      return courseList.filter((course) => course.mentor._id === userDetail._id)
    }
  }

  // updating process
  const userUpdate = useSelector((state) => state.userUpdate)
  const { updateSuccess, error: UpdateError } = userUpdate

  //get task list
  const taskListMy = useSelector((state) => state.taskListMy)
  const { myTasks, loading: detailLoading, error: loadingError } = taskListMy

  //get quiz list list
  const { myQuizList, loading: quizLoading, error: quizError } = useSelector(
    (state) => state.myQuizList
  )

  // getting myAnswerList

  const answerMyList = useSelector((state) => state.answerMyList)
  const {
    myanswers,
    loading: answerListLoading,
    error: answerListError,
    success: answerListSuccess
  } = answerMyList

  // state from isValid reducer
  const isTokenValid = useSelector((state) => state.isTokenValid)
  const {
    error: ValidError,
    loading: ValidLoading,
    success: TokenSuccess
  } = isTokenValid

  useEffect(() => {
    dispatch(getCourseList())
    dispatch(getProfile())

    if (userDetail.name && userDetail.user_type === 'StudentUser') {
      dispatch(getMyQuizAnswerList())
      dispatch(getMyAnswerList())
      dispatch(getMyTaskList())
      dispatch(getMyQuizList())
    }

    if (userDetail.name && userDetail.user_type === 'AdminUser') {
      dispatch(getProfile())
    }
  }, [
    dispatch,
    userDetail,
    ValidLoading,
    updateSuccess,
    TokenSuccess,
    answerListSuccess
  ])

  // Getting user Details
  const { loading, user, error } = useSelector((state) => state.userProfile)

  return (
    <>
      <div
        className="instructor-page-section  "
        style={{ backgroundColor: '#fff' }}
      >
        <div className="auto-container">
          <div className="upper-content">
            <div className="row clearfix">
              {/* Left Column */}
              <div className="left-column col-lg-9 col-md-12 col-sm-12">
                {/* Content */}
                <div className="content">
                  {/* Author Image */}

                  <h4>{userDetail.name}</h4>
                  <div className="designation">{userDetail.user_type}</div>
                  <ul className="social-box">
                    <li className="facebook">
                      <a href="#" className="fa fa-facebook" />
                    </li>
                    <li className="google">
                      <a href="#" className="fa fa-google" />
                    </li>
                    <li className="twitter">
                      <a href="#" className="fa fa-twitter" />
                    </li>
                  </ul>
                  {/* Fact Counter */}
                  <div className="fact-counter2">
                    <div className="row clearfix">
                      {/* Column */}
                      <div className="column counter-column col-lg-3 col-md-6 col-sm-12 ">
                        <div className="inner">
                          <h5 className="counter-title">Courses</h5>
                          <div className="count-outer count-box">
                            <CountUp
                              start={-2}
                              end={filterCourseList().length}
                              duration={2.75}
                              separator=" "
                              decimal=","
                              suffix=""
                            />
                          </div>
                        </div>
                      </div>
                      {/* Column */}
                      <div className="column counter-column col-lg-3 col-md-6 col-sm-12">
                        <div className="inner">
                          <h5 className="counter-title">Assignments</h5>
                          <div className="count-outer count-box">
                            <CountUp
                              start={-2}
                              end={myTasks.length}
                              duration={2.75}
                              separator=" "
                              decimal=","
                              suffix=""
                            />
                          </div>
                        </div>
                      </div>
                      {/* Column */}
                      <div className="column counter-column col-lg-3 col-md-6 col-sm-12">
                        <div className="inner">
                          <h5 className="counter-title">Quizzes</h5>
                          <div className="count-outer count-box">
                            <CountUp
                              start={-2}
                              end={myQuizList.length}
                              duration={2.75}
                              separator=" "
                              decimal=","
                              suffix=""
                            />
                          </div>
                        </div>
                      </div>
                      {/* Column */}
                      <div className="column counter-column col-lg-3 col-md-6 col-sm-12">
                        <div className="inner">
                          <h5 className="counter-title">Answers</h5>
                          <div className="count-outer count-box">
                            <CountUp
                              start={-2}
                              end={myanswers.length + myQuizAnswers.length}
                              duration={2.75}
                              separator=" "
                              decimal=","
                              suffix=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Column */}
              <div className="right-column col-lg-3 col-md-12 col-sm-12">
                <div className="buttons-box">
                  <Link
                    to="/edit-profile-student"
                    className="theme-btn btn-style-one"
                  >
                    <span className="txt">
                      <i className="flaticon-edit" />
                      Edit{' '}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Lower Content */}
          <div className="lower-content">
            {/* Instructor Info Tabs*/}
            <Tabs defaultActiveKey="Courses" id="uncontrolled-tab-example">
              <Tab eventKey="Courses" title="Courses">
                <h4 style={{ padding: '20px' }}>My Courses</h4>

                <div className="single-item-carousel owl-carousel owl-theme">
                  <div className="slide">
                    <div className="row clearfix">
                      {/* Course Block */}
                      {bootcampLoading ? (
                        <Loader />
                      ) : filterCourseList().length ? (
                        filterCourseList().map((course) => {
                          return (
                            <div className="course-block col-lg-3 col-md-4 col-sm-12">
                              <div className="inner-box">
                                <div className="image">
                                  <Link to={`/course-content/${course._id}`}>
                                    <img
                                      src={'http://localhost:5001/uploads/Bootcamp/'+course.img_path}
                                      alt="bootcamp"
                                    />
                                  </Link>
                                  <div className="time text-light pl-1 py-1">{course.weeks*5*2} hours</div>
                                </div>
                                <div className="lower-content">
                                  <h6 className="my-2">
                                    <Link to={`/course-content/${course._id}`}>
                                      {course.name}
                                    </Link>
                                  </h6>
                                  <div className="text">
                            <span className="d-inline-block text-truncate" style={{maxWidth: "240px"}}>
                              {course.description}
                              </span>
                             </div>
                                  <div className="clearfix">
                                    <div className="pull-left">
                                      <div className="author">
                                        By: <span>{course.mentor.name}</span>
                                      </div>
                                    </div>
                                    <div className="pull-right">
                                      <div className="price">
                                        ${course.price}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      ) : (
                        <p className="pl-4 py-2 mt-4 text-dark bg-warning ">
                          You Don't have Any Courses yet !
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Tab>
              {userDetail && userDetail.user_type === 'StudentUser' ? (
                <Tab eventKey="Assignments" title="Assignments">
                  <Assignments />
                </Tab>
              ) : null}

              {userDetail && userDetail.user_type === 'StudentUser' ? (
                <Tab eventKey="Quizzes" title="Quizzes">
                  <Quizzes />
                </Tab>
              ) : null}

              <Tab eventKey="Personal Info" title="Personal Info">
                <div className="content mt-4">
                  <div className="card p-5 ">
                    <h6 className="mb-3">
                      {' '}
                      <i className="fas fa-user-tie text-danger personalinfoIcon"></i>{' '}
                      <span className="bg-dark text-light rounded px-2 py-1 ml-2">
                        {user.name}
                      </span>{' '}
                    </h6>
                    <h6 className="mb-3">
                      <i className="fas fa-at text-danger personalinfoIcon"></i>{' '}
                      <span className="bg-dark text-light rounded px-2 py-1 ml-2">
                        {user.email}
                      </span>
                    </h6>
                    <h6 className="mb-3">
                      <i className="fas fa-mobile-alt text-danger personalinfoIcon"></i>{' '}
                      <span className="bg-dark text-light rounded px-2 py-1 ml-2">
                        {user.phone}
                      </span>
                    </h6>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      {/* End Instructor Page Section */}
    </>
  )
}
