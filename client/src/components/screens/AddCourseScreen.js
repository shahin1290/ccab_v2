import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../layout/FormContainer'
import { useSelector, useDispatch } from 'react-redux'
import { register, login } from '../../redux/actions/userAction'
import Loader from '../layout/Loader'
import Message from '../layout/Message'
import { useHistory, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
// import "react-toastify/dist/ReactToastify.css";
import { USER_REG_REST } from '../../redux/constences/userConst'

export default function RegisterScreen({ location, setAlert }) {
  const history = useHistory()
  /**
   * User registeraton process with React input handling
   */
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, registerSuccess } = userRegister

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const name = firstName + ' ' + lastName

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    // only for admin
    //redirect to users list
    //if (!userDetail.isAdmin) {history.push("/");}

    /* if (userDetail && userDetail.isAdmin && registerSuccess) {
      dispatch({ type: USER_REG_REST })
      toast.success('A new user is added!', {
        position: toast.POSITION.BOTTOM_RIGHT
      })
      history.push(redirect)
    } */

    if (registerSuccess) {
      history.push(redirect)
    }
  }, [registerSuccess, redirect, history])

  const submitHandler = (e) => {
    console.log(name)
    e.preventDefault()

    dispatch(register(name, email, password))

    if (registerSuccess) {
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
    }
  }

  return (
    <>
      {/* Page Title */}
      <section className="login-nav-section">
        <div className="auto-container"></div>
      </section>
      {/*End Page Title*/}
      {/* Register Section */}
      <section className="register-section">
        <div className="auto-container">
          <div className="register-box">
            {/* Title Box */}
            <div className="title-box">
              <h2>Add New Bootcamp</h2>
              {error && <Message>{error}</Message>}
            </div>
            {/* Login Form */}
            <div className="styled-form">
              <form onSubmit={submitHandler}>
                <div className="row clearfix">
                  {/* Form Group */}
                  <div className="form-group col-lg-6 col-md-12 col-sm-12">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      placeholder="First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  {/* Form Group */}
                  <div className="form-group col-lg-6 col-md-12 col-sm-12">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      placeholder="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                  {/* Form Group */}
                  <div className="form-group col-lg-6 col-md-12 col-sm-12">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      placeholder="abcd@gmail.com"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {/* Form Group */}
                  <div className="form-group col-lg-6 col-md-12 col-sm-12">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="+1 (800) 123-4567"
                      required
                    />
                  </div>
                  {/* Form Group */}
                  <div className="form-group col-lg-6 col-md-12 col-sm-12">
                    <label>Password</label>
                    <span className="eye-icon flaticon-eye" />
                    <input
                      type="password"
                      name="password"
                      value={password}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {/* Form Group */}
                  <div className="form-group col-lg-6 col-md-12 col-sm-12">
                    <label>Confirm Password</label>
                    <span className="eye-icon flaticon-eye" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                
                  <div className="form-group col-lg-12 col-md-12 col-sm-12 text-center">
                    <button type="submit" className="theme-btn btn-style-three">
                      <span className="txt">
                        Create <i className="fa fa-angle-right" />
                      </span>
                    </button>
                  </div>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    
    </>
  )
}
