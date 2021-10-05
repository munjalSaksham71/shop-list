import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listShopDetails, deleteShop } from '../actions/shopActions'
import { Button } from 'react-bootstrap'

const ShopDetailsScreen = ({ match, history }) => {

  const dispatch = useDispatch()

  const shopDetails = useSelector((state) => state.shopDetails)
  const { loading, error, shop } = shopDetails

  const shopDelete = useSelector((state) => state.shopDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = shopDelete

  const deleteHandler = (e) => {
    e.preventDefault()
    dispatch(deleteShop(match.params.id))
  }

  console.log(shop)
  useEffect(() => {
    if(successDelete){
      history.push('/')
    } else {
      dispatch(listShopDetails(match.params.id))
    }
  }, [dispatch, match, successDelete, history])

  return (
    <>
     <div className="mt-5">
            <Link className='btn btn-light mb-5 my-3 border border-dark' to='/'>
              Go Back
            </Link>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            <h2>Detail About Shop</h2>
            <p>Shop Name: {shop.name}  </p> <br />
            <p>Shop Area: {shop.area} </p> <br />
            <p> Shop Category: {shop.category} </p> <br/>
            <p>Opening Date:  {shop.openingDate} </p> <br/>
            <p>Closing Date:{shop.closingDate} </p>

            <Button className='btn btn-danger mb-5 m-3' onClick={deleteHandler}>
              Delete
            </Button>

            <Link className='btn btn-primary mb-5 my-3' to={`/shop/${shop._id}/edit`}>
              Edit
            </Link>
      </div>
    </>
  )
}

export default ShopDetailsScreen