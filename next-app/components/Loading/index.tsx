import conditionallyAddClassnames from '../../utils/concat-class-names'
import styles from './Loading.module.css'

interface Props {
  className?: string
}

const Loading = (props: Props) => {
  return (
    <div
      className={conditionallyAddClassnames(styles['loader'], props.className)}
    />
  )
}

export default Loading
