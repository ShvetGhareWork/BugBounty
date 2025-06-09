"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Trophy, Medal, Award, Crown, TrendingUp, Bug, Target, Calendar } from "lucide-react"

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState("all-time")

  const topHunters = [
    {
      rank: 1,
      username: "sec_master",
      avatar: "/placeholder-user.jpg",
      points: 15420,
      reportsSubmitted: 89,
      reportsResolved: 76,
      totalReward: 12500,
      badges: ["Elite Hunter", "Bug Crusher", "Critical Finder"],
      joinedDate: "2023-01-15",
      streak: 45,
    },
    {
      rank: 2,
      username: "vuln_hunter",
      avatar: "/placeholder-user.jpg",
      points: 13890,
      reportsSubmitted: 72,
      reportsResolved: 65,
      totalReward: 10800,
      badges: ["Expert Hunter", "SQL Ninja"],
      joinedDate: "2023-02-20",
      streak: 32,
    },
    {
      rank: 3,
      username: "cyber_sleuth",
      avatar: "/placeholder-user.jpg",
      points: 12340,
      reportsSubmitted: 68,
      reportsResolved: 58,
      totalReward: 9750,
      badges: ["XSS Specialist", "CSRF Detective"],
      joinedDate: "2023-03-10",
      streak: 28,
    },
    {
      rank: 4,
      username: "bug_whisperer",
      avatar: "/placeholder-user.jpg",
      points: 11200,
      reportsSubmitted: 55,
      reportsResolved: 48,
      totalReward: 8900,
      badges: ["Mobile Expert"],
      joinedDate: "2023-04-05",
      streak: 21,
    },
    {
      rank: 5,
      username: "exploit_dev",
      avatar: "/placeholder-user.jpg",
      points: 10850,
      reportsSubmitted: 61,
      reportsResolved: 52,
      totalReward: 8200,
      badges: ["RCE Master", "Privilege Escalation"],
      joinedDate: "2023-01-30",
      streak: 19,
    },
  ]

  const monthlyStats = [
    { month: "Jan 2024", reports: 145, hunters: 23, rewards: 15600 },
    { month: "Feb 2024", reports: 167, hunters: 28, rewards: 18900 },
    { month: "Mar 2024", reports: 189, hunters: 31, rewards: 21200 },
    { month: "Apr 2024", reports: 203, hunters: 35, rewards: 24500 },
    { month: "May 2024", reports: 178, hunters: 29, rewards: 19800 },
    { month: "Jun 2024", reports: 156, hunters: 26, rewards: 17300 },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">{rank}</span>
    }
  }

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200"
      case 2:
        return "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200"
      case 3:
        return "bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200"
      default:
        return "bg-white border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-600" />
            <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
          </div>
          <p className="text-gray-600">Top security researchers and bug hunters in our community</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  Top Bug Hunters
                </CardTitle>
                <CardDescription>Ranked by total points earned from vulnerability discoveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topHunters.map((hunter) => (
                    <div key={hunter.rank} className={`p-4 rounded-lg border ${getRankBg(hunter.rank)}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12">{getRankIcon(hunter.rank)}</div>
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={hunter.avatar || "/placeholder.svg"} alt={hunter.username} />
                            <AvatarFallback>{hunter.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-gray-900">@{hunter.username}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{hunter.points.toLocaleString()} points</span>
                              <span>•</span>
                              <span>
                                {hunter.reportsResolved}/{hunter.reportsSubmitted} reports
                              </span>
                              <span>•</span>
                              <span className="text-green-600 font-medium">${hunter.totalReward.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm text-orange-600 mb-1">
                            <TrendingUp className="w-4 h-4" />
                            <span>{hunter.streak} day streak</span>
                          </div>
                          <div className="flex flex-wrap gap-1 justify-end">
                            {hunter.badges.slice(0, 2).map((badge, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                            {hunter.badges.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{hunter.badges.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Monthly Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">203</div>
                    <div className="text-sm text-gray-600">Reports Submitted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">35</div>
                    <div className="text-sm text-gray-600">Active Hunters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">$24.5K</div>
                    <div className="text-sm text-gray-600">Rewards Paid</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bug className="w-5 h-5 text-red-600" />
                  Top Vulnerabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">SQL Injection</span>
                    <div className="flex items-center gap-2">
                      <Progress value={75} className="w-16 h-2" />
                      <span className="text-sm font-medium">45</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">XSS</span>
                    <div className="flex items-center gap-2">
                      <Progress value={60} className="w-16 h-2" />
                      <span className="text-sm font-medium">36</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">CSRF</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-16 h-2" />
                      <span className="text-sm font-medium">27</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">RCE</span>
                    <div className="flex items-center gap-2">
                      <Progress value={30} className="w-16 h-2" />
                      <span className="text-sm font-medium">18</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-yellow-500" />
                    <span>
                      <strong>sec_master</strong> earned "Elite Hunter" badge
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-blue-500" />
                    <span>
                      <strong>vuln_hunter</strong> reached 10K points
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-green-500" />
                    <span>
                      <strong>cyber_sleuth</strong> found critical vulnerability
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
