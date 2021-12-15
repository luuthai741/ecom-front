import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'


const HomeScreen = () => {
  const params = useParams();

  const keyword = params.keyword ? params.keyword : "";
  const currentPage = params.currentPage ? params.currentPage : 1;

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, currentPage))
  }, [keyword, currentPage])


  return (
    <>
      <Meta title={'Trang chủ'} />
      {!keyword ? (
        <ProductCarousel products={products} />
      ) : (
        <Link to='/' className='btn btn-light'>
          &lt; Trở lại
        </Link>
      )}
      {error && <Message>{error}</Message>}
      {loading ? <Loader /> : (products && products.length > 0) ? (
        <>
          <Row>
            {products.map((product, index) => {
              return (
                <Col key={index} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              )
            })}
          </Row>
          <Paginate
            pages={pages}
            currentPage={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      ) : <h1>Không có sẵn sản phẩm nào được thêm vào</h1>}

    </>
  )
}

export default HomeScreen
