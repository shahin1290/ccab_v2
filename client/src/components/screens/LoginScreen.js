import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../layout/Message'
import FormContainer from '../layout/FormContainer'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../layout/Loader'
import 'react-toastify/dist/ReactToastify.css'
import { login } from '../../redux/actions/userAction'

export default function LoginScreen({ location }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userDetail, error, loginSuccess } = userLogin

  // initializing componet level state

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const redirect = location.search ? location.search.split('=')[1] : '/profile'

  useEffect(() => {
    if (userDetail && userDetail.name) {
      history.push(redirect)
    } else {
      history.push('/login')
    }
  }, [history, userDetail, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <>
      {/*End Page Title*/}
      {/* Login Section */}
      <section className="login-section">
        <div className="auto-container">
          <div className="login-box">
            {/* Title Box */}
            <div className="title-box">
              <h2>Login</h2>
              <div className="text">
                <span className="theme_color">Welcome!</span> Please confirm
                that you are visiting
              </div>
            </div>
            {/* Login Form */}
            <div className="styled-form">
              {error && <Message>{error}</Message>}
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <span className="eye-icon flaticon-eye" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group text-center">
                  <button
                    type="submit"
                    className="theme-btn btn-style-three  mt-4"
                  >
                    <span className="txt">
                      Login <i className="fa fa-angle-right" />
                    </span>
                  </button>
                </div>
                <div className="form-group ">
                  <div className="users">
                    New User? <a href="/get-start">Sign Up</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* End Login Section */}
    </>
  )
}
