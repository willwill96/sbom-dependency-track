interface SBOMTool {
  vendor: string
  name: string
  version: string
}
interface SBomComponent {
  type: string
  name: string
  version: string
  description: string
  ['bom-ref']?: string
  author?: string
  group?: string
  hashes?: { alg: string; content: string }[]
  licenses?: { license: { id: string } }[]
  purl?: string
  externalReferences?: { type: string; url: string }[]
}
interface SBOMMetadata {
  timestamp: string
  tools: SBOMTool[]
  component: SBomComponent
}
interface SBOM {
  bomFormat: string
  specVersion: string
  serialNumber: string
  version: number
  metadata: SBOMMetadata
  components: SBomComponent[]
}
export default SBOM
