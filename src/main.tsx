import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { Root, Home, About, Cart } from "./routes";
import Register, { action as registerAction } from "./routes/register.tsx";
import Login, { action as loginAction } from "./routes/login.tsx";
import Landing, { loader as landingLoader } from "./routes/landing.tsx";
import Products, { loader as productsLoader } from "./routes/products.tsx";
import Product, { loader as productLoader } from "./routes/product.tsx";
import Checkout, {
  loader as checkoutLoader,
  action as checkoutAction,
} from "./routes/checkout.tsx";
import Orders, { loader as ordersLoader } from "./routes/orders.tsx";
import ErrorPage from "./error-page.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            index: true,
            element: <Landing />,
            loader: landingLoader,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "products",
            element: <Products />,
            loader: productsLoader,
          },
          {
            path: "products/:id",
            element: <Product />,
            loader: productLoader,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "checkout",
            element: <Checkout />,
            loader: checkoutLoader(store),
            action: checkoutAction(store),
          },
          {
            path: "orders",
            element: <Orders />,
            loader: ordersLoader(store),
          },
        ],
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction(store),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Toaster />
    <RouterProvider router={router} />
  </Provider>,
);
