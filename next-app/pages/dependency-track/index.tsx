import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Card from '../../components/Card'
import Input from '../../components/Input'
import Loading from '../../components/Loading'
import styles from '../../styles/Home.module.css'

const sbomsGql = gql`
  query appNames {
    appNames
  }
`

const DependencyTrack = () => {
  const { loading, data } = useQuery(sbomsGql)
  const [input, setInput] = useState('')

  if (loading)
    return (
      <div className="tw-w-full tw-flex tw-items-center tw-justify-center tw-col-span-12 tw-p-4">
        <Loading />
      </div>
    )
  const appNames = data.appNames as string[]
  return (
    <div className={styles['root']}>
      <h1 className={styles['title']}>DependencyTrack</h1>
      <h2>
        There are currently {appNames.length} apps utilizing DependencyTrack
      </h2>
      <div>
        <Input
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type to Filter"
          className="tw-text-left tw-w-full"
        />
        <div className={styles['apps-container']}>
          {appNames
            .filter((name) => !input || name.indexOf(input) !== -1)
            .map((name) => (
              <Link
                href={`/dependency-track/${encodeURIComponent(name)}`}
                key={name}
                passHref
              >
                <Card className={styles['app-card']}>{name}</Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export default DependencyTrack
