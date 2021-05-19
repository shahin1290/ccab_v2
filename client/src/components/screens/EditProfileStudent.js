import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userProfileUpdate, getProfile } from '../../redux/actions/userAction'
import { useHistory } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import Message from '../layout/Message'
import CropImage from '../layout/CropImage'

export default function EditProfile() {
  const dispatch = useDispatch()
  const history = useHistory()

  const {
    loading,
    user,
    error: getuserProfileErr
  } = useSelector((state) => state.userProfile)
  const { userDetail } = useSelector((state) => state.userLogin)
  const { updateSuccess, error } = useSelector((state) => state.userUpdate)

  const [selectedImageFile, setSelectedImageFile] = useState()
  const [file, setFile] = React.useState()
  const [preview, setPreview] = React.useState()

  const onCropSave = ({ file, preview }) => {
    setPreview(preview)
    setFile(file)
    setPreview(preview)
    setFile(file)
  }
  const onDrop = React.useCallback((acceptedFiles) => {
    const fileDropped = acceptedFiles[0]
    if (fileDropped['type'].split('/')[0] === 'image') {
      setSelectedImageFile(fileDropped)
      return
    }
    setFile(fileDropped)
    const previewUrl = URL.createObjectURL(fileDropped)
    setPreview(previewUrl)
  })

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop
  })

  const { ref, ...rootProps } = getRootProps()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const name = firstName + ' ' + lastName

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  useEffect(() => {
    if (user && user.name) {
      setUserData()
    }
  }, [user])

  const setUserData = () => {
    const givenFirstName = user.name.split(' ').slice(0, -1).join(' ')
    const givenLastName = user.name.split(' ').slice(-1).join(' ')
    setFirstName(givenFirstName)
    setLastName(givenLastName)
    setEmail(user.email)
    setPhoneNumber(user.phone)
  }
  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('avatar', file)
    formData.append('email', email)
    formData.append('name', name)
    formData.append('phoneNumber', phoneNumber)

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }

    dispatch(userProfileUpdate(formData))
    /*  if (updateSuccess) {
      history.push('/profile')
    } */
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
            {/* Image Section */}
            <div className="image-column col-lg-3 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="image">
                  <img
                    onLoad={() => URL.revokeObjectURL(preview)}
                    src={
                      preview
                        ? preview
                        : user.avatar
                        ? `/uploads/Avatar/${user.avatar}`
                        : 'https://via.placeholder.com/200x112'
                    }
                    alt="avatar"
                  />
                </div>
                <div rootRef={ref}>
                  <div
                    {...rootProps}
                    style={{
                      height: 100,
                      background: '#efefef',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderStyle: 'dashed',
                      borderColor: '#aaa',
                      cursor: 'pointer'
                    }}
                  >
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop image file here, or click to select file
                    </p>
                  </div>
                </div>
                {/*  <a href="#" className="theme-btn btn-style-three">
                  <span className="txt">
                    Upload Picture <i className="fa fa-angle-right" />
                  </span>
                </a>
                <a href="#" className="theme-btn btn-style-two">
                  <span className="txt">
                    Delete Picture <i className="fa fa-angle-right" />
                  </span>
                </a> */}
              </div>
            </div>
            {/* Content Section */}
            <div className="content-column col-lg-9 col-md-12 col-sm-12">
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
                            {error ? (
                              <p className="text-danger bg-light p-2 ">
                                {error}
                              </p>
                            ) : updateSuccess ? (
                              <p className="text-success bg-light p-2 ">
                                Profile Updated successfully
                              </p>
                            ) : null}
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
        <CropImage onSave={onCropSave} selectedFile={selectedImageFile} />
      </section>
      {/* End Profile Section */}
    </>
  )
}
