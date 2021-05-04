import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPlayer from 'react-player'
import { useHistory } from 'react-router-dom'
import { getDayDetails, updateDay } from '../../../redux/actions/dayAction'
import Message from '../../layout/Message'
import Loader from '../../layout/Loader'
import { Modal } from 'react-bootstrap'

export default function UpdateMentorCourse({ match }) {
  const dispatch = useDispatch()

  const { day, loading: dayLoading, error: dayError } = useSelector(
    (state) => state.dayDetails
  )

  const {
    loading: updateLoading,
    error: updateError,
    success: UpdateSuccess
  } = useSelector((state) => state.dayUpdate)

  const { weekId, id } = match.params

  useEffect(() => {
    dispatch(getDayDetails(weekId, id))
  }, [dispatch, weekId, id])

  const findElementText = (el) => {
    if (day.name) {
      const sourceCode = day.source_code

      if (sourceCode.length > 0) {
        const elementType = sourceCode.find((a) => a.element_type === el)
        if (elementType) {
          return elementType.element_text
        } else {
          return null
        }
      }
    } return ''
  }
  useEffect(() => {
    

    setName(day.name)
    setDescription(findElementText('description'))
    setTitle(findElementText('title'))
    setCode(findElementText('code'))
    setImage(findElementText('image'))
    setVideo(day.video_path)
  }, [weekId, id, day])

  //video show
  const [showVideo, setShowVideo] = useState(false)
  const handleCloseVideo = () => {
    setShowVideo(false)
  }
  const handleOpenVideo = () => {
    setShowVideo(true)
  }


  //form submission
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [code, setCode] = useState('')
  const [image, setImage] = useState('')
  const [video, setVideo] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('video_path', video)
    data.append('element_text', image)
    data.append('name', name)
    data.append('title', title)
    data.append('description', description)
    data.append('code', code)

    dispatch(updateDay(weekId, id, data))
  }

  return (
    <>
      {/* <!-- Edit Cource Section --> */}
      <div className="edit-cource-section">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title">
            <div className="clearfix">
              <div className="pull-left">
                <h4>Edit Content</h4>
              </div>
            </div>
          </div>
          {updateError ? (
            <p className="text-danger bg-light p-2 ">{updateError}</p>
          ) : UpdateSuccess ? (
            <p className="text-success bg-light p-2 ">
              Day Updated successfully
            </p>
          ) : null}
          <div className="inner-container">
            <div className="row clearfix">
              <form onSubmit={submitHandler} style={{ display: 'flex' }}>
                {/* Left Column */}
                <div className="left-column col-lg-8 col-md-12 col-sm-12">
                  <div className="inner-column">
                    {/* Edit Course Form */}
                    <div className="edit-course-form">
                      {/* Form Group */}
                      <div className="form-group">
                        <label>Name of Content</label>
                        <input
                          type="text"
                          name="name"
                          value={name}
                          placeholder="Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <h5>Add Section </h5>

                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          name="title"
                          value={title}
                          placeholder="Title"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          type="text"
                          name="description"
                          value={description}
                          placeholder="Description"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label>Code</label>

                        <textarea
                          type="text"
                          name="code"
                          value={code}
                          placeholder="Code"
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>

                      <div>
                        <label>Image</label>
                        <input
                          type="file"
                          name="image"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                        <span className="valid">Upload Image here</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right Column */}
                <div className="right-column col-lg-4 col-md-12 col-sm-12">
                  <div className="inner-column">
                    <h6>Video</h6>
                    {/* Video Box */}
                    <div
                      className="video-boxed"
                      style={{
                        backgroundImage:
                          'url(images/resource/video-image-3.jpg)'
                      }}
                    >
                      <a
                        onClick={() => {
                          handleOpenVideo()
                        }}
                        className="lightbox-image intro-video-box"
                      >
                        <span className="fa fa-play">
                          <i className="ripple" />
                        </span>
                      </a>
                    </div>
                    {/* video Modal */}
                    <Modal
                      show={showVideo}
                      onHide={handleCloseVideo}
                      size="lg"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Watch Video</Modal.Title>
                      </Modal.Header>
                      <Modal.Body className=" m-auto">
                        {/* {(AddnewCourseErr|| AddError)&&<Message variant="danger">{AddnewCourseErr||AddError}</Message>} */}
                        <ReactPlayer url={video} controls></ReactPlayer>
                      </Modal.Body>
                      <Modal.Footer></Modal.Footer>
                    </Modal>
                    {/* End Video Box */}

                    {/* Url Box */}
                    <div className="url-boxed">
                      <label>URL</label>
                      <input
                        type="text"
                        name="video"
                        value={video}
                        defaultValue
                        placeholder="https://www.youtube.com/dummy-video.com"
                        onChange={(e) => setVideo(e.target.value)}
                      />
                      <span className="valid">Enter valid url address</span>
                    </div>

                    {/* End Url Box */}

                    {/* Button Box */}
                  </div>

                  <div className="button-box text-center">
                    <button type="submit" className="theme-btn btn-style-one">
                      <span className="txt">Save Changes</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* End Manage Cource Section */}
    </>
  )
}
