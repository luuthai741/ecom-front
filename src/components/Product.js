import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { currencyFomatter } from '../utils/currencyUtils';
const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product.id}`}>
        <Card.Img style={{ width: '200px', height: '180px' }} src={product.imageURL} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product.id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>


        <Card.Text as='h5'>{currencyFomatter(product.price)}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
