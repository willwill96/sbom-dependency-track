import styles from './Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import IconButton from '../IconButton'
import Tooltip from '../Tooltip'

const Header = () => {
  return (
    <header className={styles['header']}>
      <div />
      <div className="tw-flex-grow" />
      <Tooltip content="View Source Code" alignHorizontal="right">
        <a
          href="https://github.com/willwill96/sbom-dependency-track"
          target="_blank"
          rel="noreferrer"
          aria-label="Source Code"
        >
          <IconButton>
            <FontAwesomeIcon icon={faGithub} />
          </IconButton>
        </a>
      </Tooltip>
    </header>
  )
}

export default Header
