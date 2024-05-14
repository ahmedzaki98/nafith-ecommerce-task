import { ToastContainer } from "react-toastify";
import Navbar from "./layout/Navbar";
import Header from "./layout/Header";
import { Outlet, Route, ScrollRestoration, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Footer from "./layout/Footer/Footer";
import Shop from "./pages/shop/Shop";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import AddProduct from "./pages/add-product/AddProduct";

const Layout = () => {
    return (
      <div>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Navbar />
        <Header />
        <ScrollRestoration />
        <Outlet />
        <Footer />
      </div>
    );
  };
  export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Shop />}></Route>
          <Route path="/product/:_id" element={<ProductDetails />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/add-product" element={<AddProduct />}></Route>
        </Route>
      </Route>
    )
  );