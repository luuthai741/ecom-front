import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders, deleteOrder, updateOrder } from '../actions/orderActions'
import { currencyFomatter } from '../utils/currencyUtils';
import { dateFomatter } from '../utils/dateUtils';
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { useParams } from 'react-router-dom'
const OrderListScreen = ({ history }) => {
  const params = useParams();
  const keyword = params.keyword ? params.keyword : "";
  const page = params.currentPage ? params.currentPage : 1;

  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders, currentPage, pages } = orderList
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const ordDelete = useSelector(state => state.orderDelete);
  const { message, error: deleteError, loading: deleteLoading } = ordDelete;
  const ordUpdate = useSelector(state => state.orderUpdate);
  const { error: updateError, loading: updateLoading } = ordUpdate;
  useEffect(() => {
    if (userInfo && userInfo.roles.includes('ROLE_ADMIN')) {
      dispatch(listOrders(keyword, page))
    } else {
      history.push('/login')
    }
  }, [ordDelete, ordUpdate, page, keyword])
  const deleteHandler = (id) => {
    dispatch(deleteOrder(id));
  }

  const onChangeStatus = (id, e) => {
    dispatch(updateOrder({
      orderId: id,
      status: e.target.value
    }))
  }
  return (
    <>
      <Meta title="Quản lý đơn hàng" />
      {deleteError && <Message variant='danger'>{deleteError}</Message>}
      {updateError && <Message variant='danger'>{updateError}</Message>}
      {message && <Message variant='success'>{message}</Message>}
      <h1>DANH SÁCH ĐƠN HÀNG</h1>
      {loading || deleteLoading || updateLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Mã</th>
              <th>Tên khách hàng</th>
              <th>Số điện thoại</th>
              <th>Tình trạng vận chuyển</th>
              <th>Tổng số tiền</th>
              <th>Ngày đặt hàng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 && orders.map((order) => (
              (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.username}</td>
                  <td>{order.phonenumber}</td>
                  <td>
                    <Form.Control
                      as='select'
                      value={order.status}
                      onChange={(e) => onChangeStatus(order.id, e)}
                    >
                      <option value='0'>Đang kiểm tra đơn hàng</option>
                      <option value='1'>Đang vận chuyển</option>
                      <option value='2'>Đã thanh toán</option>
                    </Form.Control>
                  </td>
                  <td>{currencyFomatter(order.total)}</td>
                  <td>{dateFomatter(order.createTime)}</td>
                  <td>
                    <LinkContainer to={`/orders/${order.id}`}>
                      <Button variant='light' className='btn-sm'>
                        Chi tiết
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(order.id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </Table>
      )
      }
      <Paginate pages={pages} page={currentPage} isAdmin={true} />
    </>
  )
}

export default OrderListScreen
