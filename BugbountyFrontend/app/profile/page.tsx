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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Edit3,
  Camera,
  Mail,
  Calendar,
  MapPin,
  LinkIcon,
  Github,
  Twitter,
  Trophy,
  Bug,
  Target,
  Award,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Eye,
  MessageSquare,
  Save,
  X,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  // User profile data (this would come from your API/context)
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "", // This cannot be edited
    bio: "",
    location: "",
    website: "",
    github: "",
    twitter: "",
    profileImage: "",
    joinedDate: "",
    totalPoints: 0,
    rank: 0,
    reportsSubmitted: 0,
    reportsResolved: 0,
    totalReward: 0,
    currentStreak: 0,
    longestStreak: 0,
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
    // Here you would make an API call to update the profile
    console.log("Saving profile data:", editData);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  // Mock report history data
  const reportHistory = [
    {
      id: "VR-2024-015",
      title: "SQL Injection in User Search",
      target: "OWASP Juice Shop",
      severity: "High",
      status: "Resolved",
      submittedAt: "2024-01-10T14:30:00Z",
      reward: 500,
      comments: 5,
      views: 67,
    },
    {
      id: "VR-2024-012",
      title: "XSS in Profile Comments",
      target: "DVWA",
      severity: "Medium",
      status: "Under Review",
      submittedAt: "2024-01-08T09:15:00Z",
      reward: 250,
      comments: 3,
      views: 34,
    },
    {
      id: "VR-2024-009",
      title: "CSRF in Password Change",
      target: "WebGoat",
      severity: "Medium",
      status: "Resolved",
      submittedAt: "2024-01-05T16:45:00Z",
      reward: 300,
      comments: 8,
      views: 89,
    },
    {
      id: "VR-2024-006",
      title: "Information Disclosure in API",
      target: "API Security Challenge",
      severity: "Low",
      status: "Rejected",
      submittedAt: "2024-01-03T11:20:00Z",
      reward: 0,
      comments: 2,
      views: 23,
    },
    {
      id: "VR-2024-003",
      title: "Remote Code Execution via Upload",
      target: "VulnHub Challenge",
      severity: "Critical",
      status: "Resolved",
      submittedAt: "2024-01-01T13:10:00Z",
      reward: 1000,
      comments: 15,
      views: 234,
    },
  ];

  const achievements = [
    {
      name: "First Blood",
      description: "First vulnerability report",
      icon: "🩸",
      earned: true,
    },
    {
      name: "Bug Crusher",
      description: "10 resolved reports",
      icon: "🐛",
      earned: true,
    },
    {
      name: "Critical Finder",
      description: "Found a critical vulnerability",
      icon: "🔥",
      earned: true,
    },
    {
      name: "Streak Master",
      description: "30-day reporting streak",
      icon: "⚡",
      earned: false,
    },
    {
      name: "Elite Hunter",
      description: "100 resolved reports",
      icon: "👑",
      earned: false,
    },
    {
      name: "Community Helper",
      description: "Helped 50+ other hunters",
      icon: "🤝",
      earned: true,
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500 text-white";
      case "High":
        return "bg-orange-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-white";
      case "Low":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "Under Review":
        return "bg-blue-100 text-blue-800";
      case "Triaging":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle className="w-4 h-4" />;
      case "Under Review":
        return <Clock className="w-4 h-4" />;
      case "Triaging":
        return <AlertTriangle className="w-4 h-4" />;
      case "Rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Bug className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="w-32 h-32">
                    <AvatarImage
                      src={profileData.profileImage || "/placeholder.svg"}
                      alt={profileData.username}
                    />
                    <AvatarFallback className="text-2xl">
                      {profileData.firstName[0]}
                      {profileData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Dialog
                    open={isImageDialogOpen}
                    onOpenChange={setIsImageDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="icon"
                        className="absolute -bottom-2 -right-2 rounded-full w-8 h-8"
                        variant="secondary"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Profile Picture</DialogTitle>
                        <DialogDescription>
                          Upload a new profile picture or choose from gallery
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Button className="w-full">Upload New Image</Button>
                        <Button variant="outline" className="w-full">
                          Choose from Gallery
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setIsImageDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="text-center mt-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                  <p className="text-gray-600">@{profileData.username}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Trophy className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium">
                      Rank #{profileData.rank}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Profile Information
                    </h2>
                    <p className="text-gray-600">
                      Manage your account details and preferences
                    </p>
                  </div>
                  <Button
                    onClick={() =>
                      isEditing ? handleSave() : setIsEditing(true)
                    }
                    className={
                      isEditing ? "bg-green-600 hover:bg-green-700" : ""
                    }
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        value={editData.firstName}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            firstName: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">
                        {profileData.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        value={editData.lastName}
                        onChange={(e) =>
                          setEditData({ ...editData, lastName: e.target.value })
                        }
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">
                        {profileData.lastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="username">Username</Label>
                    {isEditing ? (
                      <Input
                        id="username"
                        value={editData.username}
                        onChange={(e) =>
                          setEditData({ ...editData, username: e.target.value })
                        }
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">
                        @{profileData.username}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-600">{profileData.email}</p>
                      <Badge variant="secondary" className="text-xs">
                        Cannot be changed
                      </Badge>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        value={editData.bio}
                        onChange={(e) =>
                          setEditData({ ...editData, bio: e.target.value })
                        }
                        rows={3}
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.bio}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={editData.location}
                        onChange={(e) =>
                          setEditData({ ...editData, location: e.target.value })
                        }
                        placeholder="City, Country"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <p className="text-gray-900">{profileData.location}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    {isEditing ? (
                      <Input
                        id="website"
                        value={editData.website}
                        onChange={(e) =>
                          setEditData({ ...editData, website: e.target.value })
                        }
                        placeholder="https://yourwebsite.com"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <LinkIcon className="w-4 h-4 text-gray-400" />
                        <a
                          href={profileData.website}
                          className="text-blue-600 hover:underline"
                        >
                          {profileData.website}
                        </a>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="github">GitHub</Label>
                    {isEditing ? (
                      <Input
                        id="github"
                        value={editData.github}
                        onChange={(e) =>
                          setEditData({ ...editData, github: e.target.value })
                        }
                        placeholder="username"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Github className="w-4 h-4 text-gray-400" />
                        <a
                          href={`https://github.com/${profileData.github}`}
                          className="text-blue-600 hover:underline"
                        >
                          @{profileData.github}
                        </a>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    {isEditing ? (
                      <Input
                        id="twitter"
                        value={editData.twitter}
                        onChange={(e) =>
                          setEditData({ ...editData, twitter: e.target.value })
                        }
                        placeholder="username"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Twitter className="w-4 h-4 text-gray-400" />
                        <a
                          href={`https://twitter.com/${profileData.twitter}`}
                          className="text-blue-600 hover:underline"
                        >
                          @{profileData.twitter}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-2 mt-6">
                    <Button onClick={handleCancel} variant="outline">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats and Activity */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900">
                    {profileData.totalPoints.toLocaleString()}
                  </div>
                  <div className="text-gray-600">Total Points</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Bug className="w-8 h-8 text-red-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900">
                    {profileData.reportsSubmitted}
                  </div>
                  <div className="text-gray-600">Reports Submitted</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900">
                    {profileData.reportsResolved}
                  </div>
                  <div className="text-gray-600">Reports Resolved</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900">
                    ${profileData.totalReward.toLocaleString()}
                  </div>
                  <div className="text-gray-600">Total Rewards</div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Activity Streaks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Current Streak</span>
                        <span className="font-medium">
                          {profileData.currentStreak} days
                        </span>
                      </div>
                      <Progress
                        value={
                          (profileData.currentStreak /
                            profileData.longestStreak) *
                          100
                        }
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      Longest streak: {profileData.longestStreak} days
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    Member Since
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {new Date(profileData.joinedDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </div>
                  <div className="text-gray-600">
                    {Math.floor(
                      (Date.now() -
                        new Date(profileData.joinedDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days active
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Report History</CardTitle>
                <CardDescription>
                  Your vulnerability reports and their current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportHistory.map((report) => (
                    <div
                      key={report.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">
                              {report.title}
                            </h3>
                            <Badge
                              className={getSeverityColor(report.severity)}
                            >
                              {report.severity}
                            </Badge>
                            <Badge className={getStatusColor(report.status)}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(report.status)}
                                {report.status}
                              </div>
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Target: {report.target}</span>
                            <span>•</span>
                            <span>{formatDate(report.submittedAt)}</span>
                            <span>•</span>
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
                          <div className="text-lg font-bold text-green-600">
                            ${report.reward}
                          </div>
                          <div className="text-xs text-gray-500">
                            {report.id}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Achievements & Badges</CardTitle>
                <CardDescription>
                  Your earned achievements and progress towards new ones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        achievement.earned
                          ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
                          : "bg-gray-50 border-gray-200 opacity-60"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{achievement.icon}</div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {achievement.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {achievement.description}
                        </p>
                        {achievement.earned && (
                          <Badge className="mt-2 bg-green-100 text-green-800">
                            Earned
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your recent actions and contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Bug className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Submitted report</span>{" "}
                        "SQL Injection in User Search"
                      </p>
                      <p className="text-xs text-gray-600">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Report resolved</span>{" "}
                        "XSS in Profile Comments" - $250 reward
                      </p>
                      <p className="text-xs text-gray-600">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <Award className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">
                          Achievement unlocked
                        </span>{" "}
                        "Bug Crusher" badge
                      </p>
                      <p className="text-xs text-gray-600">3 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Target className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Started hunting</span> on
                        VulnHub Challenge
                      </p>
                      <p className="text-xs text-gray-600">5 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
