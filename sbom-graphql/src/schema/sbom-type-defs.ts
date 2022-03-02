import gql from 'graphql-tag'
import { readFileSync } from 'fs'
import * as path from 'path'

const graphQlSchema = readFileSync(path.join(__dirname, 'schema.graphql')).toString('utf-8')
const typeDefs = gql`
  ${graphQlSchema}
`
export default typeDefs