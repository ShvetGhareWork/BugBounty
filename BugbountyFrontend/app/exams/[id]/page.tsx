"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Clock,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Flag,
  AlertTriangle,
  CheckCircle,
  Trophy,
  RotateCcw,
  Home,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ExamDetailPage() {
  const params = useParams();
  const examId = params.id;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [timeRemaining, setTimeRemaining] = useState(2700); // 45 minutes in seconds
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(
    new Set()
  );

  // Mock exam data (this would come from your API)
  const examData = {
    id: 1,
    title: "Web Security Fundamentals",
    description:
      "Basic concepts of web application security including OWASP Top 10",
    difficulty: "Beginner",
    duration: 45,
    totalQuestions: 30,
    passingScore: 70,
    certification: "Web Security Foundation",
  };

  const questions = [
    {
      id: 1,
      type: "single",
      question: "What does XSS stand for in web security?",
      options: [
        "Cross-Site Scripting",
        "Cross-System Security",
        "Extended Security System",
        "XML Security Standard",
      ],
      correctAnswer: "Cross-Site Scripting",
      explanation:
        "XSS stands for Cross-Site Scripting, a type of security vulnerability typically found in web applications.",
    },
    {
      id: 2,
      type: "multiple",
      question:
        "Which of the following are part of the OWASP Top 10? (Select all that apply)",
      options: [
        "SQL Injection",
        "Cross-Site Scripting (XSS)",
        "Buffer Overflow",
        "Broken Authentication",
        "Security Misconfiguration",
      ],
      correctAnswers: [
        "SQL Injection",
        "Cross-Site Scripting (XSS)",
        "Broken Authentication",
        "Security Misconfiguration",
      ],
      explanation:
        "Buffer Overflow is not part of the current OWASP Top 10, while the others are key vulnerabilities listed.",
    },
    {
      id: 3,
      type: "single",
      question: "What is the primary purpose of input validation?",
      options: [
        "To improve application performance",
        "To prevent malicious data from entering the application",
        "To enhance user experience",
        "To reduce server load",
      ],
      correctAnswer: "To prevent malicious data from entering the application",
      explanation:
        "Input validation is a security measure designed to ensure that only properly formatted data enters the application.",
    },
    // Add more questions as needed...
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (examStarted && !examCompleted && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setExamCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [examStarted, examCompleted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (
    questionIndex: number,
    answer: string | string[]
  ) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const toggleFlag = (questionIndex: number) => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionIndex)) {
        newSet.delete(questionIndex);
      } else {
        newSet.add(questionIndex);
      }
      return newSet;
    });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      const userAnswer = answers[index];
      if (question.type === "single") {
        if (userAnswer === question.correctAnswer) correct++;
      } else if (question.type === "multiple") {
        const userAnswers = Array.isArray(userAnswer) ? userAnswer : [];
        const correctAnswers = question.correctAnswers || [];
        if (
          userAnswers.length === correctAnswers.length &&
          userAnswers.every((ans) => correctAnswers.includes(ans))
        ) {
          correct++;
        }
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const submitExam = () => {
    setExamCompleted(true);
    setShowResults(true);
  };

  const startExam = () => {
    setExamStarted(true);
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">{examData.title}</CardTitle>
              <CardDescription className="text-lg">
                {examData.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">
                    {examData.totalQuestions}
                  </div>
                  <div className="text-gray-600">Questions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">
                    {examData.duration}
                  </div>
                  <div className="text-gray-600">Minutes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">
                    {examData.passingScore}%
                  </div>
                  <div className="text-gray-600">Passing Score</div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-2">
                      Exam Instructions
                    </h3>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>
                        • You have {examData.duration} minutes to complete the
                        exam
                      </li>
                      <li>
                        • You can flag questions for review and return to them
                        later
                      </li>
                      <li>• Once submitted, you cannot change your answers</li>
                      <li>
                        • You need {examData.passingScore}% to pass and earn the
                        certification
                      </li>
                      <li>• Make sure you have a stable internet connection</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Link href="/exams">
                  <Button variant="outline">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back to Exams
                  </Button>
                </Link>
                <Button
                  onClick={startExam}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Start Exam
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const passed = score >= examData.passingScore;

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardHeader className="text-center">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  passed ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {passed ? (
                  <Trophy className="w-10 h-10 text-green-600" />
                ) : (
                  <RotateCcw className="w-10 h-10 text-red-600" />
                )}
              </div>
              <CardTitle className="text-3xl mb-2">
                {passed ? "Congratulations!" : "Keep Trying!"}
              </CardTitle>
              <CardDescription className="text-lg">
                {passed
                  ? `You've successfully passed the ${examData.title} exam!`
                  : `You scored ${score}%. You need ${examData.passingScore}% to pass.`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div
                  className="text-6xl font-bold mb-2"
                  style={{ color: passed ? "#10b981" : "#ef4444" }}
                >
                  {score}%
                </div>
                <div className="text-gray-600">Your Score</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Object.keys(answers).length}/{questions.length}
                  </div>
                  <div className="text-gray-600">Questions Answered</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round((score / 100) * questions.length)}
                  </div>
                  <div className="text-gray-600">Correct Answers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {questions.length -
                      Math.round((score / 100) * questions.length)}
                  </div>
                  <div className="text-gray-600">Incorrect Answers</div>
                </div>
              </div>

              {passed && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800 mb-1">
                    Certification Earned!
                  </h3>
                  <p className="text-green-700">{examData.certification}</p>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <Link href="/exams">
                  <Button variant="outline">
                    <Home className="w-4 h-4 mr-2" />
                    Back to Exams
                  </Button>
                </Link>
                {!passed && (
                  <Button onClick={() => window.location.reload()}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake Exam
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Exam Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {examData.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span
                    className={
                      timeRemaining < 300 ? "text-red-600 font-medium" : ""
                    }
                  >
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleFlag(currentQuestion)}
                className={
                  flaggedQuestions.has(currentQuestion)
                    ? "bg-yellow-100 border-yellow-300"
                    : ""
                }
              >
                <Flag className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={submitExam}>
                Submit Exam
              </Button>
            </div>
          </div>
          <Progress value={progress} className="mt-3" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-xl mb-4">
                  {currentQ.question}
                </CardTitle>
                {currentQ.type === "multiple" && (
                  <Badge variant="secondary" className="mb-4">
                    Multiple Choice - Select all that apply
                  </Badge>
                )}
              </div>
              {flaggedQuestions.has(currentQuestion) && (
                <Badge className="bg-yellow-100 text-yellow-800">
                  <Flag className="w-3 h-3 mr-1" />
                  Flagged
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentQ.type === "single" ? (
                <RadioGroup
                  value={(answers[currentQuestion] as string) || ""}
                  onValueChange={(value) =>
                    handleAnswerChange(currentQuestion, value)
                  }
                >
                  {currentQ.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50"
                    >
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-2">
                  {currentQ.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50"
                    >
                      <Checkbox
                        id={`option-${index}`}
                        checked={(
                          (answers[currentQuestion] as string[]) || []
                        ).includes(option)}
                        onCheckedChange={(checked) => {
                          const currentAnswers =
                            (answers[currentQuestion] as string[]) || [];
                          if (checked) {
                            handleAnswerChange(currentQuestion, [
                              ...currentAnswers,
                              option,
                            ]);
                          } else {
                            handleAnswerChange(
                              currentQuestion,
                              currentAnswers.filter((a) => a !== option)
                            );
                          }
                        }}
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentQuestion(Math.max(0, currentQuestion - 1))
                }
                disabled={currentQuestion === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="flex gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                      index === currentQuestion
                        ? "bg-blue-600 text-white"
                        : answers[index]
                        ? "bg-green-100 text-green-800"
                        : flaggedQuestions.has(index)
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <Button
                onClick={() => {
                  if (currentQuestion === questions.length - 1) {
                    submitExam();
                  } else {
                    setCurrentQuestion(
                      Math.min(questions.length - 1, currentQuestion + 1)
                    );
                  }
                }}
              >
                {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
                {currentQuestion !== questions.length - 1 && (
                  <ChevronRight className="w-4 h-4 ml-2" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
