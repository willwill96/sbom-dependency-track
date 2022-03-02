import sbomResolvers from './resolvers/sbom-resolvers'
import sbomTypeDefs from './sbom-type-defs'

const sbomGraphqlSchema = {
  typeDefs: [sbomTypeDefs],
  resolvers: [sbomResolvers],
}
export default sbomGraphqlSchema