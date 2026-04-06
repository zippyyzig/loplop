"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/dashboard/page-header"
import { Ticket, Clock, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react"

interface TicketData {
  _id: string
  subject: string
  description: string
  category?: string
  priority: string
  status: string
  customer_name?: string
  customer_email?: string
  created_at: string
  replies?: Array<any>
}

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<TicketData[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const res = await fetch("/api/admin/tickets")
        const data = await res.json()
        setTickets(data)
      } catch (error) {
        console.error("[v0] Error loading tickets:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTickets()
  }, [])

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

  const openCount = tickets.filter((t) => t.status === "open").length
  const inProgressCount = tickets.filter((t) => t.status === "in_progress").length
  const resolvedCount = tickets.filter((t) => t.status === "resolved" || t.status === "closed").length

  const filteredTickets = filter === "all" ? tickets : tickets.filter((t) => t.status === filter)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Support Tickets"
        description="Manage and respond to customer support requests"
      />

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

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-border pb-3 overflow-x-auto">
        {[
          { value: "all", label: "All" },
          { value: "open", label: "Open" },
          { value: "in_progress", label: "In Progress" },
          { value: "resolved", label: "Resolved" },
          { value: "closed", label: "Closed" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filter === tab.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tickets List */}
      {loading ? (
        <div className="border border-border rounded-lg p-8 text-center">
          <p className="text-sm text-muted-foreground">Loading tickets...</p>
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="border border-dashed border-border rounded-lg p-12 text-center">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Ticket className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-sm font-medium text-foreground mb-1">No tickets found</h3>
          <p className="text-xs text-muted-foreground">
            {filter === "all"
              ? "There are no support tickets yet."
              : `There are no ${filter.replace("_", " ")} tickets.`}
          </p>
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">Ticket</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground hidden md:table-cell">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground hidden sm:table-cell">
                  Created
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket._id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground truncate max-w-[200px]">
                            {ticket.subject}
                          </p>
                          {ticket.replies && ticket.replies.length > 0 && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MessageSquare className="h-3 w-3" />
                              {ticket.replies.length}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {ticket.category || "General"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div>
                      <p className="text-xs font-medium text-foreground">{ticket.customer_name || "N/A"}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                        {ticket.customer_email || ""}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(ticket.status)}`}
                    >
                      {getStatusIcon(ticket.status)}
                      <span className="hidden sm:inline">{ticket.status.replace("_", " ")}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <p className="text-xs text-muted-foreground">
                      {new Date(ticket.created_at).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button asChild variant="ghost" size="sm" className="text-xs h-7">
                      <Link href={`/admin/tickets/${ticket._id}`}>View</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
