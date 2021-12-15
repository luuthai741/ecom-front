import React, { useEffect } from 'react'
import { LinkContainer, } from 'react-router-bootstrap'
import { useParams } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { currencyFomatter } from '../utils/currencyUtils'
import Meta from '../components/Meta'
import { Form } from 'react-bootstrap'
import {
  listProducts,
  deleteProduct,
  updateTopProducts
} from '../actions/productActions'

const ProductListScreen = ({ history, match }) => {
  const params = useParams();
  const keyword = params.keyword ? params.keyword : "";
  const page = params.currentPage ? params.currentPage : 1;

  const dispatch = useDispatch()

  const { updateProduct, updateError } = useSelector((state) => state.updateTopProduct)

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, currentPage, pages } = productList

  const productDelete = useSelector((state) => state.productDelete)

  const { deleteLoading, deletedSuccess, deleteError, deleteMessage } = productDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  useEffect(() => {
    if (userInfo && !userInfo.roles.includes('ROLE_ADMIN')) {
      history.push('/');
    }
    if (!userInfo || !userInfo.roles.includes('ROLE_ADMIN')) {
      history.push('/login');
    }
    console.log(`render listProducts`);
    dispatch(listProducts(keyword, page))
  }, [deletedSuccess, updateProduct, keyword, page])

  const deleteHandler = (id) => {
    if (window.confirm('Bạn chắc là muốn xoá sản phẩm này chứ?')) {
      dispatch(deleteProduct(id))
    }
  }

  const handleUpdateTopProduct = (id, e) => {
    let value = e.target.checked;
    dispatch(updateTopProducts({
      id,
      topStatus: value
    }))
  }
  return (
    <>
      <Meta title="Quản trị sản phẩm" />
      <Row className='align-items-center'>
        <Col>
          <h1>DANH SÁCH SẢN PHẨM</h1>
        </Col>
        <Col className='text-right'>
          <LinkContainer to={`/admin/products/add`}>
            <Button className='my-3'>
              + Thêm sản phẩm
            </Button>
          </LinkContainer>

        </Col>
      </Row>
      {deleteLoading && <Loader />}
      {deleteError && <Message variant='danger'>{deleteError}</Message>}
      {updateError && <Message variant='danger'>{updateError}</Message>}
      {deletedSuccess && <Message variant='success'>{deleteMessage}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên sản phẩm</th>
                <th>Giá sản phẩm</th>
                <th>Số lượng</th>
                <th>Trạng thái</th>
                <th>Trên</th>
                <th>Thời gian tạo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{currencyFomatter(product.price)}</td>
                  <td>{product.quantity}</td>
                  <td>{product.status ? "Còn hàng" : "Hết hàng"}</td>
                  <td><Form.Group controlId='status'>
                    <Form.Check
                      type='checkbox'
                      checked={product.top}
                      onChange={(e) => handleUpdateTopProduct(product.id, e)}
                    ></Form.Check>
                  </Form.Group>{product.top ? "Kích hoạt" : "Ngưng"}</td>
                  <td>{product.createTime}</td>
                  <td>
                    <LinkContainer to={`/admin/products/${product.slug}/${product.id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product.id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={currentPage} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductListScreen
