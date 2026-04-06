"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/dashboard/page-header"
import { Skeleton } from "@/components/ui/skeleton"
import { User, Shield, Send, CheckCircle2, Clock, AlertCircle } from "lucide-react"

interface Reply {
  id: string
  message: string
  sender_type: "agent" | "admin"
  sender_name: string
  created_at: string
}

interface TicketData {
  _id: string
  subject: string
  description: string
  category?: string
  priority: string
  status: string
  customer_name?: string
  customer_email?: string
  user_id?: string
  created_at: string
  updated_at?: string
  admin_reply?: string
  replied_at?: string
  replies?: Reply[]
}

export default function AdminTicketDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [ticket, setTicket] = useState<TicketData | null>(null)
  const [loading, setLoading] = useState(true)
  const [replyMessage, setReplyMessage] = useState("")
  const [newStatus, setNewStatus] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadTicket()
  }, [id])

  const loadTicket = async () => {
    try {
      const res = await fetch(`/api/admin/tickets/${id}`)
      const data = await res.json()
      setTicket(data)
      setNewStatus(data.status)
    } catch (error) {
      console.error("[v0] Error loading ticket:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyMessage.trim()) return

    setSubmitting(true)
    try {
      const res = await fetch(`/api/admin/tickets/${id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reply_message: replyMessage,
          status: newStatus,
        }),
      })
      if (res.ok) {
        setReplyMessage("")
        loadTicket()
      }
    } catch (error) {
      console.error("[v0] Error submitting reply:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      high: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    }
    return colors[priority] || "bg-muted text-muted-foreground"
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      open: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      in_progress: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      resolved: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      closed: "bg-muted text-muted-foreground",
    }
    return colors[status] || "bg-muted text-muted-foreground"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4" />
      case "in_progress":
        return <Clock className="h-4 w-4" />
      case "resolved":
      case "closed":
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  // Combine old admin_reply with new replies array
  const getAllReplies = (): Reply[] => {
    if (!ticket) return []
    const replies: Reply[] = []

    // Add old admin_reply for backward compatibility
    if (ticket.admin_reply && ticket.replied_at && !ticket.replies?.some(r => r.message === ticket.admin_reply)) {
      replies.push({
        id: "legacy-admin-reply",
        message: ticket.admin_reply,
        sender_type: "admin",
        sender_name: "Admin",
        created_at: ticket.replied_at,
      })
    }

    // Add new format replies
    if (ticket.replies) {
      replies.push(...ticket.replies)
    }

    // Sort by date
    return replies.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Loading Ticket..." showBackButton backHref="/admin/tickets" />
        <div className="space-y-4 max-w-4xl">
          <Skeleton className="h-8 w-3/4" />
          <div className="grid grid-cols-4 gap-4">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
          <Skeleton className="h-40" />
        </div>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Ticket Not Found"
          description="The requested ticket could not be found"
          showBackButton
          backHref="/admin/tickets"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title={ticket.subject}
        description={`Ticket ID: ${ticket._id}`}
        showBackButton
        backHref="/admin/tickets"
      />

      {/* Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-card border border-border rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Status</p>
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${getStatusColor(ticket.status)}`}
          >
            {getStatusIcon(ticket.status)}
            {ticket.status.replace("_", " ")}
          </span>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Priority</p>
          <span
            className={`inline-flex px-2 py-1 rounded text-xs font-medium capitalize ${getPriorityColor(ticket.priority)}`}
          >
            {ticket.priority}
          </span>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Category</p>
          <p className="text-sm font-medium text-foreground capitalize">{ticket.category || "General"}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Customer</p>
          <p className="text-sm font-medium text-foreground truncate">
            {ticket.customer_name || "N/A"}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Created</p>
          <p className="text-sm font-medium text-foreground">
            {new Date(ticket.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Original Message */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">
                  {ticket.customer_name || "Customer"}
                </p>
                {ticket.customer_email && (
                  <span className="text-xs text-muted-foreground">{ticket.customer_email}</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {new Date(ticket.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {ticket.description}
          </p>
        </div>
      </div>

      {/* Conversation Thread */}
      {getAllReplies().length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Conversation</h2>
          {getAllReplies().map((reply) => (
            <div
              key={reply.id}
              className={`bg-card border border-border rounded-lg overflow-hidden ${
                reply.sender_type === "admin" ? "border-l-2 border-l-primary" : ""
              }`}
            >
              <div className="p-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      reply.sender_type === "admin" ? "bg-primary/10" : "bg-muted"
                    }`}
                  >
                    {reply.sender_type === "admin" ? (
                      <Shield className="h-4 w-4 text-primary" />
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{reply.sender_name}</p>
                      {reply.sender_type === "admin" && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary">
                          ADMIN
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(reply.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {reply.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply Form */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">Reply to Ticket</h3>
        <form onSubmit={handleSubmitReply} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
              Update Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full md:w-auto px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
              Reply Message
            </label>
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your response to the customer..."
              rows={5}
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={submitting || !replyMessage.trim()}>
              <Send className="h-4 w-4 mr-2" />
              {submitting ? "Sending..." : "Send Reply"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
