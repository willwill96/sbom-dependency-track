import conditionallyAddClassnames from '../../utils/concat-class-names'
import styles from './Tooltip.module.css'

interface Props {
  content: string
  alignVertical?: 'top' | 'bottom'
  alignHorizontal?: 'left' | 'center' | 'right'
  children: React.ReactChild
}

const Tooltip = (props: Props) => {
  const { alignVertical = 'bottom' } = props
  const { alignHorizontal = 'center' } = props
  return (
    <div
      className={conditionallyAddClassnames(
        styles['tooltip'],
        alignVertical === 'top' && styles['tooltip-align-top'],
        alignHorizontal === 'left' && styles['tooltip-align-left'],
        alignHorizontal === 'right' && styles['tooltip-align-right']
      )}
      data-title={props.content}
    >
      {props.children}
    </div>
  )
}

export default Tooltip
