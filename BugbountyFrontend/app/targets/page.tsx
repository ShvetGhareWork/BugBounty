"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Target, Search, ExternalLink, Users, Bug, Clock, Star } from "lucide-react"

export default function TargetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const targets = [
    {
      id: 1,
      name: "OWASP Juice Shop",
      description: "Modern and sophisticated insecure web application for security trainings",
      category: "Web Application",
      difficulty: "Beginner",
      participants: 234,
      vulnerabilities: 45,
      maxReward: 1000,
      progress: 67,
      tags: ["OWASP", "JavaScript", "Node.js"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "DVWA",
      description: "Damn Vulnerable Web Application - PHP/MySQL web application",
      category: "Web Application",
      difficulty: "Intermediate",
      participants: 189,
      vulnerabilities: 32,
      maxReward: 800,
      progress: 45,
      tags: ["PHP", "MySQL", "Classic"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "WebGoat",
      description: "Deliberately insecure application maintained by OWASP",
      category: "Web Application",
      difficulty: "Intermediate",
      participants: 156,
      vulnerabilities: 28,
      maxReward: 750,
      progress: 78,
      tags: ["Java", "Spring", "Educational"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "VulnHub Challenge",
      description: "Custom vulnerable VM with multiple attack vectors",
      category: "Virtual Machine",
      difficulty: "Advanced",
      participants: 67,
      vulnerabilities: 15,
      maxReward: 1500,
      progress: 23,
      tags: ["Linux", "Privilege Escalation", "Network"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      name: "Mobile Security Lab",
      description: "Android application with various mobile security flaws",
      category: "Mobile Application",
      difficulty: "Advanced",
      participants: 89,
      vulnerabilities: 22,
      maxReward: 1200,
      progress: 34,
      tags: ["Android", "Mobile", "APK"],
      status: "Coming Soon",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      name: "API Security Challenge",
      description: "RESTful API with authentication and authorization flaws",
      category: "API",
      difficulty: "Intermediate",
      participants: 145,
      vulnerabilities: 18,
      maxReward: 900,
      progress: 56,
      tags: ["REST API", "JWT", "OAuth"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Coming Soon":
        return "bg-blue-100 text-blue-800"
      case "Maintenance":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredTargets = targets.filter((target) => {
    const matchesSearch =
      target.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      target.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === "all" || target.difficulty.toLowerCase() === difficultyFilter
    const matchesCategory =
      categoryFilter === "all" || target.category.toLowerCase().includes(categoryFilter.toLowerCase())

    return matchesSearch && matchesDifficulty && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Vulnerable Targets</h1>
          </div>
          <p className="text-gray-600">
            Practice your security skills on intentionally vulnerable applications and systems
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search targets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="web">Web Application</SelectItem>
                <SelectItem value="mobile">Mobile Application</SelectItem>
                <SelectItem value="api">API</SelectItem>
                <SelectItem value="vm">Virtual Machine</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredTargets.length} of {targets.length} targets
          </p>
        </div>

        {/* Targets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTargets.map((target) => (
            <Card key={target.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-t-lg flex items-center justify-center">
                <Target className="w-12 h-12 text-blue-600" />
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{target.name}</CardTitle>
                    <div className="flex gap-2 mb-3">
                      <Badge className={getDifficultyColor(target.difficulty)}>{target.difficulty}</Badge>
                      <Badge className={getStatusColor(target.status)}>{target.status}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
                <CardDescription className="text-sm">{target.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                        <Users className="w-3 h-3" />
                        <span>{target.participants}</span>
                      </div>
                      <div className="text-xs text-gray-500">Hunters</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                        <Bug className="w-3 h-3" />
                        <span>{target.vulnerabilities}</span>
                      </div>
                      <div className="text-xs text-gray-500">Vulns</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600 mb-1 font-medium">${target.maxReward}</div>
                      <div className="text-xs text-gray-500">Max Reward</div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Discovery Progress</span>
                      <span className="text-gray-900 font-medium">{target.progress}%</span>
                    </div>
                    <Progress value={target.progress} className="h-2" />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {target.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button className="w-full" disabled={target.status !== "Active"}>
                    {target.status === "Active" ? (
                      <>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Start Hunting
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4 mr-2" />
                        {target.status}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTargets.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No targets found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
