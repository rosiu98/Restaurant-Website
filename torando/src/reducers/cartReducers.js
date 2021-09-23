import {
  CART_ADD_ITEM,
  CART_ADJUST_QTY_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

const equals = (a, b) => JSON.stringify(a.sort()) === JSON.stringify(b.sort());

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      // const product = state.
      //  item : {
      //   id,
      //   image,
      //   title,
      //   description,
      //   reviews,
      //   qty
      // }

      // const existItem = state.cartItems.find((x) => x.id === item.id);
      // my product with data

      const inCart = state.cartItems.find((itemo) =>
        itemo.id === action.payload.id ? true : false
      );
      // checking if product is in cart

      // const inToppings = state.cartItems.find(
      //   (itemo) => itemo.toppings === action.payload.toppings
      // );

      const checkingToppings = state.cartItems.find((product) =>
        equals(product.toppings, action.payload.toppings) ? true : false
      );

      return {
        ...state,
        cartItems:
          inCart && checkingToppings
            ? state.cartItems.map((item) =>
                equals(item.toppings, action.payload.toppings)
                  ? { ...item, qty: item.qty + action.payload.qty }
                  : item
              )
            : [...state.cartItems, { ...item }],
      };
    // if (existItem) {
    //   return {
    //     ...state,
    //     cartItems: state.cartItems.map((x) =>
    //       x.product === existItem.product ? item : x
    //     ),
    //   };
    // } else {
    //   return {
    //     ...state,
    //     cartItems: [...state.cartItems, item],
    //   };
    // }
    case CART_ADJUST_QTY_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems:
          state.cartItems.length > 1
            ? state.cartItems.filter(
                (x) => !equals(x.toppings, action.payload.toppings)
              )
            : state.cartItems.filter((x) => x.id !== action.payload.id),
        // cartItems: [],
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
