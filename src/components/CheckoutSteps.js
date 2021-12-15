import React from 'react'
import { Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const { userInfo } = useSelector(state => state.userLogin)
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/customer'>
            <Nav.Link>Thông tin</Nav.Link>
          </LinkContainer>
        ) : (
          ''
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>Vận chuyển</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Vận chuyển</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>Phương thức thanh toán</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Phương thức thanh toán</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>Đặt hàng</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Đặt hàng</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
