import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  orderDetail
} from '../actions/orderActions'
import { currencyFomatter } from '../utils/currencyUtils'
const OrderScreen = ({ history }) => {
  const { id } = useParams();
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const handleStatus = (status) => {
    if (status === 0) {
      return "Đang xử lý đơn hàng";
    }
    if (status === 1) {
      return "Đang vận chuyển";
    }
    else {
      return "Giao hàng thành công";
    }
  }
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    else {
      dispatch(orderDetail(id))
    }
  }, [])
  return (
    loading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) :
      <>
        <h1>Đơn hàng {id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Thông tin khách hàng</h2>
                <p>
                  <strong>Họ và tên : </strong> {order.username}
                  - {order.phonenumber}
                </p>
                <p>
                  <strong>Địa chỉ Email: </strong>{' '}
                  <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
                </p>
                <p>
                  <strong>Địa chỉ:</strong>
                  {order.address}
                </p>
                {handleStatus(order.status)}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Phương thức thanh toán</h2>
                <p>
                  <strong>{order.paymentMethod}</strong>

                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Chi tiết đơn hàng</h2>
                {!order.cartItems ? (
                  <Message>Chưa có sản phẩm trong đơn hàng</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {order.cartItems && order.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.imageURL}
                              alt={item.productName}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.productId}`}>
                              {item.productName}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.quantity} x {currencyFomatter(item.itemPrice)} = {currencyFomatter(item.quantity * item.itemPrice)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Tổng đơn hàng</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Giá sản phẩm</Col>
                    <Col>{currencyFomatter(order.total)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Vận chuyển</Col>
                    <Col>{currencyFomatter(order.shippingCost)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tổng đơn hàng</Col>
                    <Col>{currencyFomatter(order.total + order.shippingCost)}</Col>
                  </Row>
                </ListGroup.Item>
                {/* {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )} */}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
  )
}

export default OrderScreen
