import React from 'react'
import { Ellipsis } from 'xueyan-react-ellipsis'

export default function Main() {
  return (
    <div style={{
      width: 300,
      backgroundColor: '#ccc',
      resize: 'both'
    }}>
      <div>默认</div>
      <Ellipsis popover={{ content: '这是溢出后的提示' }}>
        这是一段文字，用于演示省略功能。this is a segment text for demo.
      </Ellipsis>
      <br/>
      <div>width 100</div>
      <Ellipsis width={100}>
        这是一段文字，用于演示省略功能。this is a segment text for demo.
      </Ellipsis>
      <br/>
      <div>width 400</div>
      <Ellipsis width={400}>
        这是一段文字，用于演示省略功能。this is a segment text for demo.
      </Ellipsis>
      <hr/>
      <div>length 4</div>
      <Ellipsis maxLength={4}>
        这是一段文字，用于演示省略功能。this is a segment text for demo.
      </Ellipsis>
      <br/>
      <div>length 100</div>
      <Ellipsis maxLength={100}>
        这是一段文字，用于演示省略功能。this is a segment text for demo.
      </Ellipsis>
      <hr/>
      <div>lines 2</div>
      <Ellipsis maxLine={2}>
        这是一段文字，用于演示省略功能。this is a segment text for demo.
      </Ellipsis>
      <br/>
      <div>lines 2 length 20</div>
      <Ellipsis maxLine={2} maxLength={20}>
        这是一段文字，用于演示省略功能。this is a segment text for demo.
      </Ellipsis>
      <br/>
      <div>lines 2 width 100</div>
      <Ellipsis maxLine={2} width={100}>
        这是一段文字，用于演示省略功能。this is a segment text for demo.
      </Ellipsis>
    </div>
  )
}
