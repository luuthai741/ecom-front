import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import Meta from '../components/Meta';
const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress, paymentMethod } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }
  const [method, setMethod] = useState('PayPal')

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(method));
    history.push('/placeorder');
    console.log(paymentMethod);
  }

  return (
    <FormContainer>
      <Meta title={'Phương thức thanh toán'} />
      <CheckoutSteps step1 step2 step3 />
      <h1>PHƯƠNG THỨC THANH TOÁN</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Chọn phương thức</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal hoặc Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PAYPAL'
              checked
              onChange={(e) => setMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='Ship COD'
              id='Stripe'
              name='paymentMethod'
              value='COD'
              onChange={(e) => setMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button className="mt-2" type='submit' variant='primary'>
          Tiếp theo
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
