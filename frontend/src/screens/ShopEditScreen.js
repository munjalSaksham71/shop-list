import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listShopDetails, updateShop } from "../actions/shopActions";
import { SHOP_UPDATE_RESET } from "../constants/shopConstants";

const ShopEditScreen = ({ match, history }) => {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [openingDate, setOpeningDate] = useState();
  const [closingDate, setClosingDate] = useState();

  const dispatch = useDispatch();

  const shopId = match.params.id;

  const shopDetails = useSelector((state) => state.shopDetails);
  const { loading, error, shop } = shopDetails;

  const shopUpdate = useSelector((state) => state.shopUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = shopUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SHOP_UPDATE_RESET });
      history.push("/");
    } else {
      if (!shop.name || shop._id !== shopId) {
        dispatch(listShopDetails(shopId));
      } else {
        setName(shop.name);
        setArea(shop.area);
        setCategory(shop.category);
        setOpeningDate(shop.openingDate);
        setClosingDate(shop.closingDate);
      }
    }
  }, [shop, dispatch, shopId, successUpdate, history]);



  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateShop({
        _id: shopId,
        name,
        area,
        category,
        openingDate,
        closingDate
      })
    );
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Shop</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Area:</label>
                  <select className="form-control" name="area" onChange={(e) => setArea(e.target.value)}>
                      <option selected>Select City</option>
                      <option value="Nashik">Nashik</option>
                      <option value="Thane">Thane</option>
                      <option value="Mumbai Suburban">Mumbai Suburban</option>
                      <option value="Solanpur">Solanpur</option>
                      <option value="AhmedNagar">AhmedNagar</option>
                      <option value="Pune">Pune</option>
                  </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Area:</label>
                  <select className="form-control" name="category" onChange={(e) => setCategory(e.target.value)}>
                      <option selected>Select Category</option>
                      <option value="butcher">Butcher</option>
                      <option value="Grocery">Grocery</option>
                      <option value="Baker">Baker</option>
                      <option value="Chemist">Chemist</option>
                      <option value="Stationary Shop">Stationary Shop</option>
                  </select>
              </div>
            </div>

            <Form.Group controlId="openingDate">
              <Form.Label>Opening Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Opening Date"
                value={openingDate}
                onChange={(e) => setOpeningDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="closingDate">
              <Form.Label>Closing Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Closing Date"
                value={closingDate}
                onChange={(e) => setClosingDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Add
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ShopEditScreen;