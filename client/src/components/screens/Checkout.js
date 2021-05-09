import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  useStripe,
  useElements,
  Elements,
  CardElement
} from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { createOrder } from '../../redux/actions/orderAction'
import { getCourseDetails } from '../../redux/actions/courseAction'
import Loader from '../layout/Loader'
import { Tabs, Tab } from 'react-bootstrap'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const CheckoutForm = (props) => {
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()
  const ID = props.match.params.bootcampId

  console.log(ID)

  const [cvc, setCvc] = useState('')
  const [expYear, setExpYear] = useState('')
  const [expMonth, setExpMonth] = useState('')
  const [cardNumber, setCardNumber] = useState('')

  const { course } = useSelector((state) => state.courseDetails)

  useEffect(() => {
    dispatch(getCourseDetails(ID))
  }, [dispatch, ID])

  const { loading, success, error } = useSelector((state) => state.orderCreate)

  const submitHandler = async (e) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

    if (error) {
      return
    } else {
      dispatch(
        createOrder(ID, {
          token: paymentMethod.id,
          amount: course && course.price
        })
      )
    }
  }

  const style = {
    base: {
      fontFamily: 'Nunito , sans-serif',
      fontSize: '1.2rem',
      color: '#495057',
      '::placeholder': {
        color: '#6C757D',
        opacity: 1
      }
    }
  }

  return (
    <div className="sidebar-page-container">
      <div className="auto-container">
        <div className="row clearfix">
          {/* Content Side */}
          <div className="content-side col-lg-9 col-md-12 col-sm-12">
            {/* Sec Title */}
            <div className="sec-title">
              <h4>Checkout</h4>
            </div>
            <div className="checkout-section">
              <h6>Billing Details</h6>

              {/* Checkout Form */}
              <div className="checkout-form">
                <form onSubmit={submitHandler}>
                  <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                      <span className="icon flaticon-edit-3"></span>
                      <textarea
                        className=""
                        name="message"
                        placeholder="Address"
                      ></textarea>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                      <h2>Select Payment Method</h2>

                      {loading && <Loader />}
                      {error ? (
                        <p className="text-danger bg-light p-2 ">{error}</p>
                      ) : success ? (
                        <p className="text-success bg-light p-2 ">
                          Order created successfully
                        </p>
                      ) : null}
                    </div>

                    {/* Signup Info Tabs*/}
                    <div className="checkout-info-tabs col-lg-12 col-md-12 col-sm-12">
                      <Tabs
                        defaultActiveKey="home"
                        transition={false}
                        id="noanim-tab-example"
                      >
                        <Tab eventKey="card" title="Credit/ Debit card">
                          <div className="row clearfix">
                            {/* Form Group */}
                            <div className="form-group col-lg-6 col-md-12 col-sm-12">
                              <label>Holder Name</label>
                              <input
                                type="text"
                                name="username"
                                value=""
                                placeholder="First Name"
                              />
                            </div>

                            {/* Form Group */}
                            <div className="form-group col-lg-6 col-md-12 col-sm-12">
                              <label>Holder Name</label>

                              <CardElement />
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                              <h2>Order Details</h2>
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                              {/* Order Box */}
                              <div className="order-box">
                                <ul>
                                  <li className="clearfix">
                                    Basic Plan{' '}
                                    <span className="pull-right">$29</span>
                                  </li>
                                  <li className="clearfix">
                                    Tax <span className="pull-right">$3</span>
                                  </li>
                                  <li className="clearfix">
                                    <strong>Total</strong>{' '}
                                    <span className="pull-right">$32</span>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 form-group text-right">
                              <button
                                className="theme-btn btn-style-one"
                                type="submit"
                                name="submit-form"
                              >
                                <span className="txt">Confirm Checkout</span>
                              </button>
                            </div>
                          </div>
                        </Tab>
                        <Tab eventKey="bank" title="Bank Transfer"></Tab>
                        <Tab eventKey="paypal" title="Paypal / Payoneer"></Tab>
                      </Tabs>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar Side */}
          <div className="sidebar-side col-lg-3 col-md-12 col-sm-12">
            <aside className="sidebar sticky-top">
              {/* Order Widget */}
              <div className="sidebar-widget order-widget">
                <div className="widget-content">
                  <div className="sidebar-title">
                    <h6>Order Summary</h6>
                  </div>
                  {/* Order Box */}
                  <div className="order-box">
                    <ul>
                      <li className="clearfix">
                        Basic Plan <span className="pull-right">$29</span>
                      </li>
                      <li className="clearfix">
                        Tax <span className="pull-right">$3</span>
                      </li>
                      <li className="clearfix">
                        <strong>Total</strong>{' '}
                        <span className="pull-right">$32</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

const Checkout = (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm {...props} />
  </Elements>
)

export default Checkout
