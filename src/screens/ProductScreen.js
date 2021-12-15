import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Comment from '../components/Comment'
import Meta from '../components/Meta'
import {
  productDetails
} from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import { currencyFomatter } from '../utils/currencyUtils';
import { getComments } from '../actions/commentActions'
const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const productDetailsState = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetailsState
  const { comments } = useSelector(state => state.comments);
  const params = useParams();
  const { id } = params;
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const star = (comments) => {
    let result = 0;
    let sum = 0;
    if (comments && comments.length > 0) {
      comments.forEach(x => {
        sum += x.rating;
      })
      result = sum / comments.length;
    }
    return result;
  }
  useEffect(() => {
    if (id) {
      dispatch(productDetails(id));
      dispatch(getComments(id))
    }
  }, [])

  const addToCartHandler = () => {
    dispatch(addToCart(id, qty));
    history.push(`/cart`)
  }
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        &lt; Trở lại
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image style={{ height: '300px', maxWidth: '300px' }} src={product.imageURL} alt={product.imageName} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={star(comments)}
                    text={comments && comments.length > 0 ? `${comments.length} đánh giá` : 'Chưa có đánh giá'}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Giá:{currencyFomatter(product.price)}</ListGroup.Item>
                <ListGroup.Item>
                  Mô tả sản phẩm: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Trạng thái:</Col>
                      <Col>
                        {product.status ? 'Còn hàng' : 'Hết hàng'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.quantity > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Số lượng</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.quantity).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={!product.status}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Comment productId={id} userInfo={userInfo} comments={comments} />
        </>
      )}
    </>
  )
}

export default ProductScreen
