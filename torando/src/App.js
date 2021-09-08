import { BrowserRouter as Router, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OrderScreen from "./screens/OrderScreen";
import OrdersListScreen from "./screens/OrdersListScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";

function App() {
  return (
    <Router>
      <Route path="/order/:id" component={OrderScreen} />
      <Route path="/placeorder" component={PlaceOrderScreen} />
      <Route path="/payment" component={PaymentScreen} />
      <Route path="/shipping" component={ShippingScreen} />
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/login" component={LoginScreen} />
      <Route path="/menu/:id" component={ProductScreen} />
      <Route path="/cart/:id?" component={CartScreen} />
      <Route path="/admin/userlist" component={UserListScreen} />
      <Route path="/admin/orderlist" component={OrdersListScreen} />
      <Route path="/admin/user/:id/edit" component={UserEditScreen} />
      <Route path="/admin/productlist" component={ProductListScreen} />
      <Route path="/admin/products/:id/edit" component={ProductEditScreen} />

      <Route path="/" component={HomeScreen} exact />
    </Router>
  );
}

export default App;
