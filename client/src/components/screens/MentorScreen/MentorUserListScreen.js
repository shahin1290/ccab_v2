import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'react-bootstrap'
import Message from '../../layout/Message'
import { getUsers } from '../../../redux/actions/userAction'
import { useHistory } from 'react-router-dom'
import Loader from '../../layout/Loader'

export default function UserlistScreen() {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const history = useHistory()

  useEffect(() => {
    if (userDetail.user_type === 'MentorUser') {
      dispatch(getUsers())
    } else {
      history.push('/')
    }
  }, [dispatch, userDetail, history])

  return (
    <>
      <div className="container " style={{ padding: '120px 0' }}>
        <h1 className="py-1">Bootcamp Students</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive="sm">
            <thead>
              <tr>
                <th>#</th>

                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Bootcamp</th>
              </tr>
            </thead>
            <tbody>
              {users.length
                ? users.map((user) =>
                    user.students.map((student, index) => (
                      <tr key={user._id}>
                        <td>{users.indexOf(user) + 1}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.phoneNumber}</td>
                        <td>{student.gender}</td>
                        <td>{student.user_type}</td>
                        <td>{user.name}</td>
                      </tr>
                    ))
                  )
                : ''}
            </tbody>
          </Table>
        )}
      </div>
    </>
  )
}
