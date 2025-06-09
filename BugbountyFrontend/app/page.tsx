"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Target, Trophy, Users, Bug, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [stats, setStats] = useState({
    totalReports: 1247,
    activeHunters: 89,
    resolvedVulns: 892,
    totalRewards: 45600,
  })

  const recentReports = [
    {
      id: 1,
      title: "SQL Injection in Login Form",
      severity: "High",
      status: "Under Review",
      reporter: "hunter_alex",
      reward: 500,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      title: "XSS in Comment Section",
      severity: "Medium",
      status: "Resolved",
      reporter: "sec_ninja",
      reward: 250,
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      title: "CSRF Token Bypass",
      severity: "High",
      status: "Triaging",
      reporter: "bug_finder",
      reward: 400,
      timestamp: "1 day ago",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500"
      case "High":
        return "bg-orange-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "Under Review":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "Triaging":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />
      default:
        return <Bug className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Secure Bug Bounty Platform
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find Vulnerabilities,
            <span className="text-blue-600"> Earn Rewards</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our community of ethical hackers and security researchers. Test your skills on intentionally vulnerable
            applications and get rewarded for finding security flaws.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/targets">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Target className="w-5 h-5 mr-2" />
                Start Hunting
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button size="lg" variant="outline">
                <Trophy className="w-5 h-5 mr-2" />
                View Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Bug className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">{stats.totalReports.toLocaleString()}</div>
                <div className="text-gray-600">Total Reports</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">{stats.activeHunters}</div>
                <div className="text-gray-600">Active Hunters</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">{stats.resolvedVulns}</div>
                <div className="text-gray-600">Resolved Vulnerabilities</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">${stats.totalRewards.toLocaleString()}</div>
                <div className="text-gray-600">Total Rewards</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <p className="text-gray-600">Latest vulnerability reports from our community</p>
          </div>

          <div className="grid gap-6">
            {recentReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(report.status)}
                        <h3 className="font-semibold text-gray-900">{report.title}</h3>
                        <Badge className={`${getSeverityColor(report.severity)} text-white`}>{report.severity}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>
                          Reported by <span className="font-medium">@{report.reporter}</span>
                        </span>
                        <span>•</span>
                        <span>{report.timestamp}</span>
                        <span>•</span>
                        <span className="font-medium text-green-600">${report.reward}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-4">
                      {report.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/reports">
              <Button variant="outline">View All Reports</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-gray-600">Everything you need for ethical hacking and security research</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Target className="w-10 h-10 text-blue-600 mb-4" />
                <CardTitle>Diverse Targets</CardTitle>
                <CardDescription>
                  Practice on various vulnerable applications including OWASP Juice Shop, DVWA, and custom challenges
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Trophy className="w-10 h-10 text-yellow-600 mb-4" />
                <CardTitle>Reward System</CardTitle>
                <CardDescription>
                  Earn points and rewards based on vulnerability severity and impact. Compete on our leaderboard
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-10 h-10 text-green-600 mb-4" />
                <CardTitle>Safe Environment</CardTitle>
                <CardDescription>
                  Practice ethical hacking in a controlled, legal environment designed for learning and skill
                  development
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
