"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Bug,
  Plus,
  Search,
  Eye,
  MessageSquare,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  User,
} from "lucide-react";
import { createReport } from "./reportService.js"; // Assume this is your API function
import toast from "react-hot-toast";

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(
    null
  );

  useEffect(() => {
    const userData = localStorage.getItem("Name");
    if (userData) {
      setCurrentUser({ username: userData });
    }
  }, []);

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

  const [targetApplication, setTargetApplication] = useState("");
  const [severity, setSeverity] = useState("");
  const [vulnerabilityTitle, setVulnerabilityTitle] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [impactAssessment, setImpactAssessment] = useState("");
  type Report = {
    id: string;
    _id?: string;
    title: string;
    description: string;
    severity: string;
    status: string;
    target: string;
    reporter: string;
    submittedAt: string;
    reward: number;
    comments: number;
    views: number;
    // Add any other fields you expect from your API
    targetApplication?: string;
    vulnerabilityTitle?: string;
    detailedDescription?: string;
    impactAssessment?: string;
    createdAt?: string;
  };

  const [Reports, setReports] = useState<Report[]>([]);
  const [Myreports, setMyReports] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reports`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            targetApplication,
            severity,
            vulnerabilityTitle,
            detailedDescription,
            impactAssessment,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Report submitted:", data);
        toast.success("Report submitted successfully!");
        setIsSubmitDialogOpen(false);
      } else {
        console.error("Error submitting report:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredReports = Reports.filter((report) => {
    const title = report.vulnerabilityTitle?.toLowerCase() || "";
    const description = report.detailedDescription?.toLowerCase() || "";
    const target = report.targetApplication?.toLowerCase() || "";

    const matchesSearch =
      title.includes(searchTerm.toLowerCase()) ||
      description.includes(searchTerm.toLowerCase()) ||
      target.includes(searchTerm.toLowerCase());

    const matchesSeverity =
      severityFilter === "all" ||
      report.severity.toLowerCase() === severityFilter.toLowerCase();

    return matchesSearch && matchesSeverity;
  });

  useEffect(() => {
    const fetchReports = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reports`
      );
      const data = await response.json();
      setReports(data);
      // console.log("Fetched reports", data);
    };

    fetchReports();
  }, []);

  useEffect(() => {
    const fetchMyReports = async () => {
      try {
        const token = localStorage.getItem("token");
        // console.log("Fetching reports with token:", token);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reports/my-reports`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch your reports");
        }

        const data = await response.json();
        setMyReports(data.createdBy); // or setReports(data)
        console.log(data);
      } catch (error) {
        console.error("Error fetching your reports:", error);
      }
      // Removed count calculation as data is not an array

      // If you want to calculate points based on Myreports, use:
    };

    fetchMyReports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Bug className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Vulnerability Reports
              </h1>
            </div>
            <p className="text-gray-600">
              Browse and manage vulnerability reports from the community
            </p>
          </div>

          <Dialog
            open={isSubmitDialogOpen}
            onOpenChange={setIsSubmitDialogOpen}
          >
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
                  Provide detailed information about the vulnerability you
                  discovered
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="target">Target Application</Label>
                      <Select
                        value={targetApplication}
                        onValueChange={setTargetApplication}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select target" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="juice-shop">
                            OWASP Juice Shop
                          </SelectItem>
                          <SelectItem value="dvwa">DVWA</SelectItem>
                          <SelectItem value="webgoat">WebGoat</SelectItem>
                          <SelectItem value="vulnhub">
                            VulnHub Challenge
                          </SelectItem>
                          <SelectItem value="tryhackme">
                            TryHackMe Lab
                          </SelectItem>
                          <SelectItem value="hackthebox">
                            HackTheBox Machine
                          </SelectItem>
                          <SelectItem value="portswigger">
                            PortSwigger Labs
                          </SelectItem>
                          <SelectItem value="cloudgoat">
                            CloudGoat AWS Challenge
                          </SelectItem>
                          <SelectItem value="ctflearn">
                            CTFLearn Challenge
                          </SelectItem>
                          <SelectItem value="root-me">
                            Root-Me Challenge
                          </SelectItem>
                          <SelectItem value="bodgeit">BodgeIt Store</SelectItem>
                          <SelectItem value="mutillidae">
                            Mutillidae II
                          </SelectItem>
                          <SelectItem value="nodegoat">NodeGoat</SelectItem>
                          <SelectItem value="security-shepherd">
                            OWASP Security Shepherd
                          </SelectItem>
                          <SelectItem value="api-lab">
                            API Security Lab
                          </SelectItem>
                          <SelectItem value="cryptopalace">
                            CryptoPalace Challenge
                          </SelectItem>
                          <SelectItem value="overflow">
                            Buffer Overflow Challenge
                          </SelectItem>
                          <SelectItem value="csrf-lab">
                            CSRF Exploit Lab
                          </SelectItem>
                          <SelectItem value="xxe-lab">
                            XXE Injection Lab
                          </SelectItem>
                          <SelectItem value="idor-lab">
                            IDOR Exploit Lab
                          </SelectItem>
                          <SelectItem value="jwt-lab">
                            JWT Vulnerabilities Lab
                          </SelectItem>
                          <SelectItem value="oauth-lab">
                            OAuth Exploitation Lab
                          </SelectItem>
                          <SelectItem value="sqli-lab">
                            SQL Injection Lab
                          </SelectItem>
                          <SelectItem value="ssrf-lab">
                            SSRF Attack Lab
                          </SelectItem>
                          <SelectItem value="xss-game">XSS Game</SelectItem>
                          <SelectItem value="websocket-lab">
                            WebSockets Vulnerability Lab
                          </SelectItem>
                          <SelectItem value="docker-breakout">
                            Docker Breakout
                          </SelectItem>
                          <SelectItem value="k8s-hack-lab">
                            Kubernetes Hack Lab
                          </SelectItem>
                          <SelectItem value="reverseme">
                            ReverseMe Binary
                          </SelectItem>
                          <SelectItem value="android-crackme">
                            Android CrackMe
                          </SelectItem>
                          <SelectItem value="ios-crackme">
                            iOS CrackMe
                          </SelectItem>
                          <SelectItem value="cloud-hackthebox">
                            HackTheBox Cloud Challenge
                          </SelectItem>
                          <SelectItem value="forensics-lab">
                            Forensics Challenge
                          </SelectItem>
                          <SelectItem value="pwnable">
                            Pwnable.kr Challenge
                          </SelectItem>
                          <SelectItem value="binary-exploit">
                            Binary Exploitation Lab
                          </SelectItem>
                          <SelectItem value="mobile-security">
                            Mobile Security Lab
                          </SelectItem>
                          <SelectItem value="injection-hunt">
                            Injection Hunt Lab
                          </SelectItem>
                          <SelectItem value="crypto-vault">
                            CryptoVault
                          </SelectItem>
                          <SelectItem value="oscp-lab">
                            OSCP Prep Lab
                          </SelectItem>
                          <SelectItem value="pentesterlab">
                            PentesterLab Badge
                          </SelectItem>
                          <SelectItem value="sandbox-escape">
                            Sandbox Escape
                          </SelectItem>
                          <SelectItem value="privilege-escalation">
                            Privilege Escalation Lab
                          </SelectItem>
                          <SelectItem value="misconfiguration">
                            Misconfiguration Challenge
                          </SelectItem>
                          <SelectItem value="ssti-lab">
                            SSTI Injection Lab
                          </SelectItem>
                          <SelectItem value="dns-exfil">
                            DNS Exfiltration Lab
                          </SelectItem>
                          <SelectItem value="cloud-misconf">
                            Cloud Misconfiguration Lab
                          </SelectItem>
                          <SelectItem value="malware-analysis">
                            Malware Analysis Sandbox
                          </SelectItem>
                          <SelectItem value="c2-lab">
                            Command & Control Lab
                          </SelectItem>
                          <SelectItem value="web-hackthebox">
                            HackTheBox Web Challenge
                          </SelectItem>
                          <SelectItem value="thm-vulnnet">
                            TryHackMe VulnNet
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="severity">Severity</Label>
                      <Select value={severity} onValueChange={setSeverity}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Critical">Critical</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="title">Vulnerability Title</Label>
                    <Input
                      value={vulnerabilityTitle}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setVulnerabilityTitle(e.target.value)
                      }
                      placeholder="Brief description of the vulnerability"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      value={detailedDescription}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setDetailedDescription(e.target.value)
                      }
                      placeholder="Provide a detailed description of the vulnerability, including steps to reproduce..."
                      rows={6}
                    />
                  </div>
                  <div>
                    <Label htmlFor="impact">Impact Assessment</Label>
                    <Textarea
                      value={impactAssessment}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setImpactAssessment(e.target.value)
                      }
                      placeholder="Describe the potential impact of this vulnerability..."
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsSubmitDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        // setIsSubmitDialogOpen(false);
                      }}
                    >
                      Submit Report
                    </Button>
                  </div>
                </div>
              </form>
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
            Showing {filteredReports.length} of {Reports.length} reports
          </p>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((data) => (
            <Card key={data.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {data.vulnerabilityTitle || "Unititled Report"}
                      </h3>
                      <Badge className={getSeverityColor(data.severity)}>
                        {data.severity}
                      </Badge>
                      {/* Status */}
                      {/* <Badge className={getStatusColor(report.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(report.status)}
                          {report.status}
                        </div>
                      </Badge> */}
                    </div>
                    <p className="text-gray-600 mb-3">
                      {data.detailedDescription}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>@{Myreports}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(data.createdAt || "")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Target:</span>
                        <span>{data.targetApplication}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>7</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>45</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      $2000
                    </div>
                    <div className="text-sm text-gray-500">Reward</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Report ID:{" "}
                    <span className="font-mono">{data._id || ""}</span>
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No reports found
            </h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
