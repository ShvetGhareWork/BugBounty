"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Bug } from "lucide-react";

// Sidebar sections
const sections = [
  { id: "overview", label: "Program Overview" },
  { id: "scope", label: "Scope" },
  { id: "rules", label: "Rules of Engagement" },
  { id: "disclosure", label: "Vulnerability Disclosure Policy" },
  { id: "rewards", label: "Reward Structure" },
  { id: "reporting", label: "Reporting Guidelines" },
  { id: "safeharbor", label: "Legal Safe Harbor" },
  { id: "contact", label: "Contact & Support" },
];

export default function BugBountyPage() {
  const [scroll, setScroll] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScroll((currentScroll / totalHeight) * 100);

      const sectionPositions = sections.map((s) => {
        const el = document.getElementById(s.id);
        return {
          id: s.id,
          top: el ? el.getBoundingClientRect().top : Infinity,
        };
      });

      const visibleSection = sectionPositions
        .filter((s) => s.top <= 100) // adjust offset for sensitivity
        .sort((a, b) => b.top - a.top)[0];

      if (visibleSection && visibleSection.id !== activeSection) {
        setActiveSection(visibleSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const Section = ({ id, title, children }: any) => (
    <section id={id} className="mb-16 scroll-mt-24">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="text-gray-800 leading-relaxed">{children}</div>
    </section>
  );

  return (
    <>
      <Header />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-200 z-50">
        <div
          className="h-full bg-blue-600 transition-all duration-200"
          style={{ width: `${scroll}%` }}
        />
        <div className="fixed top-1 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-600 bg-white px-2 py-0.5 rounded shadow-sm">
          {Math.round(scroll)}%
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block sticky top-16 w-64 p-4 border-r bg-white h-[calc(100vh-4rem)] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Sections</h2>
          <nav>
            {sections.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className={cn(
                  "block py-2 px-3 rounded-md transition-all duration-300 ease-in-out",
                  activeSection === s.id
                    ? "bg-blue-600 text-white font-semibold shadow-sm"
                    : "text-gray-700 hover:bg-blue-100"
                )}
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="lg:ml-2 max-w-3xl mx-auto px-4 py-14">
          <div className="flex items-center gap-3 mb-4">
            <Bug className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Bug Bounty Program Documentation{" "}
            </h1>
          </div>

          <Section id="overview" title="Program Overview">
            <p>
              Our Bug Bounty Program is an open initiative designed to
              strengthen the security and integrity of our digital services. We
              extend an open invitation to ethical security researchers,
              penetration testers, and cybersecurity enthusiasts worldwide to
              responsibly probe our applications and services for potential
              vulnerabilities. Through this initiative, we aim to foster a
              collaborative relationship with the global security community and
              continuously enhance the safety of our infrastructure.
            </p>

            <p className="mt-4">
              The program provides a transparent and rewarding platform where
              researchers can safely test and responsibly disclose security
              flaws they identify in our systems. We highly value the
              contributions of those who take the time to help us secure our
              platform, and we believe that by working together, we can create a
              more resilient, trustworthy environment for our users and
              partners.
            </p>

            <p className="mt-4">
              Our scope includes a wide range of assets: public-facing websites,
              mobile applications, cloud-hosted services, and backend APIs. We
              carefully define these assets to ensure researchers have clear,
              actionable targets while respecting operational safety and user
              privacy. In-scope assets may change as we expand our services, and
              the program dashboard will always reflect the latest updates.
            </p>

            <p className="mt-4">
              Participants in the program are expected to adhere to strict rules
              of engagement to ensure the safety and integrity of our systems
              and users. This includes avoiding actions that could cause
              disruption or harm, such as denial of service attacks, social
              engineering, or accessing sensitive user data. We also encourage
              researchers to halt any testing immediately if they encounter
              personal data and report it as soon as possible.
            </p>

            <p className="mt-4">
              Valid vulnerability reports will be rewarded based on a
              severity-based tier system aligned with industry standards like
              CVSS v3.1. The reward structure ranges from recognition on our
              public hall of fame to monetary rewards, depending on the impact
              and criticality of the reported issue. The aim is to recognize
              meaningful contributions while ensuring fair compensation for
              effort and expertise.
            </p>

            <p className="mt-4">
              Beyond financial rewards, top contributors may receive exclusive
              invitations to participate in private bounty programs,
              early-access beta testing, and cybersecurity workshops hosted by
              our team. We aim to cultivate an engaged, knowledgeable, and
              diverse security community that grows alongside our platform.
            </p>

            <p className="mt-4">
              Our security team is dedicated to triaging and addressing valid
              reports promptly. Every submission is reviewed and verified, with
              researchers receiving timely updates throughout the lifecycle of
              their report. We believe in fostering transparent communication
              and trust within the security community, and our disclosure
              timelines reflect a balance between protecting our users and
              acknowledging the contributions of researchers.
            </p>

            <p className="mt-4">
              We are excited to work with you in creating a safer, more secure
              digital experience for everyone. Whether you’re a seasoned
              professional or an aspiring security researcher eager to make your
              mark, we invite you to participate and help shape the security
              future of our platform.
            </p>
          </Section>

          <Section id="scope" title="Scope (In-Scope and Out-of-Scope Assets)">
            <p>
              To maintain clarity and operational safety, we provide a
              comprehensive and frequently updated list of assets that are
              considered in-scope for testing. Researchers are expected to focus
              their security assessments exclusively on these designated assets.
              Any assets not explicitly mentioned here should be considered
              out-of-scope unless otherwise stated.
            </p>

            <p className="mt-4 font-semibold">In-Scope Assets:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>
                <strong>Web Applications:</strong> All publicly accessible
                websites and web portals hosted under our official domains
                (e.g., <code>example.com</code>,<code>*.example.com</code>).
                This includes:
                <ul className="list-disc ml-6 mt-2">
                  <li>
                    User-facing websites (marketing pages, login portals,
                    dashboards)
                  </li>
                  <li>
                    Partner portals and internal-facing web interfaces (if
                    listed explicitly)
                  </li>
                  <li>
                    Administrative panels accessible via approved test accounts
                  </li>
                </ul>
              </li>

              <li className="mt-2">
                <strong>Mobile Applications:</strong> Officially published
                mobile apps available on the Apple App Store and Google Play
                Store under our company account. Researchers must use test
                accounts or anonymized profiles for testing.
              </li>

              <li className="mt-2">
                <strong>Public APIs:</strong> Documented or publicly accessible
                API endpoints under our main domain or subdomains. This
                includes:
                <ul className="list-disc ml-6 mt-2">
                  <li>
                    RESTful and GraphQL APIs exposed to external developers and
                    users
                  </li>
                  <li>
                    Authentication, session management, and payment processing
                    APIs
                  </li>
                  <li>
                    API documentation interfaces (e.g., Swagger, Postman
                    collections)
                  </li>
                </ul>
              </li>

              <li className="mt-2">
                <strong>Cloud Services & Infrastructure:</strong> As detailed in
                the program dashboard. This may include:
                <ul className="list-disc ml-6 mt-2">
                  <li>Publicly exposed cloud-hosted services</li>
                  <li>
                    DNS records and CDN endpoints associated with our domains
                  </li>
                  <li>
                    Third-party integrations explicitly listed as in-scope
                  </li>
                </ul>
              </li>

              <li className="mt-2">
                <strong>Beta / Staging Environments:</strong> Specific test
                environments that have been made publicly available for security
                testing purposes, as documented on our program dashboard.
              </li>
            </ul>

            <p className="mt-4 font-semibold">Out-of-Scope Assets:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Third-party services not explicitly listed as in-scope</li>
              <li>Physical infrastructure or office networks</li>
              <li>
                Internal corporate systems, unless specifically authorized
              </li>
              <li>
                Employee or contractor personal devices and email accounts
              </li>
              <li>
                Denial of Service (DoS/DDoS) and resource exhaustion attacks
              </li>
              <li>
                Social engineering attempts targeting our staff, customers, or
                vendors
              </li>
            </ul>

            <p className="mt-4">
              Testing any asset not explicitly included in the in-scope list
              without prior written approval is strictly prohibited and may
              result in legal action. All in-scope assets, targets, and their
              current operational status can be found on the program dashboard,
              which is updated regularly.
            </p>
          </Section>

          <Section id="rules" title="Rules of Engagement">
            <p>
              To ensure the safety of our systems, protect user data, and
              promote responsible disclosure, all participating researchers must
              adhere to the following Rules of Engagement. These rules establish
              clear expectations and boundaries for testing activities conducted
              under this program.
            </p>

            <p className="mt-4 font-semibold">Researchers Must:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>
                <strong>Test Only Authorized, In-Scope Assets:</strong> Conduct
                security assessments solely against the systems, applications,
                and APIs explicitly listed as in-scope in this document or
                program dashboard. Do not test third-party services, employee
                systems, or infrastructure not listed.
              </li>

              <li className="mt-2">
                <strong>Avoid Destructive Testing:</strong> Do not perform any
                actions that may harm the availability, integrity, or
                confidentiality of systems or data. This includes, but is not
                limited to:
                <ul className="list-disc ml-6 mt-2">
                  <li>
                    Denial of Service (DoS/DDoS) attacks or resource exhaustion
                    tests
                  </li>
                  <li>
                    Automated brute-force attacks on login, password reset, or
                    API endpoints
                  </li>
                  <li>
                    Data deletion, data modification, or database dropping
                    attempts
                  </li>
                </ul>
              </li>

              <li className="mt-2">
                <strong>Avoid Social Engineering:</strong> Do not attempt to
                gain unauthorized access through social engineering, phishing
                emails, phone calls, or physical visits targeting our staff,
                customers, or vendors.
              </li>

              <li className="mt-2">
                <strong>Cease Testing if Sensitive Data is Encountered:</strong>{" "}
                Immediately stop any testing activity if sensitive, personally
                identifiable, financial, or protected health information is
                unintentionally accessed. Securely delete any local copies and
                promptly report the incident.
              </li>

              <li className="mt-2">
                <strong>Limit Automated Scans:</strong> Avoid using automated
                scanning tools without explicit permission, as they can affect
                service availability and distort operational metrics. If
                necessary, coordinate timing and scope with the security team.
              </li>

              <li className="mt-2">
                <strong>Use Test Accounts Where Possible:</strong> Perform all
                testing activities using non-production or approved test
                accounts provided by our security team to minimize operational
                impact.
              </li>

              <li className="mt-2">
                <strong>
                  Report Vulnerabilities Promptly and Confidentially:
                </strong>{" "}
                Submit findings immediately through the designated reporting
                process, maintaining strict confidentiality until coordinated
                public disclosure is approved.
              </li>

              <li className="mt-2">
                <strong>Do Not Access or Modify Other Users' Data:</strong>{" "}
                Under no circumstances should researchers intentionally access,
                modify, or delete data belonging to other users, customers, or
                third parties.
              </li>

              <li className="mt-2">
                <strong>Respect System Availability:</strong> Ensure your
                activities do not degrade the availability or stability of
                production services for legitimate users.
              </li>
            </ul>

            <p className="mt-4">
              Failure to comply with these rules may result in disqualification
              from the program, forfeiture of rewards, revocation of testing
              privileges, and possible legal action. By participating in this
              program, researchers agree to act in good faith and with
              integrity.
            </p>
          </Section>

          <Section id="disclosure" title="Vulnerability Disclosure Policy">
            <p>
              We highly value the contributions of independent security
              researchers and encourage the responsible disclosure of
              vulnerabilities. Our goal is to resolve legitimate security issues
              quickly to keep our users and data safe. This policy outlines our
              expectations and commitments to researchers who choose to report
              vulnerabilities in good faith.
            </p>

            <p className="mt-4 font-semibold">Disclosure Expectations:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>
                Vulnerabilities should be reported promptly upon discovery
                through our designated reporting platform or via email at
                <a
                  href="mailto:shvetgharework@example.com"
                  className="text-blue-600"
                >
                  {" "}
                  shvetgharework@example.com
                </a>
                .
              </li>

              <li className="mt-2">
                Do not publicly disclose, discuss, or share vulnerability
                details until a fix has been implemented and you have received
                explicit written permission from our security team.
              </li>

              <li className="mt-2">
                We request a reasonable period of <strong>90 days</strong> from
                the date of submission to investigate, validate, and resolve
                reported issues before any public disclosure.
              </li>

              <li className="mt-2">
                Coordinate disclosure timelines and possible exceptions with our
                security team when necessary — we are open to adjusting the
                timeline for particularly complex or critical vulnerabilities.
              </li>
            </ul>

            <p className="mt-4 font-semibold">
              Our Commitments to Researchers:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li>
                We will acknowledge receipt of valid reports within{" "}
                <strong>5 business days</strong>.
              </li>

              <li className="mt-2">
                Provide regular updates on report status and remediation
                progress, including estimated timelines for resolution.
              </li>

              <li className="mt-2">
                Offer public recognition in our <strong>Hall of Fame</strong> or
                contributor page for impactful discoveries, with the
                researcher’s consent.
              </li>

              <li className="mt-2">
                Provide financial rewards (if applicable) according to our
                published
                <strong>Reward Structure</strong> based on the severity of the
                reported vulnerability.
              </li>

              <li className="mt-2">
                Grant legal Safe Harbor protections, as outlined in our{" "}
                <strong>Legal Safe Harbor</strong> policy, to researchers acting
                in good faith and within the program’s rules.
              </li>
            </ul>

            <p className="mt-4">
              We believe in a collaborative security approach and encourage
              responsible researchers to help us improve the security and
              resilience of our systems.
            </p>
          </Section>

          <Section id="rewards" title="Reward Structure (Severity-Based Tiers)">
            <p>
              Rewards are assessed based on the severity of the reported
              vulnerability, following the <strong>CVSS v3.1</strong> (Common
              Vulnerability Scoring System) framework. The final reward decision
              may also consider factors like business impact, exploitability,
              and the quality of the report.
            </p>

            <p className="mt-4 font-semibold">
              Severity Tiers & Reward Ranges:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li>
                <strong>Low (0.1–3.9)</strong>:{" "}
                <span className="text-green-700">₹1,000 – ₹3,000</span>
                <ul className="list-disc ml-6 mt-1 text-gray-700">
                  <li>
                    Information disclosure without direct impact (e.g., server
                    banners, internal IP leakage)
                  </li>
                  <li>Missing security headers</li>
                  <li>Clickjacking on non-sensitive pages</li>
                </ul>
              </li>

              <li className="mt-4">
                <strong>Medium (4.0–6.9)</strong>:{" "}
                <span className="text-yellow-700">₹3,000 – ₹8,000</span>
                <ul className="list-disc ml-6 mt-1 text-gray-700">
                  <li>Authenticated XSS (Cross-Site Scripting)</li>
                  <li>Open redirects on production domains</li>
                  <li>
                    Insecure direct object references (IDOR) on low-impact
                    resources
                  </li>
                  <li>Privilege escalation without critical access</li>
                </ul>
              </li>

              <li className="mt-4">
                <strong>High (7.0–8.9)</strong>:{" "}
                <span className="text-orange-700">₹8,000 – ₹20,000</span>
                <ul className="list-disc ml-6 mt-1 text-gray-700">
                  <li>Unauthenticated XSS affecting sensitive pages</li>
                  <li>SQL Injection (with proof of data retrieval)</li>
                  <li>Critical misconfigurations exposing internal services</li>
                  <li>IDOR leading to unauthorized access of sensitive data</li>
                </ul>
              </li>

              <li className="mt-4">
                <strong>Critical (9.0–10.0)</strong>:{" "}
                <span className="text-red-700">₹20,000 – ₹50,000+</span>
                <ul className="list-disc ml-6 mt-1 text-gray-700">
                  <li>Remote Code Execution (RCE)</li>
                  <li>Database dump or full account takeover</li>
                  <li>Authentication bypass on critical systems</li>
                  <li>Massive data leak impacting multiple users</li>
                  <li>Severe business-impacting flaws</li>
                </ul>
              </li>
            </ul>

            <p className="mt-4">
              All reward amounts are determined at the discretion of our
              security team based on the impact, severity, quality of the
              report, and reproducibility of the issue. Exceptional submissions
              may be eligible for higher payouts.
            </p>
          </Section>

          <Section id="reporting" title="Reporting Guidelines">
            <p>
              To help us triage and resolve vulnerabilities efficiently, please
              ensure your report is thorough, clear, and structured. A
              well-written report increases the likelihood of eligibility for
              higher rewards.
            </p>

            <p className="mt-4 font-semibold">
              Your report should include the following:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-800">
              <li>
                <strong>Clear Title & Summary:</strong> A concise, descriptive
                title summarizing the issue (e.g., "Stored XSS in User Profile
                Bio Field").
              </li>

              <li className="mt-2">
                <strong>Description & Impact:</strong> A detailed explanation of
                the vulnerability, its security implications, and potential
                business or user impact.
              </li>

              <li className="mt-2">
                <strong>Vulnerability Location:</strong> Precise URLs, API
                endpoints, or affected components (e.g.,{" "}
                <code>/user/profile</code>, mobile app version 2.3.1).
              </li>

              <li className="mt-2">
                <strong>Steps to Reproduce:</strong> A clear, step-by-step guide
                demonstrating how to replicate the issue. Screenshots, logs,
                videos, or code snippets are encouraged.
              </li>

              <li className="mt-2">
                <strong>Proof of Concept (PoC):</strong> If applicable, provide
                a working exploit or example payload demonstrating the
                vulnerability’s existence and impact.
              </li>

              <li className="mt-2">
                <strong>Affected Systems or Services:</strong> Specify which
                assets are impacted (e.g., <code>api.example.com</code>, iOS app
                v2.1).
              </li>

              <li className="mt-2">
                <strong>Optional CVSS Severity Assessment:</strong> If possible,
                provide your own estimated severity rating based on CVSS v3.1
                guidelines.
              </li>

              <li className="mt-2">
                <strong>Contact Information:</strong> Your preferred method of
                contact (email, platform username) in case our security team
                needs clarification.
              </li>

              <li className="mt-2">
                <strong>Any Additional Context:</strong> Such as mitigating
                factors, previous related reports, or public references (if
                relevant).
              </li>
            </ul>

            <p className="mt-4">
              Reports missing critical information or lacking clarity may result
              in delays or lower reward eligibility. High-quality, reproducible,
              and responsible reports are highly valued.
            </p>
          </Section>

          <Section id="safeharbor" title="Legal Safe Harbor">
            <p>
              We value the contributions of the security research community in
              helping us maintain a secure ecosystem. To encourage responsible
              disclosure and protect researchers acting in good faith, our
              program provides a comprehensive legal safe harbor policy.
            </p>

            <p className="mt-4">
              <strong>Scope of Authorization:</strong> Security research
              activities performed within the scope of this program are
              considered authorized. This includes:
            </p>

            <ul className="list-disc ml-6 mt-2 text-gray-800">
              <li>
                Testing and identifying vulnerabilities on in-scope assets
                listed in the program scope section.
              </li>
              <li>
                Accessing or interacting with test data and dummy accounts
                specifically provisioned for testing purposes.
              </li>
              <li>
                Non-destructive and non-disruptive methods of testing that do
                not degrade service availability or access to legitimate users.
              </li>
            </ul>

            <p className="mt-4">
              <strong>Good-Faith Commitment:</strong> If your security research
              activities comply with our program's scope, rules of engagement,
              and reporting guidelines, we commit to:
            </p>

            <ul className="list-disc ml-6 mt-2 text-gray-800">
              <li>Not pursue civil action against you.</li>
              <li>
                Not refer the matter to law enforcement for prosecution,
                provided there is no evidence of malicious intent.
              </li>
              <li>
                Work with you to clarify any accidental rule breaches and
                resolve the matter collaboratively.
              </li>
            </ul>

            <p className="mt-4">
              <strong>Exclusions:</strong> The safe harbor does not apply to:
            </p>

            <ul className="list-disc ml-6 mt-2 text-gray-800">
              <li>
                Activities targeting out-of-scope assets or violating other
                organizations' legal rights.
              </li>
              <li>
                Use of destructive testing, denial of service (DoS), or
                techniques causing significant data loss, service disruption, or
                harm to users.
              </li>
              <li>
                Any actions performed outside of this program’s published rules
                or without proper authorization.
              </li>
            </ul>

            <p className="mt-4">
              We strongly encourage security researchers to include full,
              timely, and responsible disclosures. Our goal is to work together
              to improve security for our users and services while ensuring you
              remain protected when acting in good faith.
            </p>
          </Section>

          <Section id="contact" title="Contact & Support Information">
            <p>
              We value open, transparent, and collaborative communication with
              the security community. If you discover a vulnerability within our
              in-scope assets, please submit your findings through one of the
              official reporting channels listed below.
            </p>

            <p className="mt-4">
              <strong>Vulnerability Submissions:</strong>
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-800">
              <li>
                Use our official{" "}
                <Link href="/report" className="text-blue-600 underline">
                  Bug Bounty Submission Platform
                </Link>{" "}
                to submit reports securely.
              </li>
              <li>
                Alternatively, email your detailed report to
                <a
                  href="mailto:shvetgharework@example.com"
                  className="text-blue-600 underline ml-1"
                >
                  shvetgharework@example.com
                </a>{" "}
                with the subject line: <code>[Bug Bounty Submission]</code>.
              </li>
            </ul>

            <p className="mt-4">
              <strong>Response Commitment:</strong> Our security team
              acknowledges all valid submissions within{" "}
              <strong>2 business days</strong> and aims to provide regular
              updates on the status of your report, including:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-800">
              <li>Initial triage confirmation</li>
              <li>Expected remediation timeline (if applicable)</li>
              <li>Reward eligibility assessment</li>
              <li>Final resolution summary and reward issuance (if earned)</li>
            </ul>

            <p className="mt-4">
              <strong>General Security Inquiries:</strong> For policy
              clarifications, questions about scope, safe harbor protections, or
              collaboration proposals, reach out via:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-800">
              <li>
                Email:{" "}
                <a
                  href="mailto:shvetgharework@example.com"
                  className="text-blue-600 underline"
                >
                  shvetgharework@example.com
                </a>
              </li>
              <li>
                Visit our{" "}
                <Link href="/security" className="text-blue-600 underline">
                  Security Advisory Page
                </Link>{" "}
                for program announcements and updates.
              </li>
            </ul>

            <p className="mt-4">
              We deeply appreciate the time and effort of all ethical security
              researchers contributing to a safer digital ecosystem.
            </p>
          </Section>
        </main>
      </div>

      <Footer />
    </>
  );
}
