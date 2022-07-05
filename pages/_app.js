import Layout from "../components/Layout";
import "../styles/globals.css";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import store from "../redux/store";

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
