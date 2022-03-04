import React, { forwardRef, useLayoutEffect, useRef } from 'react'
import cn from 'classnames'
import { debounce } from 'lodash'
import { BubblePopover, PopoverRef, BubblePopoverProps } from 'xueyan-react-popover'
import { useStateRef } from './hooks'
import styles from './ellipsis.scss'

interface PartBubblePopoverProps extends Omit<
  BubblePopoverProps,
  | 'value'
  | 'onChange'
  | 'trigger'
  | 'width'
> {}

export type EllipsisLengthMode = 'char' | 'byte'

export type EllipsisListener = (ellipsis: boolean) => void

export interface EllipsisRef extends PopoverRef {}

export interface EllipsisProps extends PartBubblePopoverProps {
  /** popover宽度值 */
  popoverWidth?: React.CSSProperties['width']
  /** 宽度限制（默认为容器宽度） */
  width?: React.CSSProperties['width']
  /** 行数限制（默认为1） */
  maxLine?: number
  /** 长度限制（默认为无，必须大于3才能生效） */
  maxLength?: number
  /** 长度限制类型（默认为char）（byte类型将中文当两个字符算） */
  lengthMode?: EllipsisLengthMode
  /** 内容溢出时 */
  onEllipsis?: EllipsisListener
}

/**
 * 获取字符串溢出情况
 */
function getOverflowString(
  str: String,
  maxLength: number,
  lengthMode: EllipsisLengthMode
) {
  let i = 0
  let len = 0
  let br = false
  const byteMode = lengthMode === 'byte'
  for (; i < str.length; i++) {
    if (byteMode) {
      len = len + (str.charCodeAt(i) <= 128 ? 1 : 2)
    } else {
      len = len +1
    }
    if (len > maxLength) {
      br = true
      break
    }
  }
  if (!br) {
    return [str, '']
  }
  const ri = Math.max(i - 3, 0)
  return [
    str.slice(0, ri),
    str.slice(ri)
  ]
}

export const Ellipsis = forwardRef<EllipsisRef, EllipsisProps>(({
  className,
  children,
  content,
  disabled,
  popoverWidth,
  width,
  maxLine,
  maxLength,
  lengthMode,
  onEllipsis,
  ...props
}, ref) => {
  const innerRef = useRef<HTMLDivElement>(null)
  const [ell, ellRef, setEll] = useStateRef<boolean>(false)

  useLayoutEffect(() => {
    if (!innerRef.current || disabled) {
      return
    }
    const checkEllipsis = debounce(() => {
      const rootNode = innerRef.current
      if (rootNode) {
        const curEll = rootNode.scrollWidth > rootNode.clientWidth
          || rootNode.scrollHeight > rootNode.clientHeight
        if (curEll !== ellRef.current) {
          setEll(curEll)
          if (onEllipsis) {
            onEllipsis(curEll)
          }
        }
      }
    }, 500)
    const resizeObserver = new ResizeObserver(checkEllipsis)
    resizeObserver.observe(innerRef.current)
    return () => resizeObserver.disconnect()
  }, [innerRef.current, disabled])

  let tip: boolean = ell
  let node: React.ReactNode = children
  if (maxLength && maxLength > 3 && typeof children === 'string') {
    const data = getOverflowString(children, maxLength, lengthMode || 'char')
    tip = ell || Boolean(data[1])
    node = data[0] + (data[1] ? '...' : '')
  }

  const multiple = (maxLine && maxLine > 1)
  return (
    <BubblePopover
      zIndex={100}
      trigger="hover"
      {...props}
      ref={ref}
      content={content || children}
      disabled={disabled || !tip}
      className={cn(styles.ellipsis, className)}
      style={{ width }}
      width={popoverWidth}
    >
      <div 
        ref={innerRef}
        className={multiple ? styles.multiple : styles.single}
        style={{ WebkitLineClamp: multiple ? maxLine : undefined }}
      >
        {node}
      </div>
    </BubblePopover>
  )
})
