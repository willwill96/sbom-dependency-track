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

const getAllAppNames = () => {
  return new Promise(async resolve => {
    try {
      // Connect the client to the server
      await client.connect();
      
      resolve(await client.db("sboms").collection("sboms").distinct('metadata.component.name', { 'metadata.component.type': 'library'}))
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  })
}

const getAppsWithDependency = (dependency:string): Promise<any[]> => {
  
  const splitArr = dependency.split('/')
  if (splitArr.length !== 1 && splitArr.length !== 2) {
    throw new Error('Invalid dependency name given')
  }
  const dependencyName = splitArr.length === 1 ? splitArr[0] : splitArr[1]
  const groupName = splitArr.length === 1 ? null : splitArr[0]
  console.log('dependencyName', dependencyName)
  console.log('groupName', groupName)
  return new Promise(async resolve => {
    try {
      // Connect the client to the server
      await client.connect();
      resolve(await client.db("sboms").collection("sboms").find({ 'components': {
        '$elemMatch': {
          name: dependencyName,
          group: groupName
        }
      }}).toArray())
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

const appNames = async () => {
  return await getAllAppNames()
}

const appsWithDependency = async (_, args) => {
  return (await getAppsWithDependency(args.dependency)).map(sbom=>sbom.metadata.component.name)
}

export default {
  Query: {
    appNames,
    appsWithDependency,
    sboms,
    sbomByComponentName
  },
}