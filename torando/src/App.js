import { BrowserRouter as Router, Route } from "react-router-dom";
import BlogEditScreen from "./screens/BlogEditScreen";
import BlogListScreen from "./screens/BlogListScreen";
import BlogPageScreen from "./screens/BlogPageScreen";
import BlogsScreen from "./screens/BlogsScreen";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MenuScreen from "./screens/MenuScreen";
import OrderScreen from "./screens/OrderScreen";
import OrdersListScreen from "./screens/OrdersListScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ReservationScreen from "./screens/ReservationScreen";
import ShippingScreen from "./screens/ShippingScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import PageToTop from "./components/PageToTop";

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <PageToTop />
        <Route path="/reservation" component={ReservationScreen} exact />
        <Route path="/blogs/:id" component={BlogPageScreen} />
        <Route path="/blogs" component={BlogsScreen} exact />
        <Route path="/order/:id" component={OrderScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/menu/search/:keyword" component={MenuScreen} />
        <Route path="/menu" component={MenuScreen} exact />
        <Route path="/menu/:id" component={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/admin/userlist" component={UserListScreen} />
        <Route path="/admin/orderlist" component={OrdersListScreen} />
        <Route path="/admin/user/:id/edit" component={UserEditScreen} />
        <Route path="/admin/productlist" component={ProductListScreen} exact />
        <Route path="/admin/products/:id/edit" component={ProductEditScreen} />
        <Route path="/admin/blogs" component={BlogListScreen} exact />
        <Route path="/admin/blogs/:id/edit" component={BlogEditScreen} exact />

        <Route path="/" component={HomeScreen} exact />
      </Router>
    </MuiPickersUtilsProvider>
  );
}

export default App;
