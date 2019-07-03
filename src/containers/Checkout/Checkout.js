import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

/*
    Plan Presentation and Behavior of this component
    Summary preview of what the user is about to buy and price, show the burger itself.
    Button to cancel and return to the burger builder
    Button to continue to load the contact form

*/

class Checkout extends Component {
  // Dummy data for now but we will need routing to pass ingredients
  state = {
    ingredients: null,
    price: 0 // should this be totalPrice or just price?
  };

  // Prior to rendering we want to get the ingredients first to set this component's ingredient's state
  // componentDidMount() {  // changed to getDrivedStateFromProps to initialize the ingredient's state
  // static getDerivedStateFromProps(props, state) {
  // may need to update to getDerivedState
  componentWillMount() {
    console.log("Checkout.js_componentWillMount");
    const query = new URLSearchParams(this.props.location.search); // getDerivedStateFromProps is static therefore no instance (ie no 'this.')
    // const query = new URLSearchParams(props.location.search);
    const ingredients = {};
    let price = 0;

    for (let param of query.entries()) {
      // Exclude 'price' b/c this is not an ingredient.  This is a workaround until we use Redux.
      if (param[0] === "price") {
        price = param[1];
      } else {
        // ['salad', '1']
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({
      ingredients: ingredients,
      totalPrice: price // should this be totalPrice or just price?
    });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
    // this.props.history.push("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice} // should this be totalPrice or just price?
              {...props}
            />
          )}
          // component={ContactData}
        />
      </div>
    );
  }
}

export default Checkout;
