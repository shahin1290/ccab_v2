import React, { useContext, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../../layout/Header'
import Footer from './../../layout/Footer'

const MentorRoute = ({ component: Component, ...rest }) => {
  //logout()
  //console.log(`isAuth: ${isauthenticated} , isLoading : ${isLoading} success: ${isSuccess}`);

  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin
  let Token = userDetail.token

  useEffect(() => {
   console.log('userDetail',userDetail);
    console.log((Token && userDetail.user_type =='StudentUser')||!Token );
  }, [userDetail])

  return (
    <>
      <Header/>
    <Route
      {...rest}
      render={(props) =>
       ( Token && userDetail.user_type =='StudentUser')||!Token? (
          // <Redirect to="/login" />
          <>
          </>
        ) : (
          <div className=" container">
              {/* hide on mobile */}

              <Component {...props} />
            </div>
          )
        }
      />
      <Footer />
    </>
  )
}

export default MentorRoute
