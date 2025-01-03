import { Fragment } from "react"
import Link from "next/link"
import { JSONContent } from "novel"

type BlogContentProps = {
  content: JSONContent
}

export function BlogRenderer({ content }: BlogContentProps) {
  const renderNode = (node: JSONContent): React.ReactNode => {
    switch (node.type) {
      case "doc":
        return (
          <article>
            {node.content?.map((child, index) => (
              <Fragment key={index}>{renderNode(child)}</Fragment>
            ))}
          </article>
        )

      case "heading":
        const HeadingTag =
          `h${node.attrs?.level || 1}` as keyof React.JSX.IntrinsicElements
        return (
          <HeadingTag>
            {node.content?.map((child, index) => (
              <Fragment key={index}>{renderNode(child)}</Fragment>
            ))}
          </HeadingTag>
        )

      case "paragraph":
        return (
          <p>
            {node.content?.map((child, index) => (
              <Fragment key={index}>{renderNode(child)}</Fragment>
            ))}
          </p>
        )

      case "text":
        let content: React.ReactNode = node.text || ""

        if (node.marks) {
          node.marks.forEach((mark) => {
            switch (mark.type) {
              case "bold":
                content = <strong>{content}</strong>
                break
              case "italic":
                content = <em>{content}</em>
                break
              case "underline":
                content = <u>{content}</u>
                break
              case "link":
                content = <Link href={mark.attrs?.href}>{content}</Link>
                break
            }
          })
        }

        return content

      case "bulletList":
        return (
          <ul>
            {node.content?.map((child, index) => (
              <Fragment key={index}>{renderNode(child)}</Fragment>
            ))}
          </ul>
        )

      case "orderedList":
        return (
          <ol>
            {node.content?.map((child, index) => (
              <Fragment key={index}>{renderNode(child)}</Fragment>
            ))}
          </ol>
        )

      case "listItem":
        return (
          <li>
            {node.content?.map((child, index) => (
              <Fragment key={index}>{renderNode(child)}</Fragment>
            ))}
          </li>
        )

      case "image":
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={node.attrs?.src} alt={node.attrs?.alt || ""} />
        )

      case "blockquote":
        return (
          <blockquote>
            {node.content?.map((child, index) => (
              <Fragment key={index}>{renderNode(child)}</Fragment>
            ))}
          </blockquote>
        )

      default:
        console.warn(`Unhandled node type: ${node.type}`)
        return null
    }
  }

  return renderNode(content)
}
