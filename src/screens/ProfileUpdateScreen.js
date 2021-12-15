import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { currencyFomatter } from '../utils/currencyUtils';
import { dateFomatter } from '../utils/dateUtils';
import FormContainer from '../components/FormContainer'
import Meta from '../components/Meta';
import AddressForm from '../components/AddressForm'

const ProfileScreen = ({ location, history }) => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [message, setMessage] = useState(null)
  const [address, setAddress] = useState('')
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserProfile({
      userId: userInfo.id,
      phonenumber,
      address,
      firstname,
      lastname
    }))
    history.push('/profile')
  }
  return (
    <FormContainer>
      <Meta title={'Cập nhật thông tin'} />
      <h1>Thông tin</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading ? <Loader /> : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='firstname'>
            <Form.Label>Họ và tên đệm người dùng</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nhập tên tài khoản'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='lastname'>
            <Form.Label>Tên người dùng</Form.Label>
            <Form.Control
              type='lastname'
              placeholder='Nhập địa chỉ email'
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nhập số điện thoại'
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <AddressForm setAddress={setAddress} />
          <Button className="mt-3" type='submit' variant='primary'>
            Cập nhật
          </Button>
        </Form>
      )}
    </FormContainer>
  )
}

export default ProfileScreen
