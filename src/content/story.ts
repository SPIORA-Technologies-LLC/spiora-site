import { publication } from "./claims";

export const story = {
  anchors: {
    top: "/#top",
    workflow: "/#workflow",
    modules: "/#modules",
    case: "/#case",
    security: "/#security",
    implementation: "/#implementation",
    team: "/#team",
    contacts: "/#contacts",
    demo: "/#demo",
  },
  nav: {
    product: "Product",
    howItWorks: "How it works",
    security: "Security",
    implementation: "Implementation",
    discuss: "Discuss your workflow",
  },
  hero: {
    eyebrow: "One platform for immigration and consulting teams",
    title: "Every client journey. Every team workflow. One SPIORA system.",
    lead: "Manage clients, cases, documents, tasks, communication, and payments in one workspace. Give clients a portal with their case status, documents, and next steps.",
    primary: "See SPIORA in action",
    secondary: "Discuss your workflow",
    posterCaption: "Illustrative workflow using synthetic data.",
  },
  explain: {
    title: "One connected system for client work.",
    lead: "SPIORA connects the client record with the work around it: tasks, documents, communication, calendars, payments, knowledge, analytics, AI, and a client portal.",
    audiences: [
      {
        title: "For leaders",
        body: "A shared view of clients, cases, deadlines, workload, and finances.",
      },
      {
        title: "For teams",
        body: "One place to work across conversations, files, tasks, and calendars.",
      },
      {
        title: "For clients",
        body: "A clear view of what is done, what is needed, and what comes next.",
      },
    ],
  },
  beforeAfter: {
    title: "From scattered tools to one connected workflow.",
    beforeLabel: "Before",
    before:
      "Client records in spreadsheets. Documents in shared drives. Conversations in messengers. Meetings in video apps. Tasks in separate boards. Updates across email and calendars.",
    afterLabel: "With SPIORA",
    after:
      "Client records, documents, tasks, communication, meetings, payments, and knowledge share one workspace.",
    workspace: ["Client records", "Documents", "Tasks", "Communication", "Meetings", "Payments", "Knowledge"],
    tools: [
      "Spreadsheets",
      "Messengers",
      "Video meetings",
      "File storage",
      "Standalone AI",
      "Task boards",
      "Calendars",
      "Email",
      "CRM",
    ],
    toolsNote: "An example of a scattered stack, not a list of SPIORA integrations.",
  },
  spaces: {
    title: "Two workspaces. One connected client journey.",
    teamTitle: "Team workspace",
    team: "Manage client records, tasks, documents, communication, meetings, and finances.",
    clientTitle: "Client portal",
    client: "Complete a questionnaire, upload documents, and see case progress and next steps.",
    caption: "Internal work and client-facing information have different visibility.",
    teamView: "Team view",
    clientView: "Client view",
  },
  modules: {
    title: "Nine modules. One shared context.",
    illustrative: "Illustrative interface",
    items: [
      {
        id: "crm",
        title: "CRM",
        body: "Keep contacts, documents, statuses, and interaction history in one client record.",
      },
      {
        id: "tasks",
        title: "Tasks",
        body: "Give each task an owner, a deadline, a status, comments, and files.",
      },
      {
        id: "chat",
        title: "Team chat",
        body: "Keep work discussions and shared files inside the platform.",
      },
      {
        id: "calendar",
        title: "Calendar and meetings",
        body: "Bring personal and team events, reminders, and meetings into one view.",
      },
      {
        id: "finance",
        title: "Finance",
        body: "Keep agreements, payments, and balances connected to the client.",
      },
      {
        id: "analytics",
        title: "Analytics",
        body: "Review cases, deadlines, and team workload in one overview.",
      },
      {
        id: "knowledge",
        title: "Knowledge base",
        body: "Find procedures, templates, and instructions where the team works.",
      },
      {
        id: "ai",
        title: "AI Workspace",
        body: "Draft emails, translate text, and find answers from the company knowledge base.",
      },
      {
        id: "roles",
        title: "Roles and access",
        body: "Separate team and client areas, with employee access assigned by role.",
      },
    ],
  },
  ai: {
    title: "AI support for everyday team work.",
    lead: "Draft emails, translate text, and find answers from your company knowledge base in AI Workspace.",
    sampleLabel: "Sample AI draft — review before use.",
    sampleBody:
      "Hello Alex Morgan. This sample draft is about case CASE-024, a residence application. It is an example for review, not a message that has been sent.",
  },
  approach: {
    title: "Connect the work around every client.",
    lead: "A client record is the starting point. SPIORA brings the related work into the same platform: tasks, documents, communication, meetings, finances, and the client portal.",
    modes: [
      {
        title: "Client record",
        body: "Contacts, documents, and status start from one client record.",
      },
      {
        title: "Separate tools",
        body: "The work around that record can stay split across different tools.",
      },
      {
        title: "Connected workflow",
        body: "Tasks, documents, communication, meetings, finances, and the client portal share one platform.",
      },
    ],
  },
  ownershipFallback: {
    title: "Discuss the setup your team needs.",
    body: "Walk us through your client workflow. We will discuss the platform scope, implementation, and commercial terms with you.",
    cta: "Discuss your workflow",
  },
  security: {
    title: "Separate spaces. Role-based access.",
    lead: "Employee access is assigned by role. The team workspace and client portal are separate areas.",
    points: [
      {
        title: "Team permissions",
        body: "Each employee sees the clients, tasks, and documents their role allows.",
      },
      {
        title: "A separate client portal",
        body: "A client has a portal with their own processes and documents.",
      },
    ],
    cta: "Discuss security requirements",
  },
  faq: [
    {
      question: "Is SPIORA a CRM?",
      answer:
        "CRM is part of SPIORA. The platform also brings together tasks, documents, communication, calendars, finances, analytics, knowledge, AI, and a client portal.",
    },
    {
      question: "What can clients do in the portal?",
      answer:
        "Clients can complete a questionnaire, upload documents, and see their case status and next steps.",
    },
    {
      question: "What can employees access?",
      answer: "Employees have access to the areas and information allowed by their role.",
    },
    {
      question: "Can I explore the workflow before contacting you?",
      answer:
        "Yes. The interactive example on this page shows a sample client journey using synthetic data.",
    },
    {
      question: "How long does implementation take?",
      answer:
        "The timeline depends on the agreed scope. Discuss your workflow with the SPIORA team to clarify the setup and launch plan.",
    },
  ],
  finalCta: {
    title: "explore workflow could look",
    lead: "Show us how one client case works today.",
    primary: "Discuss my workflow",
    secondary: "Explore the interactive demo",
    success: "Thank you. Your request has been received.",
    error: "We couldn’t send your request. Please try again or email us.",
  },
  footer: ["Product", "How it works", "Security", "Implementation", "Team", "Contacts", "Privacy policy"],
} as const;

const implementationFallback = {
  title: "What we discuss before implementation",
  items: ["Workflow", "Modules", "Roles", "Data", "Timeline"],
} as const;

const confirmedImplementation = {
  title: "Start with your real client workflow.",
  note: "The implementation scope and timeline are agreed after reviewing your requirements.",
  steps: [
    "Understand your current workflow.",
    "Agree on modules, roles, and scope.",
    "Configure the platform.",
    "Prepare data and test the workflow.",
    "Review a working version.",
    "Validate the setup together.",
    "Launch with the team.",
  ],
} as const;

export function implementationCopy() {
  if (!publication.confirmedImplementation) return implementationFallback;
  return confirmedImplementation;
}
