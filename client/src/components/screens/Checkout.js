import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  useStripe,
  useElements,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { createOrder } from '../../redux/actions/orderAction'
import { getCourseDetails } from '../../redux/actions/courseAction'
import Loader from '../layout/Loader'
import { Tabs, Tab, Card } from 'react-bootstrap'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const CheckoutForm = (props) => {
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const ID = props.match.params.bootcampId

  const { course } = useSelector((state) => state.courseDetails)

  useEffect(() => {
    dispatch(getCourseDetails(ID))
  }, [dispatch, ID])

  const { loading, success, error } = useSelector((state) => state.orderCreate)

  const submitHandler = async (e) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement)
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

              <div className="col-lg-12 col-md-12 col-sm-12 form-group">
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
                <Tabs defaultActiveKey="card" transition={false}>
                  <Tab
                    eventKey="card"
                    title="Credit/ Debit card"
                    class="checkout-tabs tabs-box"
                  >
                    <Card>
                      <form
                        className="checkout-info-tabs col-lg-12 col-md-12 col-sm-12"
                        onSubmit={submitHandler}
                        style={{
                          paddingTop: '20px',
                          display: 'grid',
                          'grid-template-columns': '1fr 1fr '
                        }}
                      >
                        <div class="form-group col-lg-6 col-md-12 col-sm-12">
                          <label>Holder Name</label>

                          <div
                            style={{
                              boxShadow: '0px 0px 10px rgba(0,0,0,0.10)',
                              padding: '.3em',
                              backgroundColor: 'white'
                            }}
                          >
                            <input
                              type="text"
                              value={name}
                              placeholder="Emily J Smith"
                              required
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div class="form-group col-lg-6 col-md-12 col-sm-12">
                          <label>Card Number</label>
                          <div
                            style={{
                              boxShadow: '0px 0px 10px rgba(0,0,0,0.10)',
                              padding: '.5em',
                              backgroundColor: 'white'
                            }}
                          >
                            <CardNumberElement />
                          </div>
                        </div>

                        <div class="form-group col-lg-6 col-md-6 col-sm-12">
                          <label>Expiration Date</label>
                          <div
                            style={{
                              boxShadow: '0px 0px 10px rgba(0,0,0,0.10)',
                              padding: '.5em',
                              backgroundColor: 'white'
                            }}
                          >
                            <CardExpiryElement />
                          </div>
                        </div>

                        <div class="form-group col-lg-6 col-md-6 col-sm-12">
                          <label>CVC Code</label>
                          <div
                            style={{
                              boxShadow: '0px 0px 10px rgba(0,0,0,0.10)',
                              padding: '.5em',
                              backgroundColor: 'white'
                            }}
                          >
                            <CardCvcElement />
                          </div>
                        </div>

                        <div style={{ padding: '20px 0' }}>
                          <button
                            className="theme-btn btn-style-one"
                            type="submit"
                            name="submit-form"
                          >
                            <span className="txt">Confirm Checkout</span>
                          </button>
                        </div>
                      </form>
                    </Card>
                  </Tab>
                  <Tab eventKey="bank" title="Bank Transfer"></Tab>
                  <Tab eventKey="paypal" title="Paypal / Payoneer"></Tab>
                </Tabs>
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
