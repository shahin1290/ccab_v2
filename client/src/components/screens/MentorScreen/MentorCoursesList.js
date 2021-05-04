import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCourseList } from '../../../redux/actions/courseAction'
import Message from '../../layout/Message'
import Loader from '../../layout/Loader'
import { Table, Nav } from 'react-bootstrap'
import { getDate } from '../../../util/getDate'

export default function MentorCoursesList() {
  const dispatch = useDispatch()
  const { userDetail } = useSelector((state) => state.userLogin)

  const { courseList, loading, error } = useSelector(
    (state) => state.courseList
  )

  // count the current week for each course
  const getWeeksLeft = (StartDate) => {
    let d = new Date(StartDate)
    let timePassed = new Date().getTime() - d.getTime()
    return Math.ceil(timePassed / 1000 / 60 / 60 / 24 / 7)
  }

  useEffect(() => {
    dispatch(getCourseList())
  }, [dispatch])

  const filterMentorCourses = () =>
    courseList.filter((course) => course.mentor._id === userDetail._id)
  //console.log(filterMentorCourses());
  return (
    <>
      {/* Manage Cource Section */}
      <div className="manage-cource-section">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title">
            <div className="clearfix">
              <div className="pull-left">
                <h4>Manage Courses</h4>
              </div>
            </div>
          </div>
          <div className="inner-container">
            <div className="container-content">
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>
                      <h5>Title</h5>
                    </th>
                    <th>
                      <h5>Start Date</h5>
                    </th>
                    <th>
                      <h5>Weeks</h5>
                    </th>
                    <th>
                      <h5>Status</h5>
                    </th>
                    <th>
                      <h5>Content</h5>
                    </th>
                    <th>
                      <h5>Tasks</h5>
                    </th>
                    <th>
                      <h5>Quizzes</h5>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message>{error}</Message>
                    ) : filterMentorCourses().length ? (
                      filterMentorCourses().map((item) => {
                        //console.log(item);
                        return (
                          <tr>
                            <th className="title" scope="col">
                              {item.name}
                            </th>
                            <th className="post-date" scope="col">
                              {getDate(item.start_date)}
                            </th>
                            <th className="sales" scope="col">
                              {getWeeksLeft(item.start_date)}/{item.weeks}
                            </th>

                            <th className="category" scope="col">
                              {item.published ? (
                                <span className="text-success">Published</span>
                              ) : (
                                <span className="text-danger">
                                  Not Published
                                </span>
                              )}
                            </th>
                            <th>
                              {' '}
                              <Nav.Link
                                href={`/manage-mentor-course/${item._id}`}
                              >
                                <i class="fas fa-edit">Edit content</i>
                              </Nav.Link>
                            </th>
                            <th>
                              <Nav.Link href={`/mentor-task-list/${item._id}`}>
                                <i class="fas fa-list-ul">Task List</i>
                              </Nav.Link>
                            </th>
                            <th>
                              <Nav.Link href={`/mentor-quiz-list/${item._id}`}>
                                <i class="fas fa-list-ul">Quiz List</i>
                              </Nav.Link>
                            </th>
                          </tr>
                        )
                      })
                    ) : null}
                  </>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      {/* End Manage Cource Section */}
    </>
  )
}
