interface RichTextRendererProps {
  content: any
  className?: string
}

// Простой рендерер для Lexical Rich Text из Payload CMS
// Payload 3.x использует Lexical формат
export function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
  if (!content) {
    return null
  }

  // Если контент — строка, отображаем как текст
  if (typeof content === 'string') {
    return (
      <div
        className={`prose prose-invert prose-sm max-w-none ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  // Если Lexical формат — рендерим узлы рекурсивно
  if (content.root?.children) {
    return (
      <div className={`prose prose-invert prose-sm max-w-none ${className}`}>
        {content.root.children.map((node: any, i: number) => (
          <LexicalNode key={i} node={node} />
        ))}
      </div>
    )
  }

  return null
}

function LexicalNode({ node }: { node: any }) {
  if (!node) return null

  switch (node.type) {
    case 'paragraph':
      return (
        <p>
          {node.children?.map((child: any, i: number) => (
            <LexicalNode key={i} node={child} />
          ))}
        </p>
      )
    case 'heading': {
      const Tag = `h${node.tag || 2}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      return (
        <Tag>
          {node.children?.map((child: any, i: number) => (
            <LexicalNode key={i} node={child} />
          ))}
        </Tag>
      )
    }
    case 'list': {
      const ListTag = (node.listType === 'number' ? 'ol' : 'ul') as 'ol' | 'ul'
      return (
        <ListTag>
          {node.children?.map((child: any, i: number) => (
            <LexicalNode key={i} node={child} />
          ))}
        </ListTag>
      )
    }
    case 'listitem':
      return (
        <li>
          {node.children?.map((child: any, i: number) => (
            <LexicalNode key={i} node={child} />
          ))}
        </li>
      )
    case 'text': {
      let text: React.ReactNode = node.text || ''
      if (node.format & 1) text = <strong>{text}</strong>
      if (node.format & 2) text = <em>{text}</em>
      if (node.format & 8) text = <u>{text}</u>
      if (node.format & 16) text = <code>{text}</code>
      return <>{text}</>
    }
    case 'link':
      return (
        <a href={node.fields?.url} target="_blank" rel="noopener noreferrer">
          {node.children?.map((child: any, i: number) => (
            <LexicalNode key={i} node={child} />
          ))}
        </a>
      )
    case 'linebreak':
      return <br />
    default:
      if (node.children) {
        return (
          <>
            {node.children.map((child: any, i: number) => (
              <LexicalNode key={i} node={child} />
            ))}
          </>
        )
      }
      return null
  }
}
