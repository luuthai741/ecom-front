import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import Meta from '../components/Meta';
import AddressForm from '../components/AddressForm'

const ShippingScreen = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { user } = useSelector(state => state.userDetails)
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();

  if (user && userInfo) {
    history.push("/payment")
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress(address))
    history.push('/payment');
  }

  return (
    <FormContainer>
      <Meta title={"Vận chuyển"} />
      <CheckoutSteps step1 step2 />
      <h1>VẬN CHUYỂN</h1>
      <AddressForm setAddress={setAddress} />
      <Form onSubmit={submitHandler}>
        <Button className="mt-2" type='submit' variant='primary'>
          Tiếp tục
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
