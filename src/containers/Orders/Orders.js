import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  /* Before using redux
    state = {
      orders: [],
      loading: true
    };
  */

  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  // Before using redux state
  /*
    axios
      .get("/orders.json")
      .then(res => {
        console.log("Orders.js_componentDidMount", res.data); // { idABC:{}, idXYZ:{},..}
        const fetchedOrders = [];
        for (let key in res.data) {
          // fetchedOrders.push(res.data[key]);
          // Spread the object and create a property 'id' (called any) and assign value of 'key'.  This includes the 'key' value in the object.
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        // console.log(fetchedOrders);
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
      */

  render() {
    let orders = <Spinner />;

    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
          // price={+order.price}
        />
      ));
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
