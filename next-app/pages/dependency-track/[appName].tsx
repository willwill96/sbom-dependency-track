import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Input from '../../components/Input'
import Loading from '../../components/Loading'
import styles from '../../styles/DependencyTrack.module.css'
import SBOM from '../../types/sbom'

const sbomsGql = gql`
  query sbomByComponentName($appName: String) {
    sbomByComponentName(name: $appName) {
      sbom
    }
  }
`

const DependencyTrack = () => {
  const router = useRouter()
  const { appName } = router.query
  const { loading, data } = useQuery(sbomsGql, {
    variables: {
      appName,
    },
  })
  const [input, setInput] = useState('')

  if (loading)
    return (
      <div className="tw-w-full tw-flex tw-items-center tw-justify-center tw-col-span-12 tw-p-4">
        <Loading />
      </div>
    )
  console.log(data)
  const { sbom } = data.sbomByComponentName as { sbom: SBOM }
  const components = sbom.components
    .map((comp) => ({
      ...comp,
      name: comp.group ? `${comp.group}/${comp.name}` : comp.name,
    }))
    .sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
  return (
    <div className={styles['root']}>
      <h1 className={styles['title']}>
        DependencyTrack - {sbom.metadata.component.name}
      </h1>

      <h2>This app has {sbom.components.length} dependent packages</h2>
      <div>
        <Input
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type to Filter"
          className="tw-text-left tw-w-full"
        />
        <div className="tw-grid tw-p-2">
          {components
            .filter((comp) => !input || comp.name.indexOf(input) !== -1)
            .map((comp) => (
              <button
                className={styles['list-item']}
                key={`${comp.name}-${comp.version}`}
              >
                <span className={styles['list-item-name']}>{comp.name}</span>
                <span className={styles['list-item-version']}>
                  {comp.version}
                </span>
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}

export default DependencyTrack
