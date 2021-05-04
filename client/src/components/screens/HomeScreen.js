import React, { useEffect } from 'react'
import $ from 'jquery'
import 'malihu-custom-scrollbar-plugin'

// import '../../assets/js/owl'
// import '../../assets/js/wow'
// import '../../assets/js/parallax'
import WOW from 'wowjs'
import { script } from '../../assets/js/script'
import TopCourses from './../layout/TopCourses'
import {Carousel} from 'react-bootstrap'
import CountUp from 'react-countup';
import { useSelector, useDispatch } from 'react-redux'
import {getUesrsNumbers} from './../../redux/actions/userAction'
import ModalVideo from 'react-modal-video'
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
// images 
import image0 from './../../assets/images/header/image-1.jpg'
import image1 from './../../assets/images/header/image-2.jpg'
import image2 from './../../assets/images/header/image-3.jpg'
import image3 from './../../assets/images/image-3.png'
import image4 from './../../assets/images/image-4.png'

export default function HomeScreen({ match }) {

  const dispatch = useDispatch()
  const { courseList, loading, error } = useSelector(
    (state) => state.courseList
  )

  const { usersCount } = useSelector(
    (state) => state.userNumbers
  )

  useEffect(()=>{
    dispatch(getUesrsNumbers()) ;
  },[dispatch])
  console.log(usersCount);
  return (
    <>
      <div className="home">
        
      {/* Education Section Two */}
      <section className="education-section-two  homeContainer">
          <div className="auto-container">
            <div className="row clearfix">
              {/* Image Column */}
              <div className="image-column mt-5 col-lg-7 col-md-12 col-sm-12">
                <div className="inner-column ">
                  <div className="image titlt " data-tilt data-tilt-max={4}>
                      {/* Slider Section */}
                      <div className="container carouselContainer"
                      style={{marginTop:'110px'}}>
                      <Carousel >
                        <Carousel.Item  >
                          <img
                          
                            className="d-block m-auto w-100"
                            src={image0}
                            alt="First slide"
                          />
             
                        </Carousel.Item>
                        <Carousel.Item  >
                          <img
                          
                            className="d-block m-auto w-100"
                            src={image1}
                            alt="Second slide"
                          />

                   
                        </Carousel.Item>
                        <Carousel.Item  >
                          <img
                          
                            className="d-block  w-60  mx-auto w-100"
                            src={image2}
                            alt="Third slide"
                          />

                
                        </Carousel.Item>
                      </Carousel>
                      </div>
                      {/* <img src={image3} className="w-100" /> */}
                  
                  </div>
                </div>
              </div>
              {/* Content Column */}
              <div className="content-column mt-0 col-lg-5 col-md-12 col-sm-12">
                <div className="inner-column">
                  <h2>
                  Learn Full-Stack  <br /> Web Development
                  </h2>
                  <div className="text header-text">
                  Codify College’s Full Stack Web Development Bootcamp is a remote bootcamp for anyone who wants to build apps to solve real-world problems on the web. As a graduate, you’ll have a solid base of fundamental programming and computer science knowledge, as well as experience with languages, frameworks, and libraries that employers demand.                  </div>
                
                  <Link activeClass="active"className="theme-btn btn-style-six" to="HOW-IT-WORKS" spy={true} smooth={true} offset={-100} duration={500} >
                    <span className="txt">Learn More</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
    
        
        {/* End Banner Section */}
      
       {/* How IT Works Section */}
        <section className=" container my-5" id="HOW-IT-WORKS"> 
            <div className="row mb-4">
              <div className="col">
                <h2 className="w-100">HOW it Works</h2>
              </div>
            </div>
            <div className="row  center">

              <div className=" F-box col-sm s12 l3 offset-l1 " >
                
                   <i className="fas fa-calendar-alt big_icon purple"></i>

                        <h3 className="box__h3">Bootcamp schedule</h3>
                        <p className="box_text">Bootcamp starting date: February 2021. Be it Full time or Part time, we offer teaching using modern technologies. Main teaching language is English, however we offer support in Swedish, Arabic, Hindi & German</p>
                        <a href="https://meetings.hubspot.com/sl-melad" target="_blank" className="btn rounded bg-success p-2 text-light">Book a Free Phone Call </a>
                    </div>

                    <div className=" F-box col-sm s12 l3" > 
                        <i className="fas fa-gem big_icon purple"></i>                
                        <h3 className="box__h3">Payment Plan</h3>
                        <p className="box_text">Flexible Payment plans with our partners, also you can benefit from.</p>
                        <a href="https://meetings.hubspot.com/sl-melad" target="_blank" className="btn rounded bg-info  p-2 text-light">Book an Interview! </a>
                    </div>

                    <div className=" F-box col-sm s12 l3" >
                        <i className="fab fa-free-code-camp big_icon purple" ></i>                
                        <h3 className="box__h3">Start with our free course</h3>
                        <p className="box_text">Start with Codify Foundation course, which is currently free. Codify's foundation course is a great opportunity to learn the basics and to enjoy building your first website.</p>
                        <a href="#" className="btn rounded bg-warning p-2 text-dark">Start Now!</a>
                    </div>


                  </div>
        </section>   
        {/*End How IT Works Section */}

        {/* End Education Section Two */}
        <TopCourses></TopCourses>
        {/* Program Section */}
        <section className="program-section">
          <div className="auto-container">
            <div className="row clearfix">
              {/* Content Column */}
              <div className="content-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <h2>
                  Who is this program for ?
                  </h2>
                  <div className="text">
                    <p>
                    People who wish to transition to a career as a Developer or looking to add the latest tech stack to their current skills. 
                    </p>
                    <p>
                    Do you want to accelerate your learning process in a intense and efficient way?
                    </p>
                  </div>
              
                  <Link activeClass="active"className="theme-btn btn-style-six" to="HOW-IT-WORKS" spy={true} smooth={true} offset={-100} duration={500} >
                    <span className="txt">Learn More</span>
                  </Link>
                </div>
              </div>
              {/* Image Column */}
              <div className="image-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="image titlt" data-tilt data-tilt-max={4}>
                
                      <img src={image4} />
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Education Section Two */}


        {/* Achievement Section Two */}
        <section className="achievements-section-two">
          {/* Pattern Layer */}
          <div
            className="pattern-layer"
            style={{ backgroundImage: 'url(images/background/pattern-1.png)' }}
          />
          <div className="auto-container">
            {/* Sec Title */}
            <div className="sec-title style-two light centered mb-5">
              <h2>Our achievements</h2>
           
            </div>
            {/* Fact Counter */}
            <div className="fact-counter-two ">
              <div className="row clearfix">
                {/* Column */}
                <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                  <div
                    className="inner wow fadeInLeft"
                    data-wow-delay="0ms"
                    data-wow-duration="1500ms"
                  >
                    <div className="content">
                      <div className="icon-box">
                        <span className="icon flaticon-course" />
                      </div>
                      <h4 className="counter-title">Total Courses</h4>
                      <div className="count-outer count-box">
                      
                         <CountUp 
                         start={-2}
                         end={courseList.length}
                         duration={2.75}
                         separator=" "
                         decimal=","
                         suffix="+" />
                       
                        
                      </div>
                    </div>
                  </div>
                </div>
                {/* Column */}
                <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                  <div
                    className="inner wow fadeInUp"
                    data-wow-delay="0ms"
                    data-wow-duration="1500ms"
                  >
                    <div className="content">
                      <div className="icon-box">
                        <span className="icon flaticon-course-1" />
                      </div>
                      <h4 className="counter-title">Total Student</h4>
                      <div className="count-outer count-box alternate">
                      <CountUp 
                         start={-2}
                         end={courseList.length}
                         duration={2.75}
                         separator=" "
                         decimal=","
                         suffix="+" />
                        
                      </div>
                    </div>
                  </div>
                </div>
                {/* Column */}
                <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                  <div
                    className="inner wow fadeInRight"
                    data-wow-delay="0ms"
                    data-wow-duration="1500ms"
                  >
                    <div className="content">
                      <div className="icon-box">
                        <span className="icon flaticon-world" />
                      </div>
                      <h4 className="counter-title">Global Position</h4>
                      <div className="count-outer count-box">
                      <CountUp 
                         start={-2}
                         end={4}
                         duration={1.5}
                         separator=" "
                         decimal=","
                         suffix="+" />
                         
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Achievement Section */}
        {/* Video Section Two */}
        <section className="video-section-two mb-5">
          <div className="auto-container">
            {/*Video Box*/}
            <div
              className="video-boxed"
              style={{
                backgroundImage: 'url(https://via.placeholder.com/1170x600)'
              }}
            >
              <a
                href="https://www.youtube.com/watch?v=kxPCFljwJws"
                className="lightbox-image overlay-box"
              >
                <span className="fa fa-play">
                  <i className="ripple" />
                </span>
              </a>
              <h4>
                Watch Intro <br /> Video
              </h4>
            </div>
          </div>
        </section>
        {/* End Video Section Two */}



       
      </div>
    </>
  )
}
