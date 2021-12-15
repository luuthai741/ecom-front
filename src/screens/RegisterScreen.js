import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import Meta from '../components/Meta';
import AddressForm from '../components/AddressForm'

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { userInfo } = useSelector(state => state.userLogin)
  const { loading, error, message: registerSuccess } = userRegister


  useEffect(() => {
    if (userInfo) {
      history.push("/")
    }
  }, [userInfo, registerSuccess])


  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Mật khẩu không khớp')
    } else {
      dispatch(register({
        username,
        email,
        password
      }))
    }

  }
  return (
    <FormContainer>
      <Meta title={'Đăng ký'} />
      <h1>Đăng ký</h1>
      {registerSuccess && <Message variant='success'>{registerSuccess}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading ? <Loader /> : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Tên tài khoản</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nhập tên tài khoản'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Địa chỉ email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Nhập địa chỉ email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type='password'
              placeholder='Nhập mật khẩu'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Xác nhận mật khẩu</Form.Label>
            <Form.Control
              type='password'
              placeholder='Vui lòng nhập lại mật khẩu'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
            <div>{message}</div>
          </Form.Group>

          <Button className="mt-3" type='submit' variant='primary'>
            ĐĂNG KÝ
          </Button>
        </Form>
      )}

      <Row className='py-3'>
        <Col>
          Bạn đã có tài khoản?{' '}
          <Link to='/login'>
            Đăng nhập
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
