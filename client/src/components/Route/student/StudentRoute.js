import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import {useSelector } from 'react-redux'
import Header from '../../layout/Header'
import Footer from './../../layout/Footer'

const StudentRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin;
   let Token = userDetail.token;
   console.log(Token);
  //logout()
  //console.log(`isAuth: ${isauthenticated} , isLoading : ${isLoading} success: ${isSuccess}`);
  return (
    <>
      <Header />
      <Route
        {...rest}
        render={(props) =>
          !Token ? (
            <Redirect to="/login" />
          ) : (
            <div className=" page-wrapper">
              <Component {...props} />
            </div>
          )
        }
      />

<Footer/>
    </>
  )
}

export default StudentRoute
