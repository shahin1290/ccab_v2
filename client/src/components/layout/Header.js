import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Badge,
  Image,
  Button
} from 'react-bootstrap'
// imgaes 
import Logo from './../../assets/images/logoBody.png'

import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logout, isValid } from '../../redux/actions/userAction'
import { VALID_REST } from './../../redux/constences/userConst'
import { toast } from 'react-toastify'
import Loader from '../layout/Loader'

import AdminHeader from './../layout/headers/AdminHeaderContnet'
import StudentHeaderContent from './../layout/headers/StudentHeaderContent'

export default function Header() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

  // state from isValid reducer
  const isTokenValid = useSelector((state) => state.isTokenValid)
  const { error: ValidError, loading: ValidLoading, success } = isTokenValid

  const dispatch = useDispatch()
  const history = useHistory()

  /* useEffect(() => {
    dispatch(isValid())
  }, [dispatch])
  useEffect(() => {
    if (userDetail && !userDetail._id && !ValidLoading && !success) {
      history.push('/login')
    }
  }, [history, userDetail, success])
  useEffect(() => {
    if (ValidError) {
      dispatch(logout())
      history.push('/login')
      dispatch({ type: VALID_REST })
    }
  }, [dispatch, ValidError]) */

  const logoutHandler = () => {
    dispatch(logout())
    history.push('/login')
  }

  return (
    <>
  
        <Navbar collapseOnSelect expand="lg"   className="pb-2 " sticky="top" 
        style={{zIndex:'1030', backgroundColor:'#0466c8'}} >
          <div className="container">
          <Navbar.Brand href="/">
            <img src={Logo} title="Bootcamp" width="50px" />
            <span className="ml-2 text-light " >Codify College </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      

          <Navbar.Collapse id="responsive-navbar-nav">
      
          {userDetail.user_type === 'MentorUser'? (
                      <Nav className="mr-auto">
                        <Nav.Link className="text-light" href="/">Home</Nav.Link>
                        <Nav.Link href="/course-grid">Courses</Nav.Link>
                        <Nav.Link href="/mentor-courses-list">Manage Courses</Nav.Link>
                        <Nav.Link href="/mentor-users-list">Users</Nav.Link>
                      </Nav>
                  ) :
                  userDetail.user_type === 'StudentUser' ? (
                    <StudentHeaderContent/>

                  ): userDetail.user_type === 'AdminUser' ?(<AdminHeader/>) :  
                  <Nav className="mr-auto">
                    <Nav.Link className="text-light" href="/">Home</Nav.Link>
                    <Nav.Link className="text-light" href="/course-grid">Courses</Nav.Link>
                  
                </Nav>
                }


 
            <Nav>

              {!userDetail.token? 
              <>
                 <Nav.Link className="text-light" href="/login">Login</Nav.Link>
                 <Nav.Link className="text-light" href="/get-start">Register</Nav.Link>
                 </>
                 :
                <NavDropdown className="navLinks" title={'Hi ' + userDetail.name} id="collasible-nav-dropdown">
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