import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { productDetails, updateProduct, createProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET, PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'
const ProdutFormScreen = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();

  const [action, setAction] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [status, setStatus] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [description, setDescription] = useState('')

  const detail = useSelector(state => state.productDetails);
  const { loading, product } = detail;
  const productCreate = useSelector(state => state.productCreate);
  let { createLoading, createdSuccess, createdError } = productCreate;

  const productUpdate = useSelector(state => state.productUpdate);
  let { updateLoading, updateSuccess, updateError } = productUpdate;
  // console.log(product);
  const fileHandler = e => {
    const file = e.target.files[0];
    setImage(file)
  }
  const submitHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('status', status);
    formData.append('file', image);
    if (id) {
      console.log(`update`);
      formData.append('id', id);
      dispatch(updateProduct(formData))
    }
    else if (!id) {
      dispatch(createProduct(formData))
      setName('');
      setPrice(0);
      setStatus(false);
      setQuantity(0);
      setDescription('');
    }

  }
  useEffect(() => {
    if (!id) {
      setAction("Thêm");
    }
    if (id) {
      dispatch(productDetails(id));
      setAction("Cập nhật");
    }
  }, [id])
  useEffect(() => {
    console.log(`Re-render after created and create loading`);
  }, [createdSuccess, createLoading])
  useEffect(() => {
    if (id && product) {
      dispatch({
        type: PRODUCT_UPDATE_RESET
      })
      setName(product.name);
      setPrice(product.price);
      setStatus(product.status);
      setQuantity(product.quantity);
      setDescription(product.description);
    }
    else {
      dispatch({
        type: PRODUCT_CREATE_RESET
      })
      return;
    }
  }, [product])

  return loading ? <Loader /> : (
    <>
      {id ? <Meta title="Cập nhật sản phẩm" /> : <Meta title="Thêm sản phẩm" />}
      <Link to='/admin/products' className='btn btn-light my-3'>
        &lt; Trở lại
      </Link>
      {createdSuccess ? <Message variant='success'>Thêm sản phẩm thành công</Message> : ''}
      {createdError ? <Message variant='danger'>Thêm sản phẩm thất bại</Message> : ''}
      {updateSuccess ? <Message variant='success'>Cập nhật sản phẩm thành công</Message> : ''}
      {updateError ? <Message variant='danger'>Cập nhật sản phẩm thất bại</Message> : ''}
      {createLoading || updateLoading ? (
        <Loader />
      ) : <FormContainer>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              type='name'
              placeholder='Nhập tên sản phẩm'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>Giá sản phẩm</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nhập giá sản phẩm'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Ảnh sản phẩm</Form.Label>
            <Form.Control
              type='file'
              placeholder='Chọn ảnh sản phẩm'
              onChange={(e) => fileHandler(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='quantity'>
            <Form.Label>Số lượng sản phẩm</Form.Label>
            <Form.Control
              type='number'
              placeholder='Nhập số lượng sản phẩm'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Mô tả sản phẩm</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nhập mô tả sản phẩm'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='status'>
            <Form.Check
              type='checkbox'
              value={status}
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            ></Form.Check>
            <Form.Label>Trạng thái</Form.Label>
          </Form.Group>
          <Button className="mt-2" type='submit' variant='primary'>
            {action}
          </Button>
        </Form>
      </FormContainer>}
    </>
  )
}

export default ProdutFormScreen
