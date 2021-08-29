import "../styles/globals.css";
import Layout from "../component/Layout/Layout";
import { Provider } from "react-redux";
import store from "../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// css
import "../component/Navbar/Navbar.css";
import "../component/Register/Register.css";
import "../component/Toast/Toast.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
