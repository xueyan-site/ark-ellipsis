import React, { useState } from 'react'
import { Article, Segment } from 'ark-markdown'
import { Playground } from 'ark-playground'
import { Ellipsis } from 'ark-ellipsis'

const MARK1 = `
溢出省略组件库，用于实现文本的溢出效果。
`

const code1 = `
import React from 'react'
import { Ellipsis } from 'ark-ellipsis'

export default function Example() {
  return (
    <Ellipsis
      popover={{
        content: '这是溢出后的提示（默认情况下，使用文本节点内容作为提示信息）'
      }}
      style={{
        width: 'min-content',
        maxWidth: '200px',
        padding: '0 8px',
        lineHeight: '32px',
        backgroundColor: 'var(--area2)'
      }}
    >
      这是一段文字，用于演示省略功能。
    </Ellipsis>
  )
}
`


const code2 = `
import React from 'react'
import { Ellipsis } from 'ark-ellipsis'

export default function Example() {
  return (
    <Ellipsis width={100}>
      这是一段文字，用于演示省略功能。this is a segment text for demo.
    </Ellipsis>
  )
}
`

const code3 = `
import React from 'react'
import { Ellipsis } from 'ark-ellipsis'

export default function Example() {
  return (
    <Ellipsis maxLength={4}>
      这是一段文字，用于演示省略功能。this is a segment text for demo.
    </Ellipsis>
  )
}
`

const code4 = `
import React from 'react'
import { Ellipsis } from 'ark-ellipsis'

export default function Example() {
  return (
    <div style={{ width: 100 }}>
      <Ellipsis maxLine={2}>
        这是一段文字，用于演示省略功能。this is a segment text for demo.
      </Ellipsis>
    </div>
  )
}
`

const code5 = `
import React from 'react'
import { Ellipsis } from 'ark-ellipsis'

export default function Example() {
  return (
    <Ellipsis maxLine={2} width={100}>
      这是一段文字，用于演示省略功能。this is a segment text for demo.
    </Ellipsis>
  )
}
`

export default function Main() {
  const scope = { React, useState, Ellipsis }
  return (
    <Article>
      <Segment>{MARK1}</Segment>
      <Segment>## 示例1</Segment>
      <Playground scope={scope}>
        {code1}
      </Playground>
      <Segment>## 示例2  设置宽度</Segment>
      <Playground scope={scope}>
        {code2}
      </Playground>
      <Segment>## 示例3 设置最大长度</Segment>
      <Playground scope={scope}>
        {code3}
      </Playground>
      <Segment>## 示例4 设置最大行数</Segment>
      <Playground scope={scope}>
        {code4}
      </Playground>
      <Segment>## 示例5 设置宽度和最大行数</Segment>
      <Playground scope={scope}>
        {code5}
      </Playground>
    </Article>
  )
}
