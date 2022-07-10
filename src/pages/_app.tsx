import '../../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
//header書きたいなら個々に書く
//全ページ適用したからglobal
export default MyApp
