import '../styles/globals.css'
import App from "next/app";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

// MyApp.getInitialProps = async (appContext) => {
  // let requestOptions = {
  //   method: 'POST',
  //   headers: {"Content-Type": "application/json"},
  //   body: JSON.stringify({'login': 'admin','password': '5678'}),
  //   redirect: 'follow'
  // };
  //
  // const res = await fetch("http://localhost:4003/api/person/restore", requestOptions)
  //     .then(response => response.text())
  //     .then(result => {
  //       console.log('result in getInitialProps in _app', result)
  //     })
  //     .catch(error => console.log('error', error));
  //
  // const appProps = await App.getInitialProps(appContext)
  //
  // return { ...appProps }
// }


export default MyApp
