import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { topProducts } from '../actions/productActions'
import { currencyFomatter } from '../utils/currencyUtils'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const topProductsList = useSelector((state) => state.topProducts)
  const { loading, error, products } = topProductsList
  useEffect(() => {
    dispatch(topProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel className='bg-dark'>
      {products.map((product, index) => (
        <Carousel.Item key={index}>
          <Link to={`/product/${product.id}`}>
            <Image src={product.imageURL} alt={product.iamgeName} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} ({currencyFomatter(product.price)})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
