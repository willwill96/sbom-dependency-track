
  
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground,
         ApolloServerPluginLandingPageDisabled } from 'apollo-server-core'
import express from 'express'

import sbomGraphqlSchema from './schema'
const playgroundEnabled = Boolean(
  process.env['NODE_ENV'] === 'development' || process.env['PLAYGROUND_ENABLED']
)

const port = process.env['GRAPHQL_PORT'] || 4000
const path = process.env['GRAPHQL_PATH'] || '/graphql'

const { typeDefs, resolvers } = sbomGraphqlSchema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: playgroundEnabled,
  plugins: [
    playgroundEnabled
      ? ApolloServerPluginLandingPageGraphQLPlayground()
      : ApolloServerPluginLandingPageDisabled(),
  ],
})
const apolloApp = express()
server.start().then(()=>{
  server.applyMiddleware({
    app: apolloApp,
    path: path,
  })

  apolloApp.listen(port)
})