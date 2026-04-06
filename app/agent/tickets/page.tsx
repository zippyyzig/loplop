"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import AgentDashboardNav from "@/components/agent/agent-dashboard-nav"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Ticket, Clock, CheckCircle2, AlertCircle, MessageSquare, X } from "lucide-react"

interface TicketData {
  _id: string
  subject: string
  description: string
  category: string
  priority: string
  status: string
  created_at: string
  admin_reply?: string
  replies?: Array<{
    id: string
    message: string
    sender_type: string
    sender_name: string
    created_at: string
  }>
}

export default function AgentTicketsPage() {
  const [tickets, setTickets] = useState<TicketData[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    category: "general",
    priority: "medium",
  })

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {
    try {
      const res = await fetch("/api/agent/tickets")
      const data = await res.json()
      setTickets(data)
    } catch (error) {
      console.error("[v0] Error loading tickets:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch("/api/agent/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setShowCreateModal(false)
        setFormData({ subject: "", description: "", category: "general", priority: "medium" })
        loadTickets()
      }
    } catch (error) {
      console.error("[v0] Error creating ticket:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const openCount = tickets.filter((t) => t.status === "open").length
  const inProgressCount = tickets.filter((t) => t.status === "in_progress").length
  const resolvedCount = tickets.filter((t) => t.status === "resolved" || t.status === "closed").length

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
        return <AlertCircle className="h-3.5 w-3.5" />
      case "in_progress":
        return <Clock className="h-3.5 w-3.5" />
      case "resolved":
      case "closed":
        return <CheckCircle2 className="h-3.5 w-3.5" />
      default:
        return <Ticket className="h-3.5 w-3.5" />
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="flex flex-col md:flex-row">
          <AgentDashboardNav />

          <div className="flex-1 px-4 py-8 md:py-12">
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold text-foreground">Support Tickets</h1>
                  <p className="text-sm text-muted-foreground">
                    Create and manage your support requests
                  </p>
                </div>
                <Button onClick={() => setShowCreateModal(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Ticket
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Ticket className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total</p>
                      <p className="text-xl font-bold text-foreground">{tickets.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Open</p>
                      <p className="text-xl font-bold text-foreground">{openCount}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">In Progress</p>
                      <p className="text-xl font-bold text-foreground">{inProgressCount}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Resolved</p>
                      <p className="text-xl font-bold text-foreground">{resolvedCount}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tickets List */}
              {loading ? (
                <div className="border border-border rounded-lg p-8 text-center">
                  <p className="text-sm text-muted-foreground">Loading tickets...</p>
                </div>
              ) : tickets.length === 0 ? (
                <div className="border border-dashed border-border rounded-lg p-12 text-center">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Ticket className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-sm font-medium text-foreground mb-1">No tickets yet</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Create your first support ticket to get help from our team
                  </p>
                  <Button onClick={() => setShowCreateModal(true)} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Ticket
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {tickets.map((ticket) => (
                    <Link
                      key={ticket._id}
                      href={`/agent/tickets/${ticket._id}`}
                      className="block border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors bg-card"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-foreground truncate">
                              {ticket.subject}
                            </h3>
                            {(ticket.admin_reply || (ticket.replies && ticket.replies.length > 0)) && (
                              <span className="flex items-center gap-1 text-xs text-primary">
                                <MessageSquare className="h-3 w-3" />
                                Reply
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                            {ticket.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(ticket.status)}`}
                            >
                              {getStatusIcon(ticket.status)}
                              {ticket.status.replace("_", " ")}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${getPriorityColor(ticket.priority)}`}
                            >
                              {ticket.priority}
                            </span>
                            <span className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground capitalize">
                              {ticket.category}
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs text-muted-foreground">
                            {new Date(ticket.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl w-full max-w-lg max-h-[90vh] overflow-auto shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Create Support Ticket</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  placeholder="Brief description of your issue"
                  className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing</option>
                    <option value="property">Property Listing</option>
                    <option value="account">Account</option>
                    <option value="feature">Feature Request</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  placeholder="Provide detailed information about your issue or request..."
                  rows={5}
                  className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={submitting} className="flex-1">
                  {submitting ? "Submitting..." : "Submit Ticket"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
