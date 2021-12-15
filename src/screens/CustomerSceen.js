import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails } from '../actions/userActions'
import { saveCustomer } from '../actions/cartActions'
import Meta from '../components/Meta';

const LoginScreen = ({ location, history }) => {
    const [username, setUsername] = useState('')
    const [phonenumber, setPhonenumber] = useState('');
    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.userLogin);
    const { user } = useSelector(state => state.userDetails);

    useEffect(() => {
        if (userInfo) {
            dispatch(getUserDetails(userInfo.id))
        }
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            saveCustomer({
                username,
                phonenumber
            })
        )
        history.push('/shipping')
    }

    return (
        <FormContainer>
            <Meta title={'Đăng nhập'} />
            <h1>THÔNG TIN KHÁCH HÀNG</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Họ và tên người đặt hàng</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Nhập họ và tên'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Nhập số điện thoại liên hệ'
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button className="mt-3" type='submit' variant='primary'>
                    Tiếp theo
                </Button>
                <Row className='py-3'>
                    <Col>
                        Bạn đã có tài khoản?{' '}
                        <Link to='/login'>
                            Đăng nhập
                        </Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen
