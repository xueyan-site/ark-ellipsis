import React from 'react'
import { Ellipsis } from 'xueyan-react-ellipsis'

const BOX_STYLE: React.CSSProperties = {
  width: 300,
  resize: 'both',
  marginBottom: '12px',
  backgroundColor: 'var(--back1)',
  border: '1px solid var(--alpha4)',
  color: 'var(--font)'
}

const TITLE_STYLE: React.CSSProperties = {
  backgroundColor: 'var(--back2)',
  padding: '4px 8px',
}

const CONT_STYLE: React.CSSProperties = {
  padding: '4px 8px',
}

export default function Main() {
  return (
    <div>
      <div style={BOX_STYLE}>
        <div style={TITLE_STYLE}>默认</div>
        <div style={CONT_STYLE}>
          <Ellipsis popover={{ content: '这是溢出后的提示' }}>
            这是一段文字，用于演示省略功能。this is a segment text for demo.
          </Ellipsis>
        </div>
      </div>

      <div style={BOX_STYLE}>
        <div style={TITLE_STYLE}>width 100</div>
        <div style={CONT_STYLE}>
          <Ellipsis width={100}>
            这是一段文字，用于演示省略功能。this is a segment text for demo.
          </Ellipsis>
        </div>
      </div>

      <div style={BOX_STYLE}>
        <div style={TITLE_STYLE}>width 400</div>
        <div style={CONT_STYLE}>
          <Ellipsis width={400}>
            这是一段文字，用于演示省略功能。this is a segment text for demo.
          </Ellipsis>
        </div>
      </div>

      <div style={BOX_STYLE}>
        <div style={TITLE_STYLE}>length 4</div>
        <div style={CONT_STYLE}>
          <Ellipsis maxLength={4}>
            这是一段文字，用于演示省略功能。this is a segment text for demo.
          </Ellipsis>
        </div>
      </div>

      <div style={BOX_STYLE}>
        <div style={TITLE_STYLE}>length 100</div>
        <div style={CONT_STYLE}>
          <Ellipsis maxLength={100}>
            这是一段文字，用于演示省略功能。this is a segment text for demo.
          </Ellipsis>
        </div>
      </div>

      <div style={BOX_STYLE}>
        <div style={TITLE_STYLE}>lines 2</div>
        <div style={CONT_STYLE}>
          <Ellipsis maxLine={2}>
            这是一段文字，用于演示省略功能。this is a segment text for demo.
          </Ellipsis>
        </div>
      </div>

      <div style={BOX_STYLE}>
        <div style={TITLE_STYLE}>lines 2 length 20</div>
        <div style={CONT_STYLE}>
          <Ellipsis maxLine={2} maxLength={20}>
            这是一段文字，用于演示省略功能。this is a segment text for demo.
          </Ellipsis>
        </div>
      </div>

      <div style={BOX_STYLE}>
        <div style={TITLE_STYLE}>lines 2 width 100</div>
        <div style={CONT_STYLE}>
          <Ellipsis maxLine={2} width={100}>
            这是一段文字，用于演示省略功能。this is a segment text for demo.
          </Ellipsis>
        </div>
      </div>
    </div>
  )
}
