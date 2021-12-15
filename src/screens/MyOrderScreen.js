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

const MyOrderScreen = ({ location, history }) => {
  const dispatch = useDispatch()


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy
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
    } else {
      dispatch(listMyOrders())
    }
  }, [])

  return (
    <Row>
      <Col md={12}>
        <h2>Sản phẩm đặt mua</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Mã</th>
                <th>Tổng giá</th>
                <th>Phương thức</th>
                <th>Vận chuyển</th>
                <th>Ngày mua</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{currencyFomatter(order.total)}</td>
                  <td>
                    {order.paymentMethod}
                  </td>
                  <td>
                    {handleStatus(order.status)}
                  </td>
                  <td>{dateFomatter(order.createTime)}</td>
                  <td>
                    <LinkContainer to={`/orders/${order.id}`}>
                      <Button className='btn-sm' variant='light'>
                        Chi tiết
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default MyOrderScreen
