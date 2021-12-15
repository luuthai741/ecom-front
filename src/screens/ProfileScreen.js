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
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { loading, user } = useSelector(state => state.userDetails);
  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    dispatch(getUserDetails(userInfo.id))
  }, [userUpdateProfile])
  const redirect = () => {
    history.push("/profile/update");
  }
  return (
    <FormContainer>
      <Meta title={'Thông tin người dùng'} />
      <h1>Thông tin</h1>
      {loading ? <Loader /> :
        !user ? (
          <div>
            <h3>Bạn chưa cập nhật thông tin</h3>
          </div>
        ) :
          (
            <div>
              <div>
                <span>
                  <h5>Họ và tên:</h5>
                  <strong>{`${user.firstname} ${user.lastname}`}</strong>
                </span>
              </div>
              <div>
                <span>
                  <h5>Số điện thoại:</h5>
                  <strong>{`${user.phonenumber}`}</strong>
                </span>
              </div>
              <div>
                <span>
                  <h5>Địa chỉ:</h5>
                  <strong>{`${user.address}`}</strong>
                </span>
              </div>
            </div>
          )
      }
      <Button className="mt-3" type='submit' variant='primary' onClick={() => redirect()}>
        &gt; Cập nhật thông tin
      </Button>
    </FormContainer>
  )
}

export default ProfileScreen
