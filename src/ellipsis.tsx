import React, { forwardRef, useLayoutEffect, useRef } from 'react'
import cn from 'classnames'
import { debounce } from 'lodash'
import { BubblePopover, PopoverRef, BubblePopoverProps } from 'xueyan-react-popover'
import { useStateRef } from './hooks'
import styles from './ellipsis.scss'

export type EllipsisLengthMode = 'char' | 'byte'

export type EllipsisListener = (ellipsis: boolean) => void

export interface EllipsisRef extends PopoverRef {}

export interface EllipsisProps {
  /** popover组件props */
  popover?: BubblePopoverProps
  /** 类名 */
  className?: string
  /** 样式 */
  style?: React.CSSProperties
  /** 子节点 */
  children?: React.ReactNode
  /** 宽度限制（默认为容器宽度） */
  width?: React.CSSProperties['width']
  /** 行数限制（默认为1） */
  maxLine?: number
  /** 长度限制（默认为无，必须大于3才能生效） */
  maxLength?: number
  /** 长度统计模式（默认为 char，设置为 byte 会将中文当两个字符算） */
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
  const byteMode = lengthMode === 'byte'
  let br = false
  let i = 0
  for (let len = 0; i < str.length; i++) {
    if (byteMode) {
      len = len + (str.charCodeAt(i) <= 128 ? 1 : 2)
    } else {
      len = len + 1
    }
    if (len > maxLength) {
      br = true
      break
    }
  }
  if (!br) {
    return [str, '']
  }
  if (i <= 1) {
    return ['', str]
  }
  if (str.charCodeAt(i-1) > 128 || str.charCodeAt(i-2) > 128) {
    i = i - 2
  } else {
    i = i - 3
  }
  i = Math.max(i, 0)
  return br ? [
    str.slice(0, i),
    str.slice(i)
  ] : [str, '']
}

export const Ellipsis = forwardRef<EllipsisRef, EllipsisProps>(({
  popover,
  className,
  style,
  children,
  width,
  maxLine,
  maxLength,
  lengthMode,
  onEllipsis,
}, ref) => {
  const _maxLine = maxLine || 1
  const _popover = popover || {}
  const innerRef = useRef<HTMLDivElement>(null)
  const [ell, ellRef, setEll] = useStateRef<boolean>(false)

  useLayoutEffect(() => {
    if (!innerRef.current || _popover.disabled) {
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
  }, [innerRef.current, _popover.disabled])

  let tip: boolean = ell
  let node: React.ReactNode = children
  if (maxLength && maxLength > 3 && typeof children === 'string') {
    const data = getOverflowString(children, maxLength, lengthMode || 'char')
    tip = ell || Boolean(data[1])
    node = data[0] + (data[1] ? '...' : '')
  }

  return (
    <BubblePopover
      zIndex={100}
      trigger="hover"
      placement="center"
      disabled={_popover.disabled || !tip}
      content={children}
      {..._popover}
      ref={ref}
      className={cn(styles.xrellipsis, className)}
      style={{ width, ...style }}
      contentStyle={{ 
        maxWidth: '300px',
        ..._popover.style
      }}
    >
      <div 
        ref={innerRef}
        className={cn(
          styles.inner, 
          _maxLine > 1 ? styles.multiple : styles.single
        )}
        style={{
          WebkitLineClamp: _maxLine > 1 ? _maxLine : undefined 
        }}
      >
        {node}
      </div>
    </BubblePopover>
  )
})
