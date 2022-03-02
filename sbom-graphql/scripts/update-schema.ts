import path from 'path'
import fs from 'fs'
import { graphql, getIntrospectionQuery, printSchema } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import schema from '../src/schema'

const executableSchema = makeExecutableSchema(schema)

const runIntrospectionQuery = () => {
  graphql(executableSchema, getIntrospectionQuery())
    .then(result => {
      // Write schema definition
      fs.writeFileSync(
        path.join(__dirname, `../data/schema.json`),
        JSON.stringify(result, null, 2)
      )
    })
    .catch(err => {
      console.log(err)
      console.error('[error] failed to update schema. is the server running?')
      process.exit(1)
    })
}

runIntrospectionQuery()

// Write human readable schema
// fs.writeFileSync(
//   path.join(__dirname, '../data/schema.graphql'),
//   printSchema(executableSchema)
// )