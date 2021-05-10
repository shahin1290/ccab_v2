import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCourseList } from '../../redux/actions/courseAction'
import Message from '../layout/Message'
import Loader from '../layout/Loader'

export default function CourseGridScreen({ match }) {
  const dispatch = useDispatch()
  const { userDetail } = useSelector((state) => state.userLogin)
  const pageNumber = match.params.pageNumber || 1

  const { courseList, page, pages, loading, error } = useSelector(
    (state) => state.courseList
  )

  const categoryArray = [...new Set(courseList.map((item) => item.category))]

  console.log(categoryArray)

  const categoryCourses = (category) => {
    return courseList.filter((couser) => couser.category === category)
  }

  useEffect(() => {
    dispatch(getCourseList(pageNumber))
  }, [dispatch, pageNumber])
  return (
    <>
      {/*End Page Title*/}
      {/*Sidebar Page Container */}
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
            {/* Content Side  */}
            <div className="content-side col-lg-12 col-md-12 col-sm-12">
              <div className="our-courses">
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message>{error}</Message>
                ) : categoryArray.length ? (
                  categoryArray.map((category) => {
                    return (
                      <div>
                        {/* Options View  */}
                        <div className="options-view">
                          <div className="clearfix">
                            <div className="pull-left">
                              <h3>{category}</h3>
                            </div>
                          </div>
                        </div>
                        <div className="row clearfix">
                          {categoryCourses(category).length &&
                            categoryCourses(category).map((course) => {
                              return (
                                <div
                                  className="cource-block-two col-lg-4 col-md-6 col-sm-12"
                                  key={course._id}
                                >
                                  <div className="inner-box">
                                    <div className="image">
                                      <Link to={`/courses/${course._id}`}>
                                        <img
                                          src={
                                            'http://localhost:5001/uploads/Bootcamp/' +
                                            course.img_path
                                          }
                                          alt=""
                                        />
                                      </Link>
                                    </div>
                                    <div className="lower-content">
                                      <h5>
                                        <Link to={`/courses/${course._id}`}>
                                          {course.name}
                                        </Link>
                                      </h5>
                                      <div className="text">
                                        <span
                                          className="d-inline-block text-truncate"
                                          style={{ maxWidth: '240px' }}
                                        >
                                          {course.description}
                                        </span>
                                      </div>
                                      <div className="clearfix">
                                        <div className="pull-left">
                                          <div className="students">
                                            {course.weeks * 5} Lectures
                                          </div>
                                        </div>
                                        <div className="pull-right">
                                          <div className="hours">
                                            {course.weeks * 5 * 2} Hours
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    )
                  })
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>

          {/* Pagination  */}
          {/* <div className="styled-pagination">
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
          </div> */}
        </div>
      </div>

      {/* Popular Courses  */}
      <section className="popular-courses-section sidebar-page-container">
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
        <div className="auto-container">
          <div className="sec-title">
            <h2>Most Popular Courses</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-9 col-md-12 col-sm-12">
              <div className="row clearfix">
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message>{error}</Message>
                ) : courseList.length ? (
                  <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                    <div
                      className="inner-box wow fadeInLeft"
                      data-wow-delay="0ms"
                      data-wow-duration="1500ms"
                    >
                      <div className="image">
                        <Link to="/course/1/details">
                          <img
                            src={
                              'http://localhost:5001/uploads/Bootcamp/' +
                              courseList[0].img_path
                            }
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="lower-content">
                        <h5>
                          <Link to="/course/1/details">
                            {courseList[0].name}
                          </Link>
                        </h5>
                        <div className="text">
                          <span
                            className="d-inline-block text-truncate"
                            style={{ maxWidth: '240px' }}
                          >
                            {courseList[0].description}
                          </span>
                        </div>
                        <div className="clearfix">
                          <div className="pull-left">
                            <div className="students">
                              {courseList[0].weeks * 5} Lectures
                            </div>
                          </div>
                          <div className="pull-right">
                            <div className="hours">
                              {courseList[0].weeks * 5 * 2} Hours
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Popular Courses  */}
    </>
  )
}
