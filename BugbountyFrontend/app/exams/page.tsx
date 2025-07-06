"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  BookOpen,
  Search,
  Clock,
  Users,
  Trophy,
  CheckCircle,
  Lock,
  Play,
  Shield,
  Code,
  Globe,
  Smartphone,
  Eye,
} from "lucide-react";
import Link from "next/link";

export default function ExamsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const examCategories = [
    {
      id: "web-security",
      name: "Web Application Security",
      icon: Globe,
      color: "bg-blue-500",
      description: "SQL injection, XSS, CSRF, and web vulnerabilities",
      examCount: 12,
    },
    {
      id: "network-security",
      name: "Network Security",
      icon: Shield,
      color: "bg-green-500",
      description: "Network protocols, firewalls, and infrastructure security",
      examCount: 8,
    },
    {
      id: "mobile-security",
      name: "Mobile Security",
      icon: Smartphone,
      color: "bg-purple-500",
      description: "iOS and Android application security testing",
      examCount: 6,
    },
    {
      id: "secure-coding",
      name: "Secure Coding",
      icon: Code,
      color: "bg-orange-500",
      description: "Secure development practices and code review",
      examCount: 10,
    },
  ];

  const exams = [
    {
      id: 1,
      title: "Web Security Fundamentals",
      description:
        "Basic concepts of web application security including OWASP Top 10",
      category: "Web Application Security",
      difficulty: "Beginner",
      duration: 45,
      questions: 30,
      participants: 1247,
      passRate: 78,
      maxScore: 100,
      userScore: null,
      status: "Available",
      prerequisites: ["Security Basics", "Networking Fundamentals"],
      topics: [
        "OWASP Top 10",
        "HTTP Security",
        "Authentication",
        "Session Management",
      ],
      certification: "Web Security Foundation",
    },
    {
      id: 2,
      title: "Advanced SQL Injection Techniques",
      description:
        "Deep dive into SQL injection attacks, detection, and prevention",
      category: "Web Application Security",
      difficulty: "Advanced",
      duration: 90,
      questions: 50,
      participants: 456,
      passRate: 45,
      maxScore: 100,
      userScore: null,
      status: "Available",
      prerequisites: ["Web Security Fundamentals"],
      topics: [
        "Blind SQL Injection",
        "Time-based Attacks",
        "NoSQL Injection",
        "Prevention Techniques",
      ],
      certification: "SQL Security Expert",
    },
    {
      id: 3,
      title: "Cross-Site Scripting (XSS) Mastery",
      description:
        "Comprehensive guide to XSS vulnerabilities and exploitation",
      category: "Web Application Security",
      difficulty: "Intermediate",
      duration: 60,
      questions: 40,
      participants: 892,
      passRate: 62,
      maxScore: 100,
      userScore: 85,
      status: "Completed",
      prerequisites: ["Web Security Fundamentals"],
      topics: [
        "Reflected XSS",
        "Stored XSS",
        "DOM XSS",
        "XSS Prevention",
        "Content Security Policy",
      ],
      certification: "XSS Security Specialist",
    },
    {
      id: 4,
      title: "Network Security Essentials",
      description: "Fundamental concepts of network security and protocols",
      category: "Network Security",
      difficulty: "Beginner",
      duration: 50,
      questions: 35,
      participants: 734,
      passRate: 71,
      maxScore: 100,
      userScore: 63,
      status: "Available",
      prerequisites: ["Security Basics", "Networking Fundamentals"],
      topics: ["TCP/IP Security", "Firewalls", "VPNs", "Network Monitoring"],
      certification: "Network Security Foundation",
    },
    {
      id: 5,
      title: "Mobile App Security Testing",
      description: "Security testing methodologies for mobile applications",
      category: "Mobile Security",
      difficulty: "Intermediate",
      duration: 75,
      questions: 45,
      participants: 321,
      passRate: 58,
      maxScore: 100,
      userScore: 35,
      status: "Locked",
      prerequisites: [
        "Network Security Essentials",
        "Web Security Fundamentals",
      ],
      topics: [
        "Static Analysis",
        "Dynamic Analysis",
        "Runtime Protection",
        "Mobile OWASP Top 10",
      ],
      certification: "Mobile Security Analyst",
    },
    {
      id: 6,
      title: "Secure Code Review",
      description:
        "Best practices for identifying security vulnerabilities in code",
      category: "Secure Coding",
      difficulty: "Advanced",
      duration: 120,
      questions: 60,
      participants: 198,
      passRate: 38,
      maxScore: 100,
      userScore: 63,
      status: "Available",
      prerequisites: [
        "Web Security Fundamentals",
        "Advanced SQL Injection Techniques",
      ],
      topics: [
        "Static Code Analysis",
        "Manual Code Review",
        "Security Patterns",
        "Threat Modeling",
      ],
      certification: "Secure Code Reviewer",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Locked":
        return "bg-gray-100 text-gray-800";
      case "In Progress":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Available":
        return <Play className="w-4 h-4" />;
      case "Completed":
        return <CheckCircle className="w-4 h-4" />;
      case "Locked":
        return <Lock className="w-4 h-4" />;
      case "In Progress":
        return <Clock className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "all" ||
      exam.difficulty.toLowerCase() === difficultyFilter;
    const matchesCategory =
      categoryFilter === "all" ||
      exam.category.toLowerCase().includes(categoryFilter.toLowerCase());

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Cybersecurity Exams
            </h1>
          </div>
          <p className="text-gray-600">
            Test your knowledge and earn certifications in various cybersecurity
            domains
          </p>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Exam Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {examCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-3`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {category.description}
                    </p>
                    <Badge variant="secondary">
                      {category.examCount} exams
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search exams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={difficultyFilter}
              onValueChange={setDifficultyFilter}
            >
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
                <SelectItem value="web">Web Security</SelectItem>
                <SelectItem value="network">Network Security</SelectItem>
                <SelectItem value="mobile">Mobile Security</SelectItem>
                <SelectItem value="coding">Secure Coding</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredExams.length} of {exams.length} exams
          </p>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{exam.title}</CardTitle>
                    <div className="flex gap-2 mb-3">
                      <Badge className={getDifficultyColor(exam.difficulty)}>
                        {exam.difficulty}
                      </Badge>
                      <Badge className={getStatusColor(exam.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(exam.status)}
                          {exam.status}
                        </div>
                      </Badge>
                      {exam.userScore && (
                        <Badge className="bg-purple-100 text-purple-800">
                          Score: {exam.userScore}%
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-600 mb-1">
                      <Trophy className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {exam.certification}
                      </span>
                    </div>
                  </div>
                </div>
                <CardDescription>{exam.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                        <Clock className="w-3 h-3" />
                        <span>{exam.duration}m</span>
                      </div>
                      <div className="text-xs text-gray-500">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{exam.questions}</span>
                      </div>
                      <div className="text-xs text-gray-500">Questions</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                        <Users className="w-3 h-3" />
                        <span>{exam.participants}</span>
                      </div>
                      <div className="text-xs text-gray-500">Taken</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600 mb-1 font-medium">
                        {exam.passRate}%
                      </div>
                      <div className="text-xs text-gray-500">Pass Rate</div>
                    </div>
                  </div>

                  {/* Progress for completed exams */}
                  {exam.userScore && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Your Score</span>
                        <span className="text-gray-900 font-medium">
                          {exam.userScore}%
                        </span>
                      </div>
                      <Progress value={exam.userScore} className="h-2" />
                    </div>
                  )}

                  {/* Topics */}
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-2">
                      Topics Covered:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {exam.topics.slice(0, 3).map((topic, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {topic}
                        </Badge>
                      ))}
                      {exam.topics.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{exam.topics.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  {exam.prerequisites.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-2">
                        Prerequisites:
                      </div>
                      <div className="text-sm mb-2 text-gray-600">
                        {exam.prerequisites.join(", ")}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Link href={`/exams/${exam.id}`}>
                    <Button
                      className="w-full"
                      disabled={exam.status === "Locked"}
                      variant={
                        exam.status === "Completed" ? "outline" : "default"
                      }
                    >
                      {exam.status === "Available" && (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start Exam
                        </>
                      )}
                      {exam.status === "Completed" && (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          Review Results
                        </>
                      )}
                      {exam.status === "Locked" && (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Complete Prerequisites
                        </>
                      )}
                      {exam.status === "In Progress" && (
                        <>
                          <Clock className="w-4 h-4 mr-2" />
                          Continue Exam
                        </>
                      )}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExams.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No exams found
            </h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
