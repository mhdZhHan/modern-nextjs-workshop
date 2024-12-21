"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Comment {
  id: number
  author: string
  content: string
  date: string
  replies: Comment[]
}

const mockComments: Comment[] = [
  {
    id: 1,
    author: "Alice Johnson",
    content: "Great article! I learned a lot about React Hooks.",
    date: "2023-06-16",
    replies: [
      {
        id: 2,
        author: "Bob Smith",
        content: "I agree, very informative!",
        date: "2023-06-16",
        replies: [],
      },
    ],
  },
  {
    id: 3,
    author: "Charlie Brown",
    content: "Could you explain more about useEffect?",
    date: "2023-06-17",
    replies: [],
  },
]

interface CommentProps {
  comment: Comment
  depth?: number
  onReply: (parentId: number, content: string) => void
}

function CommentComponent({ comment, depth = 0, onReply }: CommentProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState("")

  const handleReply = () => {
    onReply(comment.id, replyContent)
    setReplyContent("")
    setIsReplying(false)
  }

  return (
    <div className={`mt-4 ${depth > 0 ? "ml-6" : ""}`}>
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.author}`}
          />
          <AvatarFallback>{comment.author[0]}</AvatarFallback>
        </Avatar>

        <div className="grow">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{comment.author}</h4>

            <span className="text-sm text-gray-500">{comment.date}</span>
          </div>

          <p className="mt-1">{comment.content}</p>

          <div className="mt-2 space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsReplying(!isReplying)}
            >
              Reply
            </Button>
            {comment.replies.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="mr-2 h-4 w-4" />
                    Hide Replies
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Show Replies
                  </>
                )}
              </Button>
            )}
          </div>

          {isReplying && (
            <div className="mt-2">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="mb-2"
              />
              <Button onClick={handleReply}>Post Reply</Button>
            </div>
          )}
        </div>
      </div>

      {isExpanded && comment.replies.length > 0 && (
        <div className="mt-2 border-l-2 border-gray-200 pl-4">
          {comment.replies.map((reply) => (
            <CommentComponent
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface CommentSectionProps {
  postId: string
}

// eslint-disable-next-line unused-imports/no-unused-vars
export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState("")

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    const newCommentObj: Comment = {
      id: comments.length + 1,
      author: "Current User", // In a real app, this would be the logged-in user
      content: newComment,
      date: new Date().toISOString().split("T")[0],
      replies: [],
    }
    setComments([newCommentObj, ...comments])
    setNewComment("")
  }

  const handleReply = (parentId: number, content: string) => {
    const newReply: Comment = {
      id:
        Math.max(
          ...comments.flatMap((c) => [c.id, ...c.replies.map((r) => r.id)])
        ) + 1,
      author: "Current User", // In a real app, this would be the logged-in user
      content: content,
      date: new Date().toISOString().split("T")[0],
      replies: [],
    }

    const updatedComments = comments.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, replies: [newReply, ...comment.replies] }
      }
      return {
        ...comment,
        replies: comment.replies.map((reply) =>
          reply.id === parentId
            ? { ...reply, replies: [newReply, ...reply.replies] }
            : reply
        ),
      }
    })

    setComments(updatedComments)
  }

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmitComment} className="mb-6">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="mb-2"
        />

        <Button type="submit">Post Comment</Button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentComponent
            key={comment.id}
            comment={comment}
            onReply={handleReply}
          />
        ))}
      </div>
    </div>
  )
}
