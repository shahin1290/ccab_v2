import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userProfileUpdate,getProfile } from '../../redux/actions/userAction'
import { useHistory } from 'react-router-dom'
import Message from '../layout/Message'

export default function EditProfile() {
  const dispatch = useDispatch()
  const history = useHistory()


  const { loading, user, error:getuserProfileErr } = useSelector((state) => state.userProfile)
  const { userDetail } = useSelector((state) => state.userLogin)
  const { updateSuccess, error } = useSelector((state) => state.userUpdate)

  



  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const name = firstName + ' ' + lastName



  useEffect(()=>{
    dispatch(getProfile())
  },[dispatch])

  useEffect(() => {
    if (user&& user.name) {
      setUserData()
      console.log(user);
    }
  
  }, [user])

  const setUserData =()=>{
    const givenFirstName = user.name.split(' ').slice(0, -1).join(' ')
    const givenLastName = user.name.split(' ').slice(-1).join(' ')
    setFirstName(givenFirstName)
    setLastName(givenLastName)
    setEmail(user.email)
    setPhoneNumber(user.phone)
  }
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(userProfileUpdate({ name, email, phoneNumber }))
    if (updateSuccess) {
        history.push('/profile')
      }
  }

  return (
    <>
      {/* Edit Profile Section */}
      <section
        className="edit-profile-section "
        style={{ paddingTop: 140 + 'px' }}
      >
        <div
          className="patern-layer-one paroller"
          data-paroller-factor="0.40"
          data-paroller-factor-lg="0.20"
          data-paroller-type="foreground"
          data-paroller-direction="vertical"
          style={{ backgroundImage: 'url(images/icons/icon-1.png)' }}
        />
        <div
          className="patern-layer-two paroller"
          data-paroller-factor="0.40"
          data-paroller-factor-lg="-0.20"
          data-paroller-type="foreground"
          data-paroller-direction="vertical"
          style={{ backgroundImage: 'url(images/icons/icon-2.png)' }}
        />
        <div className="auto-container">
          <div className="row clearfix">
          
     
            {/* Content Section */}
            <div className="content-column col-lg-12 col-md-12 col-sm-12">
              <div className="inner-column">
                {/* Edit Profile Info Tabs*/}
                <div className="edit-profile-info-tabs">
                  {/* Profile Tabs*/}
                  <div className="edit-profile-tabs tabs-box">
                    {/*Tab Btns*/}
                    <ul className="tab-btns tab-buttons clearfix">
                      <li
                        data-tab="#prod-overview"
                        className="tab-btn active-btn"
                      >
                        Overview
                      </li>
               
                    </ul>
                    {/*Tabs Container*/}
                    <div className="tabs-content">
                      {/*Tab / Active Tab*/}
                      <div className="tab active-tab" id="prod-overview">
                        <div className="content">
                          {/* Title Box */}
                          <div className="title-box">
                            <h5>Edit Profile</h5>
                          </div>
                          {/* Profile Form */}
                          <div className="profile-form">
                            {error && <Message>{error}</Message>}
                            {/* Profile Form */}
                            <form onSubmit={submitHandler}>
                              <div className="row clearfix">
                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                  <input
                                    type="text"
                                    name="firstName"
                                    value={firstName}
                                    placeholder="First Name"
                                    onChange={(e) =>
                                      setFirstName(e.target.value)
                                    }
                                    required
                                  />
                                  <span className="icon flaticon-edit-1" />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                  <input
                                    type="text"
                                    name="lastName"
                                    value={lastName}
                                    placeholder="Last Name"
                                    onChange={(e) =>
                                      setLastName(e.target.value)
                                    }
                                    required
                                  />
                                  <span className="icon flaticon-edit-1" />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                  <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                  />
                                  <span className="icon flaticon-edit-1" />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                  <input
                                    type="text"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    placeholder="Phone"
                                    onChange={(e) =>
                                      setPhoneNumber(e.target.value)
                                    }
                                    required
                                  />
                                  <span className="icon flaticon-edit-1" />
                                </div>
                         
                       
                                <div className="col-lg-12 col-md-12 col-sm-12 form-group text-right">
                  
                                  <button
                                    className="theme-btn btn-style-three"
                                    type="submit"
                                    name="submit-form"
                                  >
                                    <span className="txt">
                                      Save Change{' '}
                                      <i className="fa fa-angle-right" />
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
               
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Profile Section */}
    </>
  )
}
