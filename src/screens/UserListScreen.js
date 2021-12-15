import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'


const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { deleteLoading, deleteSuccess, deleteError } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.roles.includes('ROLE_ADMIN')) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [deleteSuccess, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Bạn chắc muốn xoá người dùng này chứ ?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <h1>Quản lý người dùng</h1>
      {deleteLoading && <Loader />}
      {deleteError && <Message variant='danger'>{deleteError}</Message>}
      {deleteSuccess && <Message variant='success'>{deleteSuccess}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên tài khoản</th>
              <th>Email</th>
              <th>Chức vụ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.roles.map((role, index) => {
                    return (
                      <span key={index}>{role}</span>
                    )
                  })}
                </td>
                <td>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user.id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
