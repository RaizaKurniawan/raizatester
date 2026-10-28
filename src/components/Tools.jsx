import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiCypress, SiSelenium, SiJest, SiPostman, SiMocha, SiSwagger, SiApachejmeter, SiK6,
  SiBurpsuite, SiAppium, SiAndroid, SiPostgresql, SiEthereum, SiLinear, SiJira,
  SiNotion, SiQase, SiClaude, SiOpenai, SiNodedotjs, SiGooglechrome, SiPagespeedinsights,
  SiTrello, SiAsana, SiSolidity,
} from "react-icons/si";
import { FaTerminal } from "react-icons/fa";

// level: 3 = daily driver, 2 = regular use, 1 = familiar.
// Tools without an icon in react-icons/si get a monogram instead.
export const tools = [
  { name: "Playwright", mono: "Pw", color: "#2EAD33", category: "Automation", level: 3, where: "300+ spec suite at OCX, API flows at Agate" },
  { name: "Cypress", icon: SiCypress, color: "#1B1E2E", category: "Automation", level: 3, where: "E2E suites for PT KAI at Labtek Indie and at Benih Baik" },
  { name: "Selenium IDE", icon: SiSelenium, color: "#43B02A", category: "Automation", level: 2, where: "Recorded regression flows at Benih Baik" },
  { name: "Jest", icon: SiJest, color: "#C21325", category: "Automation", level: 2, where: "Backend unit and integration specs at OCX" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", category: "Automation", level: 2, where: "Cypress test tooling for PT KAI at Labtek Indie" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37", category: "API", level: 3, where: "API test standards at Agate" },
  { name: "MochaJS", icon: SiMocha, color: "#8D6748", category: "API", level: 2, where: "Automated API suites at Agate" },
  { name: "Swagger", icon: SiSwagger, color: "#4E9A06", category: "API", level: 2, where: "Contract checks against API docs" },
  { name: "Scalar", mono: "Sc", color: "#1A1A1A", category: "API", level: 2, where: "API reference and request testing at Agate" },
  { name: "JMeter", icon: SiApachejmeter, color: "#D22128", category: "Performance", level: 3, where: "Load tests for 10K+ users on DEUS" },
  { name: "k6", icon: SiK6, color: "#7D64FF", category: "Performance", level: 2, where: "Stress tests on REST APIs at Agate" },
  { name: "Locust", mono: "Lo", color: "#3F8F3F", category: "Performance", level: 2, where: "Python load scripts at Agate" },
  { name: "PageSpeed Insights", icon: SiPagespeedinsights, color: "#4285F4", category: "Performance", level: 2, where: "Front-end performance audits" },
  { name: "Burp Suite", icon: SiBurpsuite, color: "#FF6633", category: "Security", level: 2, where: "SQLi and XSS checks, request interception" },
  { name: "Chrome DevTools", icon: SiGooglechrome, color: "#1A73E8", category: "Security", level: 3, where: "Request inspection and basic security checks at Agate" },
  { name: "Appium", icon: SiAppium, color: "#662CB8", category: "Mobile", level: 2, where: "iOS Simulator flows at OCX" },
  { name: "adb + uiautomator", icon: SiAndroid, color: "#34A853", category: "Mobile", level: 2, where: "Android Emulator flows and deep links at OCX" },
  { name: "BrowserStack", mono: "BS", color: "#E66F32", category: "Mobile", level: 2, where: "Cross-device checks at Agate" },
  { name: "LambdaTest", mono: "LT", color: "#0EBAC5", category: "Mobile", level: 2, where: "Cross-browser and device checks at Agate" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", category: "Backend", level: 2, where: "Root-causing SQL bugs at OCX" },
  { name: "Testcontainers", mono: "Tc", color: "#0F766E", category: "Backend", level: 2, where: "70+ DB-backed tests per ticket at OCX" },
  { name: "Web3.js", icon: SiEthereum, color: "#3C3C3D", category: "Web3", level: 2, where: "Deposit, staking and withdrawal tests" },
  { name: "Solidity", icon: SiSolidity, color: "#363636", category: "Web3", level: 1, where: "Reading smart contracts to plan Web3 tests" },
  { name: "Linear", icon: SiLinear, color: "#5E6AD2", category: "Workflow", level: 3, where: "Bug triage with priority and env labels" },
  { name: "Jira", icon: SiJira, color: "#0052CC", category: "Workflow", level: 2, where: "Sprint and bug tracking" },
  { name: "Notion", icon: SiNotion, color: "#37352F", category: "Workflow", level: 3, where: "Bug tracking and test reports at Agate" },
  { name: "Qase.io", icon: SiQase, color: "#1A6DD8", category: "Workflow", level: 2, where: "Test case management" },
  { name: "Trello", icon: SiTrello, color: "#0052CC", category: "Workflow", level: 2, where: "Test plans and bug reports at Pasific Internusa" },
  { name: "Asana", icon: SiAsana, color: "#F06A6A", category: "Workflow", level: 2, where: "QC checklists and bug tracking at Integralindo" },
  { name: "Claude Code", icon: SiClaude, color: "#D97757", category: "Agent-driven", level: 3, where: "Runs the staged QA pipeline at OCX" },
  { name: "Codex", icon: SiOpenai, color: "#10A37F", category: "Agent-driven", level: 3, where: "Second agent in the OCX pipeline, file-based handoffs" },
  { name: "OpenCode", icon: FaTerminal, color: "#4B5563", category: "Agent-driven", level: 2, where: "Open-source terminal agent for QA tasks" },
];

const levelNames = { 1: "familiar", 2: "regular use", 3: "daily driver" };
const categories = ["All", ...new Set(tools.map((t) => t.category))];

const ToolLogo = ({ tool }) => {
  const Icon = tool.icon;
  return (
    <span className="tool-logo" style={{ background: tool.color }} aria-hidden="true">
      {Icon ? <Icon size={20} /> : tool.mono}
    </span>
  );
};

const Tools = () => {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? tools : tools.filter((t) => t.category === active);

  return (
    <section id="tools" className="tools-section">
      <span className="tools-eyebrow">My toolbox</span>
      <h2 className="tools-title">Tools I Use</h2>
      <p className="tools-subtitle">
        Grouped by the kind of testing they cover. Each card says where I used the tool and how deeply.
      </p>

      <div className="tools-filters" role="group" aria-label="Filter tools by category">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className="tools-chip"
            aria-pressed={active === cat}
            onClick={() => setActive(cat)}
          >
            {cat}
            <span className="tools-chip-count">
              {cat === "All" ? tools.length : tools.filter((t) => t.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      <motion.div layout className="tools-grid">
        <AnimatePresence mode="popLayout">
          {shown.map((tool) => (
            <motion.article
              key={tool.name}
              layout
              className="tool-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <ToolLogo tool={tool} />
              <h3>{tool.name}</h3>
              <p className="tool-where">{tool.where}</p>
              <div className="tool-meta">
                <span>{tool.category.toLowerCase()} · {levelNames[tool.level]}</span>
                <span className="tool-level" aria-label={levelNames[tool.level]}>
                  {[1, 2, 3].map((i) => (
                    <i key={i} className={i <= tool.level ? "on" : ""} />
                  ))}
                </span>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Tools;
