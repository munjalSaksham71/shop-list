import React, { useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Shop from '../components/Shop'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useHistory } from "react-router-dom";
import {
  listShops,
  deleteShop,
  createShop,
} from "../actions/shopActions";
import { SHOP_CREATE_RESET } from "../constants/shopConstants";

const ProductListScreen = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const shopList = useSelector((state) => state.shopList);
  const { loading, error, shops } = shopList;

  const shopDelete = useSelector((state) => state.shopDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = shopDelete;

  const shopCreate = useSelector((state) => state.shopCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    shop: createdShop,
  } = shopCreate;

  const deleteHandler = (id) => {
    dispatch(deleteShop(id));
  };

  const createShopHandler = () => {
    dispatch(createShop());
  };

  useEffect(() => {
    dispatch({ type: SHOP_CREATE_RESET });
    if (successCreate) {
      history.push(`/shop/${createdShop._id}/edit`);
    } else {
      dispatch(listShops());
    }
  }, [
    dispatch,
    history,
    successDelete,
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
            <i className="fas fa-plus"></i> Create Shop
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
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