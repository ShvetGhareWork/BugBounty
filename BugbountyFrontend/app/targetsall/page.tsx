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
  Target,
  Search,
  ExternalLink,
  Users,
  Bug,
  Clock,
  Star,
} from "lucide-react";
import Link from "next/link";

export default function TargetsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const targets = [
    {
      id: 1,
      name: "OWASP Juice Shop",
      description:
        "Modern and sophisticated insecure web application for security trainings",
      category: "Web Application",
      difficulty: "Beginner",
      participants: 234,
      vulnerabilities: 45,
      maxReward: 1000,
      progress: 67,
      tags: ["OWASP", "JavaScript", "Node.js"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://owasp.org/www-project-juice-shop/",
    },
    {
      id: 2,
      name: "DVWA",
      description:
        "Damn Vulnerable Web Application - PHP/MySQL web application",
      category: "Web Application",
      difficulty: "Intermediate",
      participants: 189,
      vulnerabilities: 32,
      maxReward: 800,
      progress: 45,
      tags: ["PHP", "MySQL", "Classic"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "http://www.dvwa.co.uk/",
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
      link: "https://owasp.org/www-project-webgoat/",
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
      link: "https://www.vulnhub.com/",
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
      link: "https://github.com/ajinabraham/Mobile-Security-Framework-MobSF",
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
      link: "https://github.com/OWASP/api-security-project",
    },
    {
      id: 7,
      name: "HackTheBox - Optimum",
      description: "Windows-based vulnerable machine from HackTheBox platform",
      category: "Virtual Machine",
      difficulty: "Intermediate",
      participants: 134,
      vulnerabilities: 12,
      maxReward: 1000,
      progress: 48,
      tags: ["Windows", "Reverse Shell", "Exploit Development"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://www.hackthebox.com/machines/optimum",
    },
    {
      id: 8,
      name: "PortSwigger Web Security Academy",
      description: "Free online security labs covering web vulnerabilities",
      category: "Web Application",
      difficulty: "Beginner",
      participants: 305,
      vulnerabilities: 50,
      maxReward: 700,
      progress: 72,
      tags: ["XSS", "SQLi", "CSRF"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://portswigger.net/web-security",
    },
    {
      id: 9,
      name: "Metasploitable 2",
      description: "Intentionally vulnerable Linux VM for penetration testing",
      category: "Virtual Machine",
      difficulty: "Beginner",
      participants: 200,
      vulnerabilities: 20,
      maxReward: 600,
      progress: 58,
      tags: ["Linux", "Network", "Privilege Escalation"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://sourceforge.net/projects/metasploitable/",
    },
    {
      id: 10,
      name: "OWASP Security Shepherd",
      description: "Open-source web and mobile security training platform",
      category: "Web Application",
      difficulty: "Intermediate",
      participants: 111,
      vulnerabilities: 30,
      maxReward: 850,
      progress: 35,
      tags: ["OWASP", "CORS", "IDOR"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://owasp.org/www-project-security-shepherd/",
    },
    {
      id: 11,
      name: "TryHackMe - RootMe",
      description:
        "A beginner-friendly Linux machine with common web vulnerabilities.",
      category: "Virtual Machine",
      difficulty: "Beginner",
      participants: 450,
      vulnerabilities: 8,
      maxReward: 700,
      progress: 80,
      tags: ["Linux", "Web", "Filesystem"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://tryhackme.com/room/rootme",
    },
    {
      id: 12,
      name: "Web for Pentester",
      description:
        "Contains various web vulnerabilities to practice web penetration testing.",
      category: "Web Application",
      difficulty: "Intermediate",
      participants: 95,
      vulnerabilities: 25,
      maxReward: 850,
      progress: 60,
      tags: ["SQLi", "XSS", "LFI"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://pentesterlab.com/exercises/web_for_pentester",
    },
    {
      id: 13,
      name: "HackTheBox - Lame",
      description:
        "Classic easy Linux box for basic enumeration and privilege escalation.",
      category: "Virtual Machine",
      difficulty: "Beginner",
      participants: 280,
      vulnerabilities: 5,
      maxReward: 650,
      progress: 90,
      tags: ["Linux", "FTP", "Samba"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://www.hackthebox.com/machines/lame",
    },
    {
      id: 14,
      name: "OWASP Broken Web Applications Project",
      description:
        "Collection of vulnerable web applications for security testing.",
      category: "Web Application",
      difficulty: "Intermediate",
      participants: 170,
      vulnerabilities: 40,
      maxReward: 950,
      progress: 55,
      tags: ["OWASP", "Multiple", "PHP"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://owasp.org/www-project-broken-web-applications/",
    },
    {
      id: 15,
      name: "Vulnerable Java Application",
      description:
        "A sample Java application designed to be vulnerable for learning.",
      category: "Web Application",
      difficulty: "Intermediate",
      participants: 75,
      vulnerabilities: 15,
      maxReward: 780,
      progress: 40,
      tags: ["Java", "Spring", "Serialization"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://github.com/GoSecure/vulnerable-java-app",
    },
    {
      id: 16,
      name: "MobileGoat",
      description:
        "An Android application designed to be vulnerable for mobile security training.",
      category: "Mobile Application",
      difficulty: "Intermediate",
      participants: 60,
      vulnerabilities: 18,
      maxReward: 1100,
      progress: 28,
      tags: ["Android", "Reverse Engineering", "Frida"],
      status: "Coming Soon",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://github.com/OWASP/mobilegoat",
    },
    {
      id: 17,
      name: "HackTheBox - Grandpa",
      description: "An old Windows XP machine with common vulnerabilities.",
      category: "Virtual Machine",
      difficulty: "Beginner",
      participants: 190,
      vulnerabilities: 7,
      maxReward: 700,
      progress: 75,
      tags: ["Windows", "SMB", "Exploit"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://www.hackthebox.com/machines/grandpa",
    },
    {
      id: 18,
      name: "Damn Vulnerable iOS App (DVIA)",
      description: "An iOS application that is intentionally vulnerable.",
      category: "Mobile Application",
      difficulty: "Advanced",
      participants: 50,
      vulnerabilities: 15,
      maxReward: 1300,
      progress: 15,
      tags: ["iOS", "Swift", "Objective-C"],
      status: "Coming Soon",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://github.com/prateekg147/Damn-Vulnerable-iOS-App-DVIA",
    },
    {
      id: 19,
      name: "OWASP API Security Top 10",
      description: "A practical playground for the OWASP API Security Top 10.",
      category: "API",
      difficulty: "Intermediate",
      participants: 100,
      vulnerabilities: 10,
      maxReward: 950,
      progress: 65,
      tags: ["API", "OWASP", "Authentication"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://github.com/OWASP/API-Security-Top-10-Playground",
    },
    {
      id: 20,
      name: "TryHackMe - Blue",
      description: "A Windows machine vulnerable to MS17-010 (EternalBlue).",
      category: "Virtual Machine",
      difficulty: "Beginner",
      participants: 400,
      vulnerabilities: 3,
      maxReward: 800,
      progress: 95,
      tags: ["Windows", "SMB", "EternalBlue"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://tryhackme.com/room/blue",
    },
    {
      id: 21,
      name: "HackTheBox - Devel",
      description: "An easy Windows machine with IIS 7.5 upload vulnerability.",
      category: "Virtual Machine",
      difficulty: "Beginner",
      participants: 250,
      vulnerabilities: 4,
      maxReward: 720,
      progress: 88,
      tags: ["Windows", "IIS", "Upload"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://www.hackthebox.com/machines/devel",
    },
    {
      id: 22,
      name: "OWASP Web Security Testing Guide (WSTG)",
      description:
        "Provides comprehensive testing methodology for web applications.",
      category: "Web Application",
      difficulty: "All",
      participants: 500,
      vulnerabilities: 100,
      maxReward: 0,
      progress: 100,
      tags: ["OWASP", "Methodology", "Documentation"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://owasp.org/www-project-web-security-testing-guide/",
    },
    {
      id: 23,
      name: "PentesterLab - SQLi",
      description: "Specific labs focusing on SQL injection vulnerabilities.",
      category: "Web Application",
      difficulty: "Intermediate",
      participants: 120,
      vulnerabilities: 10,
      maxReward: 700,
      progress: 60,
      tags: ["SQLi", "Database", "Injection"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://pentesterlab.com/exercises?q=SQLi",
    },
    {
      id: 24,
      name: "TryHackMe - Simple CTF",
      description:
        "A basic CTF machine to practice web enumeration and privilege escalation.",
      category: "Virtual Machine",
      difficulty: "Beginner",
      participants: 300,
      vulnerabilities: 6,
      maxReward: 680,
      progress: 85,
      tags: ["Linux", "CTF", "Enumeration"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://tryhackme.com/room/simplectf",
    },
    {
      id: 25,
      name: "OWASP Top 10",
      description: "The top 10 most critical web application security risks.",
      category: "Web Application",
      difficulty: "Beginner",
      participants: 600,
      vulnerabilities: 10,
      maxReward: 0,
      progress: 100,
      tags: ["OWASP", "Awareness", "Risk"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://owasp.org/www-project-top-ten/",
    },
    {
      id: 26,
      name: "HackTheBox - Chatterbox",
      description: "Windows machine with a vulnerable chat application.",
      category: "Virtual Machine",
      difficulty: "Intermediate",
      participants: 110,
      vulnerabilities: 9,
      maxReward: 900,
      progress: 52,
      tags: ["Windows", "Buffer Overflow", "Exploit"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://www.hackthebox.com/machines/chatterbox",
    },
    {
      id: 27,
      name: "Exploit-Exercises - Protostar",
      description: "A series of challenges to learn exploit development.",
      category: "Binary Exploitation",
      difficulty: "Advanced",
      participants: 40,
      vulnerabilities: 20,
      maxReward: 1800,
      progress: 10,
      tags: ["Linux", "Buffer Overflow", "ROP"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://exploit-exercises.com/protostar/",
    },
    {
      id: 28,
      name: "Game of Hacks",
      description:
        "Interactive game to identify vulnerabilities in code snippets.",
      category: "Code Review",
      difficulty: "Beginner",
      participants: 180,
      vulnerabilities: 30,
      maxReward: 500,
      progress: 70,
      tags: ["Code Review", "Quiz", "Educational"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "http://www.gameofhacks.com/",
    },
    {
      id: 29,
      name: "TryHackMe - Kenobi",
      description: "A Linux machine with Samba and ProFTPD vulnerabilities.",
      category: "Virtual Machine",
      difficulty: "Intermediate",
      participants: 350,
      vulnerabilities: 7,
      maxReward: 850,
      progress: 68,
      tags: ["Linux", "Samba", "ProFTPD"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://tryhackme.com/room/kenobi",
    },
    {
      id: 30,
      name: "CyberTalents CTF Platform",
      description: "Various CTF challenges across different security domains.",
      category: "CTF Platform",
      difficulty: "Mixed",
      participants: 200,
      vulnerabilities: 50,
      maxReward: 1000,
      progress: 40,
      tags: ["CTF", "Forensics", "Reverse Engineering"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://cybertalents.com/",
    },
    {
      id: 31,
      name: "Google CTF",
      description: "Annual Capture The Flag competition by Google.",
      category: "CTF Platform",
      difficulty: "Advanced",
      participants: 100,
      vulnerabilities: 25,
      maxReward: 2000,
      progress: 20,
      tags: ["CTF", "Reversing", "Pwn"],
      status: "Inactive (Past)",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://capturetheflag.withgoogle.com/",
    },
    {
      id: 32,
      name: "Web Security Dojo",
      description:
        "A fully-featured Linux environment for web security testing.",
      category: "Virtual Machine",
      difficulty: "Intermediate",
      participants: 90,
      vulnerabilities: 35,
      maxReward: 800,
      progress: 30,
      tags: ["Linux", "Web", "Tools"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://www.websecuritydojo.com/",
    },
    {
      id: 33,
      name: "Vulnerable React App",
      description:
        "A modern React application with common frontend vulnerabilities.",
      category: "Web Application",
      difficulty: "Intermediate",
      participants: 70,
      vulnerabilities: 12,
      maxReward: 900,
      progress: 45,
      tags: ["React", "JavaScript", "Frontend"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://github.com/snyk/vulnerable-app",
    },
    {
      id: 34,
      name: "HackTheBox - Optimum",
      description: "Windows-based vulnerable machine from HackTheBox platform",
      category: "Virtual Machine",
      difficulty: "Intermediate",
      participants: 134,
      vulnerabilities: 12,
      maxReward: 1000,
      progress: 48,
      tags: ["Windows", "Reverse Shell", "Exploit Development"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://www.hackthebox.com/machines/optimum",
    },
    {
      id: 35,
      name: "Security Innovation - CMD+CTRL",
      description: "Interactive web application security training platform.",
      category: "Web Application",
      difficulty: "Mixed",
      participants: 150,
      vulnerabilities: 30,
      maxReward: 1000,
      progress: 60,
      tags: ["Web", "Training", "Gamified"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://www.securityinnovation.com/training/cmd-ctrl/",
    },
    {
      id: 36,
      name: "Root-Me",
      description:
        "Online platform with various challenges in web, network, and reverse engineering.",
      category: "CTF Platform",
      difficulty: "Mixed",
      participants: 280,
      vulnerabilities: 80,
      maxReward: 1200,
      progress: 55,
      tags: ["CTF", "Web", "Network", "Crypto"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://www.root-me.org/",
    },
    {
      id: 37,
      name: "eLearnSecurity - INE Labs",
      description: "Hands-on labs for various security certifications.",
      category: "Training Platform",
      difficulty: "Mixed",
      participants: 100,
      vulnerabilities: 50,
      maxReward: 1500,
      progress: 30,
      tags: ["Penetration Testing", "Certifications", "Labs"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://ine.com/pages/cyber-security",
    },
    {
      id: 38,
      name: "Open Source Vulnerable PHP App",
      description:
        "A simple PHP application with known vulnerabilities for practice.",
      category: "Web Application",
      difficulty: "Beginner",
      participants: 100,
      vulnerabilities: 15,
      maxReward: 600,
      progress: 70,
      tags: ["PHP", "SQLi", "XSS"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://github.com/snoopysecurity/web-vulnerable-app",
    },
    {
      id: 39,
      name: "Virtual Hacking Labs",
      description:
        "Online penetration testing lab environment for various difficulty levels.",
      category: "Training Platform",
      difficulty: "Mixed",
      participants: 70,
      vulnerabilities: 40,
      maxReward: 1600,
      progress: 25,
      tags: ["Labs", "Penetration Testing", "VMs"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://www.virtualhackinglabs.com/",
    },
    {
      id: 40,
      name: "Exploit Database - Shellcodes",
      description:
        "A repository of shellcodes and exploits, useful for learning.",
      category: "Exploit Development",
      difficulty: "Advanced",
      participants: 80,
      vulnerabilities: 200,
      maxReward: 0,
      progress: 10,
      tags: ["Exploit", "Shellcode", "Assembly"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://www.exploit-db.com/shellcodes",
    },
    {
      id: 41,
      name: "HackTheBox - UnsecuredAPI",
      description:
        "A REST API lab simulating insecure deserialization vulnerabilities.",
      category: "Web Application",
      difficulty: "Advanced",
      participants: 55,
      vulnerabilities: 5,
      maxReward: 1100,
      progress: 30,
      tags: ["Deserialization", "Java", "Python"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://app.hackthebox.com/",
    },
    {
      id: 42,
      name: "PortSwigger SSRF Lab",
      description:
        "PortSwigger's dedicated labs covering server-side request forgery (SSRF).",
      category: "Web Application",
      difficulty: "Intermediate",
      participants: 90,
      vulnerabilities: 7,
      maxReward: 950,
      progress: 50,
      tags: ["SSRF", "Network", "Cloud"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://portswigger.net/web-security/ssrf",
    },
    {
      id: 43,
      name: "WebGoat - XXE",
      description:
        "WebGoat challenge focusing on XML External Entity (XXE) injection.",
      category: "Web Application",
      difficulty: "Intermediate",
      participants: 85,
      vulnerabilities: 6,
      maxReward: 900,
      progress: 48,
      tags: ["XXE", "XML", "Parsing"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://owasp.org/www-project-webgoat/",
    },
    {
      id: 44,
      name: "TryHackMe - WebSockets Lab",
      description:
        "Hands-on lab covering WebSocket security and authentication issues.",
      category: "Web Application",
      difficulty: "Advanced",
      participants: 60,
      vulnerabilities: 8,
      maxReward: 1200,
      progress: 35,
      tags: ["WebSockets", "Real-time", "Authentication"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://tryhackme.com/",
    },
    {
      id: 45,
      name: "HackTheBox - IDOR Exploit",
      description:
        "Bug bounty simulation for insecure direct object references (IDOR).",
      category: "Web Application",
      difficulty: "Beginner",
      participants: 160,
      vulnerabilities: 10,
      maxReward: 750,
      progress: 65,
      tags: ["IDOR", "Authorization", "Access Control"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://app.hackthebox.com/",
    },
    {
      id: 46,
      name: "PortSwigger CSRF Labs",
      description:
        "Interactive CSRF exploitation labs with various difficulty levels.",
      category: "Web Application",
      difficulty: "Beginner",
      participants: 140,
      vulnerabilities: 9,
      maxReward: 700,
      progress: 70,
      tags: ["CSRF", "Web", "Session"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://portswigger.net/web-security/csrf",
    },
    {
      id: 47,
      name: "OWASP Cryptography Playground",
      description:
        "API lab simulating cryptography flaws and weak encryption implementations.",
      category: "API",
      difficulty: "Advanced",
      participants: 45,
      vulnerabilities: 7,
      maxReward: 1300,
      progress: 25,
      tags: ["Cryptography", "API", "Encryption"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://owasp.org/www-community/vulnerabilities/Weak_Cryptography",
    },
    {
      id: 48,
      name: "CloudGoat by Rhino Security",
      description:
        "Cloud-based security challenge covering AWS misconfigurations.",
      category: "Cloud Security",
      difficulty: "Advanced",
      participants: 30,
      vulnerabilities: 10,
      maxReward: 1700,
      progress: 15,
      tags: ["Cloud", "AWS", "Azure", "Misconfiguration"],
      status: "Coming Soon",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://github.com/RhinoSecurityLabs/cloudgoat",
    },
    {
      id: 49,
      name: "CTF Learn: Container Breakout",
      description:
        "A capture-the-flag challenge simulating container escape attacks.",
      category: "Container Security",
      difficulty: "Advanced",
      participants: 25,
      vulnerabilities: 5,
      maxReward: 1900,
      progress: 10,
      tags: ["Docker", "Kubernetes", "Container"],
      status: "Coming Soon",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://ctflearn.com/",
    },
    {
      id: 50,
      name: "VulnHub - JWT War",
      description:
        "Virtual machine challenge simulating web and API vulnerabilities in JWT and OAuth flows.",
      category: "Virtual Machine",
      difficulty: "Advanced",
      participants: 250,
      vulnerabilities: 30,
      maxReward: 1480,
      progress: 50,
      tags: ["JWT", "OAuth"],
      status: "Active",
      image: "/placeholder.svg?height=200&width=300",
      link: "https://www.vulnhub.com/",
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
      case "Active":
        return "bg-green-100 text-green-800";
      case "Coming Soon":
        return "bg-blue-100 text-blue-800";
      case "Maintenance":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTargets = targets.filter((target) => {
    const matchesSearch =
      target.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      target.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "all" ||
      target.difficulty.toLowerCase() === difficultyFilter;
    const matchesCategory =
      categoryFilter === "all" ||
      target.category.toLowerCase().includes(categoryFilter.toLowerCase());

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Vulnerable Targets
            </h1>
          </div>
          <p className="text-gray-600">
            Practice your security skills on intentionally vulnerable
            applications and systems
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
                    <CardTitle className="text-lg mb-2">
                      {target.name}
                    </CardTitle>
                    <div className="flex gap-2 mb-3">
                      <Badge className={getDifficultyColor(target.difficulty)}>
                        {target.difficulty}
                      </Badge>
                      <Badge className={getStatusColor(target.status)}>
                        {target.status}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
                <CardDescription className="text-sm">
                  {target.description}
                </CardDescription>
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
                      <div className="text-gray-600 mb-1 font-medium">
                        ${target.maxReward}
                      </div>
                      <div className="text-xs text-gray-500">Max Reward</div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Discovery Progress</span>
                      <span className="text-gray-900 font-medium">
                        {target.progress}%
                      </span>
                    </div>
                    <Progress value={target.progress} className="h-2" />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {target.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full"
                    onClick={() => window.open(target.link, "_blank")}
                    disabled={target.status !== "Active"}
                  >
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No targets found
            </h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
