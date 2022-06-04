import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'
import { Playground } from 'xueyan-react-playground'
import { Ellipsis } from 'xueyan-react-ellipsis'

const MARK1 = `
溢出省略组件

\`\`\`
type Ellipsis = React.ForwardRefExoticComponent<
  EllipsisProps & React.RefAttributes<EllipsisRef>
>
\`\`\`

## 示例
`

const CODE1 = `
import React from 'react'
import { Popover } from 'xueyan-react-popover'

export default function Example() {
  return (
    <Ellipsis
      width="min-content"
      style={{ maxWidth: '200px', display: 'block' }}
    >
      这是一段文字，用于演示省略功能。
    </Ellipsis>
  )
}
`

const MARK2 = `
## EllipsisRef

继承 [PopoverRef](/xueyan-react-popover?doc=0002#popoverref) 全部属性

## EllipsisProps

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| popover | popover组件props | \`? BubblePopoverProps\` |  |
| className | 类名 | \`? string\` |  |
| style | 样式 | \`? React.CSSProperties\` |  |
| children | 子节点 | \`? React.ReactNode\` |  |
| width | 宽度限制 | \`? React.CSSProperties['width']\` | 默认为容器宽度 |
| maxLine | 行数限制 | \`? number\` | 默认为1 |
| maxLength | 长度限制 | \`? number\` | 默认为无，必须大于3才能生效 |
| lengthMode | 长度统计模式 | \`? EllipsisLengthMode\` | 默认为 char，设置为 byte 会将中文当两个字符算 |
| onEllipsis | 内容溢出时 | \`? EllipsisListener\` |  |

## EllipsisLengthMode

长度统计模式

\`\`\`
type EllipsisLengthMode = 
  | 'char'  // 按字符个数统计
  | 'byte'  // 按字符码大小统计（字符码大于128，按两个字符算，即一个中文占两个字符长度）
\`\`\`

## EllipsisListener

监听内容溢出的方法

\`\`\`
type EllipsisListener = (
  ellipsis: boolean // 是否溢出（是否显示为省略态）
) => void
\`\`\`
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
      <Playground scope={{ React, Ellipsis }}>
        {CODE1}
      </Playground>
      <Segment>{MARK2}</Segment>
    </Article>
  )
}
