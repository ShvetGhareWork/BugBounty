"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Bug,
  Plus,
  Search,
  Eye,
  MessageSquare,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)

  const reports = [
    {
      id: "VR-2024-001",
      title: "SQL Injection in User Authentication",
      description: "Found SQL injection vulnerability in login form allowing authentication bypass",
      severity: "Critical",
      status: "Under Review",
      target: "OWASP Juice Shop",
      reporter: "alex_hunter",
      submittedAt: "2024-01-15T10:30:00Z",
      reward: 750,
      comments: 3,
      views: 45,
    },
    {
      id: "VR-2024-002",
      title: "Cross-Site Scripting (XSS) in Comment Section",
      description: "Stored XSS vulnerability allows execution of malicious scripts",
      severity: "High",
      status: "Resolved",
      target: "DVWA",
      reporter: "sec_ninja",
      submittedAt: "2024-01-14T15:45:00Z",
      reward: 500,
      comments: 7,
      views: 89,
    },
    {
      id: "VR-2024-003",
      title: "CSRF Token Bypass in Profile Update",
      description: "Missing CSRF protection allows unauthorized profile modifications",
      severity: "Medium",
      status: "Triaging",
      target: "WebGoat",
      reporter: "bug_finder",
      submittedAt: "2024-01-13T09:15:00Z",
      reward: 300,
      comments: 2,
      views: 23,
    },
    {
      id: "VR-2024-004",
      title: "Information Disclosure in Error Messages",
      description: "Detailed error messages reveal sensitive system information",
      severity: "Low",
      status: "Rejected",
      target: "API Security Challenge",
      reporter: "info_seeker",
      submittedAt: "2024-01-12T14:20:00Z",
      reward: 0,
      comments: 1,
      views: 12,
    },
    {
      id: "VR-2024-005",
      title: "Privilege Escalation via File Upload",
      description: "Unrestricted file upload leads to remote code execution",
      severity: "Critical",
      status: "Resolved",
      target: "VulnHub Challenge",
      reporter: "root_access",
      submittedAt: "2024-01-11T11:00:00Z",
      reward: 1000,
      comments: 12,
      views: 156,
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500 text-white"
      case "High":
        return "bg-orange-500 text-white"
      case "Medium":
        return "bg-yellow-500 text-white"
      case "Low":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800"
      case "Under Review":
        return "bg-blue-100 text-blue-800"
      case "Triaging":
        return "bg-yellow-100 text-yellow-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle className="w-4 h-4" />
      case "Under Review":
        return <Clock className="w-4 h-4" />
      case "Triaging":
        return <AlertTriangle className="w-4 h-4" />
      case "Rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return <Bug className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.target.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status.toLowerCase().replace(" ", "-") === statusFilter
    const matchesSeverity = severityFilter === "all" || report.severity.toLowerCase() === severityFilter

    return matchesSearch && matchesStatus && matchesSeverity
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Bug className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Vulnerability Reports</h1>
            </div>
            <p className="text-gray-600">Browse and manage vulnerability reports from the community</p>
          </div>

          <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Submit Report
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Submit Vulnerability Report</DialogTitle>
                <DialogDescription>
                  Provide detailed information about the vulnerability you discovered
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="target">Target Application</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select target" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="juice-shop">OWASP Juice Shop</SelectItem>
                        <SelectItem value="dvwa">DVWA</SelectItem>
                        <SelectItem value="webgoat">WebGoat</SelectItem>
                        <SelectItem value="vulnhub">VulnHub Challenge</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="severity">Severity</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="title">Vulnerability Title</Label>
                  <Input placeholder="Brief description of the vulnerability" />
                </div>
                <div>
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea
                    placeholder="Provide a detailed description of the vulnerability, including steps to reproduce..."
                    rows={6}
                  />
                </div>
                <div>
                  <Label htmlFor="impact">Impact Assessment</Label>
                  <Textarea placeholder="Describe the potential impact of this vulnerability..." rows={3} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsSubmitDialogOpen(false)}>Submit Report</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="triaging">Triaging</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredReports.length} of {reports.length} reports
          </p>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                      <Badge className={getSeverityColor(report.severity)}>{report.severity}</Badge>
                      <Badge className={getStatusColor(report.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(report.status)}
                          {report.status}
                        </div>
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{report.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>@{report.reporter}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(report.submittedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Target:</span>
                        <span>{report.target}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{report.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{report.views}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600 mb-1">${report.reward}</div>
                    <div className="text-sm text-gray-500">Reward</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Report ID: <span className="font-mono">{report.id}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <Bug className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
