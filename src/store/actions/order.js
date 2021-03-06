import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

// Dispatched from src/containers/Checkout/ContactData/ContactData
export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart()); // Sets state loading to true

    // path requires .json for Firebase only
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then(response => {
        // console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData)); // Sets state purhases to true.

        /*
            this.setState({
                loading: false
            });
            this.props.history.push("/"); // Will take a different route
            */
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));

        /*
            this.setState({
                loading: false
            });
            */
      });
  };
};

// Initialize purchased to false (ContactData.js > Order button)
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

// Dispatched from src/containers/Orders/Orders
export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart()); // Set loading to true

    // Firebase query parameter keys 'orderby=' and 'equalTo='
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;

    // const queryParams =
    //   "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    // console.log(queryParams);

    axios
      .get("/orders.json" + queryParams)
      // .get("/orders.json?auth=" + token)
      .then(res => {
        // console.log("[actions/orders.js] fetchOrders() ", res.data); // { idABC:{}, idXYZ:{},..}
        const fetchedOrders = [];
        for (let key in res.data) {
          // fetchedOrders.push(res.data[key]);
          // Spread the object and create a property 'id' (called any) and assign value of 'key'.  This includes the 'key' value in the object.
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        // console.log(fetchedOrders);
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
