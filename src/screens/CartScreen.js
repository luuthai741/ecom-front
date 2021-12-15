import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart, updateCartItem, saveShippingAddress } from '../actions/cartActions'
import { currencyFomatter } from '../utils/currencyUtils';

const CartScreen = ({ match, location, history }) => {
  const cart = useSelector((state) => state.cart)
  const { userInfo } = useSelector(state => state.userLogin);
  const { user } = useSelector(state => state.userDetails)
  const { customer, cartItems } = cart;
  const dispatch = useDispatch();
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
    console.log(`Delete item ${id} from cart `);
  }
  const checkoutHandler = () => {
    if (!customer || !userInfo) {
      history.push('/customer');
    }
    if (userInfo && !user) {
      history.push("/shipping")
    }
  }

  const changeQty = (id, e) => {
    dispatch(updateCartItem(id, e.target.value))
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Giỏ hàng</h1>
        {cartItems.length === 0 ? (
          <Message>
            Bạn chưa thêm sản phẩm nào vào giỏ hàng <Link to='/'>Bắt đầu mua hàng</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={2}>
                    <Image style={{ maxWidth: "80px", height: "80px" }} src={item.imageURL} alt={item.imageName} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{currencyFomatter(item.price)}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        changeQty(item.id, e)
                      }
                    >
                      {[...Array(item.quantity).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      {cartItems.length > 0 ? (
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>
                  Tổng giá tiền ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  sản phẩm
                </h3>

                {currencyFomatter(cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0))
                }
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  onClick={() => checkoutHandler()}
                >
                  Thanh toán
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      ) : ""}
    </Row>
  )
}

export default CartScreen
