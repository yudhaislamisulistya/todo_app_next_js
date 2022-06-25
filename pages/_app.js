import '../styles/globals.css'
import '../styles/bootstrap.css'
import NextNProgress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }) {
  return <>
    <NextNProgress/>
    <Component {...pageProps} />
  </>
}

export default MyApp
