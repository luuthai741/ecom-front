import React, { useEffect, useState } from 'react'
import Message from '../components/Message'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { getComments, addComment } from '../actions/commentActions'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap'
import Loader from './Loader'
const Comment = ({ productId, comments, userInfo }) => {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch();
    const { createdComment, addLoading } = useSelector(state => state.comments);
    useEffect(() => {
        // console.log(`re-render`);
    }, [createdComment])
    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(
            addComment({
                userId: userInfo.id,
                username: userInfo.username,
                productId: productId,
                content: comment,
                rating: rating
            })
        )
        setComment('');
        setRating(0);
    }
    return (
        <Row>
            <Col md={6}>
                <h2>Đánh giá</h2>
                {!comments && <Message>Chưa có đánh giá nào cho sản phẩm</Message>}
                <ListGroup variant='flush'>
                    {comments && comments.length > 0 && comments.map((comment, index) => (
                        <ListGroup.Item key={index}>
                            <strong>{comment.username}</strong>
                            <Rating value={comment.rating} />
                            <p>{comment.createTime}</p>
                            <p>{comment.comment}</p>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                        <h2>Viết bình luận</h2>
                        {createdComment && (
                            <Message variant='success'>
                                Bình luận thành công
                            </Message>
                        )}
                        {addLoading && (<Loader />)}
                        {userInfo ? (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>Đánh giá</Form.Label>
                                    <Form.Control
                                        as='select'
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                    >
                                        <option value=''>Đánh giá...</option>
                                        <option value='1'>1 - Tệ</option>
                                        <option value='2'>2 - Kém</option>
                                        <option value='3'>3 - Bình thường</option>
                                        <option value='4'>4 - Tốt</option>
                                        <option value='5'>5 - Cực tốt</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='comment'>
                                    <Form.Label>Bình luận</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        row='3'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Button
                                    disabled={!comment || !rating}
                                    type='submit'
                                    variant='primary'
                                >
                                    Đăng
                                </Button>
                            </Form>
                        ) : (
                            <Message>
                                Hãy <Link to='/login'>đăng nhập</Link> để viết bình luận{' '}
                            </Message>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    )
}
export default Comment;