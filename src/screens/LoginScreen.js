import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import Meta from '../components/Meta';

const LoginScreen = ({ location, history }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [userInfo, loading])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login({
      username,
      password
    }))
  }
  return (
    <FormContainer>
      <Meta title={'Đăng nhập'} />
      <h1>ĐĂNG NHẬP</h1>

      {
        loading ? <Loader /> : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <Form.Label>Tên tài khoản</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nhập tên tài khoản'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            <Button className="mt-3" type='submit' variant='primary'>
              Đăng nhập
            </Button>
          </Form>
        )
      }
      {error && error === "Bad credentails" && < Message variant='danger'>Tài khoản hoặc mật khẩu sai</Message>}
      <Row className='py-3'>
        <Col>
          Bạn chưa có tài khoản?
          <Link to='/register'>
            Đăng ký
          </Link>
        </Col>
      </Row>
    </FormContainer >
  )
}

export default LoginScreen
