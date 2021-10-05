import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Product = ({ shop }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Body>
        <Link to={`/shop/${shop._id}`}>
          <Card.Title as='div'>
            <strong>{shop.name}</strong>
          </Card.Title>

        <Card.Text as='div'>{shop.type}</Card.Text>
        <Card.Text as='div'>Click here for more info</Card.Text>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default Product