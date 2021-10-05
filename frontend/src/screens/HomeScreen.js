import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Shop from '../components/Shop'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useHistory } from "react-router-dom";
import {
  listShops,
  createShop,
} from "../actions/shopActions";

const ProductListScreen = ({ match }) => {
  const [area, setArea] = useState();
  const [category, setCategory] = useState(); 
  const dispatch = useDispatch();
  const history = useHistory();

  const shopList = useSelector((state) => state.shopList);
  const { loading, error, shops } = shopList;


  const shopCreate = useSelector((state) => state.shopCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    shop: createdShop,
  } = shopCreate;

  const createShopHandler = () => {
    dispatch(createShop());
  };

  useEffect(() => {
    if (successCreate) {
      history.push(`/shop/${createdShop._id}/edit`);
    } else {
      dispatch(listShops());
    }
  }, [
    dispatch,
    history,
    successCreate,
    createdShop,
  ]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Shops</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createShopHandler}>
            Create Shop
          </Button>
        </Col>
        <Col>
        <div className="form-row">
              <div className="form-group col-md-6">
                <label>Area:</label>
                  <select className="form-control" name="area" onChange={(e) => setArea(e.target.value)}>
                      <option defaultValue></option>
                      <option value="Nashik">Nashik</option>
                      <option value="Thane">Thane</option>
                      <option value="Mumbai Suburban">Mumbai Suburban</option>
                      <option value="Solanpur">Solanpur</option>
                      <option value="AhmedNagar">AhmedNagar</option>
                      <option value="Pune">Pune</option>
                  </select>
              </div>
            </div>
        </Col>
        <Col>
        <div className="form-row">
              <div className="form-group col-md-6">
                <label>category:</label>
                  <select className="form-control" name="category" onChange={(e) => setCategory(e.target.value)}>
                      <option defaultValue></option>
                      <option value="Grocery">Grocery</option>
                      <option value="Butcher">Butcher</option>
                      <option value="Baker">Baker</option>
                      <option value="Chemist">Chemist</option>
                      <option value="Stationary Shop">Stationary Shop</option>
                      <option value="Pune">Pune</option>
                  </select>
              </div>
            </div>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : area ? (
        shops.filter(shop => shop.area === area).map(filteredShop => (
          <Col key={filteredShop._id} sm={12} md={6} lg={4} xl={3}>
          <Shop shop={filteredShop} />
        </Col>
        ))
      ) : category ? (
        shops.filter(shop => shop.category === category).map(filteredShop => (
          <Col key={filteredShop._id} sm={12} md={6} lg={4} xl={3}>
          <Shop shop={filteredShop} />
        </Col>
        ))
      ) : (
        <Row>
          {shops.map((shop) => (
          <Col key={shop._id} sm={12} md={6} lg={4} xl={3}>
            <Shop shop={shop} />
          </Col>
        ))}
        </Row>
      )}
    </>
  );
};

export default ProductListScreen;