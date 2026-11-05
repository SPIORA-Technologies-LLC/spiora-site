export const copy = {
  meta: {
    title: "SPIORA — A digital office for immigration and consulting teams",
    description:
      "Run clients, documents, tasks, and communications in one workspace. Clients see their case status and next steps in a personal portal.",
    privacyTitle: "Privacy policy",
    privacyDescription:
      "How the SPIORA marketing site handles a request for a product demo.",
  },
  skip: "Skip to content",
  nav: {
    label: "Primary",
    features: "Features",
    ai: "AI",
    security: "Security",
    login: "Log in",
    demo: "Request a demo",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    title: "A digital office for immigration and consulting teams",
    lead: "Run clients, documents, tasks, and communications in one workspace. Clients see their case status and next steps in a personal portal.",
    cta: "Request a demo",
    shotLabel: "Screenshot pending approval",
    shotTitle: "Team workspace",
    shotNote: "Replace this frame with an approved capture from the demo environment. Synthetic data only.",
    shotAlt:
      "Reserved frame for an approved screenshot of the SPIORA team workspace on synthetic demo data.",
    caption: "Team workspace on synthetic demo data.",
  },
  workflow: {
    title: "All client work in one place",
    cards: [
      {
        title: "Data is scattered",
        body: "Client history, documents, and status are kept in one record.",
      },
      {
        title: "Tasks and deadlines get lost",
        body: "Each task has an owner, a deadline, and a discussion history.",
      },
      {
        title: "Clients ask for status by hand",
        body: "Progress and the next steps are visible in the client portal.",
      },
    ],
  },
  modules: {
    title: "Team workspace and client portal",
    scenarioLabel: "A typical case",
    steps: [
      "A manager sends an invitation",
      "The client fills in the questionnaire and uploads documents",
      "The team receives the data it needs to work on the case",
    ],
    cards: [
      {
        title: "AI Workspace",
        body: "Drafts emails, translates text, and answers from the company knowledge base.",
      },
      {
        title: "Clients and client portal",
        body: "Interaction history, documents, and statuses live in the client record. In the portal, a client fills in a questionnaire, uploads documents, and sees the next steps.",
      },
      {
        title: "Tasks",
        body: "Assign an owner, a due date, a status, comments, and files on a task.",
      },
      {
        title: "Team chat",
        body: "Work discussions and file sharing inside the platform.",
      },
      {
        title: "Calendar and video meetings",
        body: "Personal and team events, reminders, and calls.",
      },
      {
        title: "Finance",
        body: "Agreements, payments, and balances tied to the client.",
      },
      {
        title: "Knowledge base",
        body: "Procedures, templates, and instructions, with search.",
      },
      {
        title: "Analytics",
        body: "An overview of applications, cases, deadlines, and team workload.",
      },
    ],
  },
  ai: {
    title: "An AI Workspace for daily work",
    lead: "The assistant prepares email drafts, translates text, and answers questions from the company knowledge base.",
    shotLabel: "Screenshot pending approval",
    shotTitle: "AI Workspace",
    shotNote: "Replace this frame with an approved capture from the demo environment. Synthetic data only.",
    shotAlt:
      "Reserved frame for an approved screenshot of AI Workspace drafting a message from the company knowledge base.",
    caption: "Drafting a message from the company knowledge base.",
  },
  security: {
    title: "Access by role",
    lead: "Employee permissions are assigned by role. The team and the client use separate areas.",
    points: [
      {
        title: "Roles for the team",
        body: "Each employee sees the clients, tasks, and documents their role allows.",
      },
      {
        title: "A separate client portal",
        body: "A client has a portal with their own processes and documents.",
      },
    ],
  },
  demo: {
    title: "Request a SPIORA demo",
    lead: "We will show the team workspace and the client portal using one sample case.",
    name: "Name",
    company: "Company",
    email: "Work email",
    submit: "Request a demo",
    sending: "Sending…",
    success: "Request sent",
    privacy: "Privacy policy",
    privacyHint: "Read how a demo request is handled.",
    checkFields: "Check the highlighted fields.",
    unavailable: "Demo requests are temporarily unavailable.",
    failed: "We could not send your request. Please try again.",
    rateLimit: "Too many requests. Please try again later.",
    inProgress: "This request is already being sent.",
    errors: {
      nameRequired: "Enter your name.",
      nameLength: "Name must be 80 characters or fewer.",
      nameChars: "Name can contain letters, spaces, hyphens, and apostrophes.",
      companyRequired: "Enter your company.",
      companyLength: "Company must be 120 characters or fewer.",
      companyChars: "Company contains unsupported characters.",
      emailRequired: "Enter your work email.",
      emailLength: "Email must be 254 characters or fewer.",
      emailFormat: "Enter a valid work email.",
    },
  },
  footer: {
    slogan: "ONE PLATFORM. INFINITE SOLUTIONS.",
    privacy: "Privacy policy",
    sales: "Sales",
  },
  privacy: {
    title: "Privacy policy",
    draft:
      "Working draft for review. Replace this page with the approved policy before publication.",
    intro:
      "This page describes the demo form on the SPIORA marketing site. It is not a full legal policy.",
    collectTitle: "What the form collects",
    collect:
      "Name, company, and work email, plus the technical details needed to deliver the request.",
    whyTitle: "Why",
    why: "To respond to a request for a product demonstration.",
    deliveryTitle: "Where it goes",
    delivery:
      "The site sends the request to a delivery channel configured by SPIORA. The form does not store the request in the browser. The application does not write the contents of a request to ordinary logs.",
    pendingTitle: "Still to be confirmed by the site owner",
    pending:
      "Retention period, the legal entity responsible for the data, and any consent wording that should appear next to the form.",
  },
} as const;
