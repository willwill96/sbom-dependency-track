import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo-client'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <div className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-flex-col">
        <Header />
        <div className="tw-h-full tw-flex-grow tw-overflow-y-auto tw-w-full tw-px-8">
          <Component {...pageProps} />
        </div>
      </div>
    </ApolloProvider>
  )
}

export default MyApp
