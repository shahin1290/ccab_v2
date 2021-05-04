import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import AdminHeader from './../../layout/headers/AdminHeader'
import Footer from './../../layout/Footer'
const AdminRoute = ({ component: Component, ...rest }) => {
 
    const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin;
   let Token = userDetail.token;

  //logout()
  //console.log(`isAuth: ${isauthenticated} , isLoading : ${isLoading} success: ${isSuccess}`);
  return (
    <Route
      {...rest}
      render={(props) =>
        ( Token && userDetail.user_type !=='AdminUser')||!Token? (
          <Redirect to="/login" />
        ) : ( <>
          
            <AdminHeader/>
      
          <div className=" page-wrapper">
            
              {/* hide on mobile */}

              <Component {...props} />
           
          </div>
          <Footer/>
          </>
        )
      }
    />
  )
}

export default AdminRoute
