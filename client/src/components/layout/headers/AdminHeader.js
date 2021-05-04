import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Badge,
  Image
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logout, isValid } from '../../../redux/actions/userAction'
import { VALID_REST } from './../../../redux/constences/userConst'
import { toast } from 'react-toastify'
import Loader from '../../layout/Loader'
import AdminHeaderContnet from './AdminHeaderContnet'
export default function AdminHeader() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

  // state from isValid reducer
  const isTokenValid = useSelector((state) => state.isTokenValid)
  const { error: ValidError, loading: ValidLoading, success } = isTokenValid

  const dispatch = useDispatch()
  const history = useHistory()

  // useEffect(() => {
  //   dispatch(isValid())
  // }, [dispatch])

  // useEffect(() => {
  //   console.log(userDetail)
  //   if (userDetail && !userDetail._id && !ValidLoading && !success) {
  //     history.push('/login')
  //   }
  // }, [history, userDetail, success])

  // useEffect(() => {
  //   if (ValidError) {
  //     dispatch(logout())
  //     history.push('/login')
  //     dispatch({ type: VALID_REST })
  //   }
  // }, [dispatch, ValidError])

  const logoutHandler = () => {
    dispatch(logout())
    history.push('/login')
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <div className="container">
          <Navbar.Brand >Admin DashBoard</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">


          <AdminHeaderContnet></AdminHeaderContnet>

          <Nav>
            {!userDetail.token ? (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/get-start">Register</Nav.Link>
              </>):
              <NavDropdown title={'Hi ' + userDetail.name} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/profile ">my profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
            }

            </Nav>
          </Navbar.Collapse>
          </div>
        </Navbar>
    </>
  )
}
