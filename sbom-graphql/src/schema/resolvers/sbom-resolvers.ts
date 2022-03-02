import { MongoClient } from "mongodb";

// Connection URI
const uri = process.env['MONGODB_URI'];
if (!uri) {
  throw new Error('MONGODB_URI ENV VAR MUST BE SET')
}
// Create a new MongoClient
const client = new MongoClient(uri);


const getSboms = (): Promise<any[]> => {
  return new Promise(async resolve => {
    try {
      // Connect the client to the server
      await client.connect();
      
      resolve(await client.db("sboms").collection("sboms").find().toArray())
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  })
  
}

const getSbomByName = (name:string) => {
  return new Promise(async resolve => {
    try {
      // Connect the client to the server
      await client.connect();
      
      resolve(await client.db("sboms").collection("sboms").findOne({ 'metadata.component.name': name}))
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  })
  
}

const sboms = async (_, args, context) => {
  return (await getSboms()).map((obj=>({
    sbom: obj
  })))
  
}

const sbomByComponentName = async (_, args) => {
  const { name } = args
  return {
    sbom: await getSbomByName(name)
  }

}


export default {
  Query: {
    sboms,
    sbomByComponentName
  },
}