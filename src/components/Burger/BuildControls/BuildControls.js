import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" }
];

const buildControls = props => {
  // Ingredient controls
  const buildControlsList = controls.map(control => (
    <BuildControl
      key={control.label}
      label={control.label}
      added={() => props.ingredientAdded(control.type)}
      removed={() => props.ingredientRemoved(control.type)}
      disabled={props.disabled[control.type]}
    />
  ));

  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {buildControlsList}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
      </button>
    </div>
  );
};
export default buildControls;
