export type ServiceSection = {
  h2: string;
  content: string;
  items?: string[];
};

export type EnglishServiceContent = {
  badge: string;
  h1: string;
  h1Highlight: string;
  subtitle: string;
  benefits: { title: string; desc: string }[];
  sections: ServiceSection[];
  faqs: { q: string; a: string }[];
  ctaText: string;
  relatedServices: { name: string; href: string }[];
};

const related = {
  software: { name: 'Custom Software', href: '/servicios/software-a-medida' },
  automation: { name: 'Business Automation', href: '/servicios/automatizacion-empresarial' },
  web: { name: 'Web Applications', href: '/servicios/aplicaciones-web' },
  consulting: { name: 'Technology Consulting', href: '/servicios/consultoria-tecnologica' },
  ai: { name: 'AI for Business', href: '/servicios/inteligencia-artificial' },
  crm: { name: 'Custom CRM', href: '/servicios/crm-personalizado' },
  erp: { name: 'Business ERP', href: '/servicios/erp-empresarial' },
  corporate: { name: 'Corporate Web Development', href: '/servicios/desarrollo-web-corporativo' },
};

export const englishServiceContent: Record<string, EnglishServiceContent> = {
  'Aplicaciones Web': {
    badge: 'Web Applications',
    h1: 'Web Applications:',
    h1Highlight: 'Built for real business workflows.',
    subtitle: 'We build responsive web applications that replace spreadsheets, connect your team and give customers a faster digital experience on every device.',
    benefits: [
      { title: 'Works on every device', desc: 'Responsive interfaces that adapt to desktop, tablet and mobile workflows.' },
      { title: 'Fast from day one', desc: 'Server-rendered experiences and performance budgets designed into the build.' },
      { title: 'Ready to scale', desc: 'A maintainable architecture that can grow as users and features increase.' },
    ],
    sections: [
      { h2: 'What can a web application solve?', content: 'A tailored web application gives your team one reliable place to operate instead of spreading critical work across spreadsheets, email and disconnected tools.', items: ['Customer and partner portals', 'Inventory and order management', 'Dashboards and operational reporting', 'Booking and scheduling workflows', 'Internal approval systems', 'Role-based administration'] },
      { h2: 'Our web application development process', content: 'We start with the workflow and the people who use it. We map requirements, prototype the key screens, deliver in short iterations and test the application with real scenarios before launch.', items: ['Discovery and workflow mapping', 'UX architecture and clickable prototype', 'Incremental development and demos', 'Security, accessibility and performance testing', 'Deployment, training and documentation'] },
      { h2: 'A practical technology stack', content: 'We select technologies according to the product requirements. React and Next.js provide a strong frontend foundation, while Node.js, Firebase, MySQL or MongoDB cover common backend and data needs.' },
      { h2: 'How much does a web application cost?', content: 'The investment depends on users, workflows, integrations and security requirements. A discovery session produces a scoped proposal with milestones, assumptions and an implementation budget.' },
    ],
    faqs: [
      { q: 'How long does a web application take to build?', a: 'A focused first version often takes two to eight weeks. Larger products with multiple roles, integrations or complex data require a staged roadmap.' },
      { q: 'Can the application connect to our existing tools?', a: 'Yes. We can connect systems through documented APIs, webhooks, imports or carefully planned custom connectors.' },
      { q: 'Will the application work on mobile?', a: 'Yes. Responsive behavior is part of the default scope. We can also evaluate a PWA when offline access or installation is useful.' },
      { q: 'Do we own the source code?', a: 'Yes. Once the agreed project payment is complete, you receive the source code and project assets.' },
    ],
    ctaText: 'Request a free consultation',
    relatedServices: [related.software, related.automation, related.corporate, related.consulting],
  },
  'Automatización Empresarial': {
    badge: 'Business Automation',
    h1: 'Business Automation:',
    h1Highlight: 'Remove repetitive work from your operation.',
    subtitle: 'We connect systems and automate predictable workflows so your team spends less time copying data, chasing approvals and fixing avoidable errors.',
    benefits: [
      { title: 'Less manual work', desc: 'Automate repeatable tasks and give your team time for higher-value decisions.' },
      { title: 'Fewer avoidable errors', desc: 'Validation rules and consistent workflows replace fragile manual steps.' },
      { title: 'Measurable impact', desc: 'We define time, cost and quality metrics before building the automation.' },
    ],
    sections: [
      { h2: 'Which business processes can be automated?', content: 'If a process follows clear rules and happens repeatedly, it is a strong automation candidate. We begin with the highest-volume bottlenecks and the clearest business value.', items: ['Inventory updates and alerts', 'Recurring reports and exports', 'Lead routing and notifications', 'Invoice and payment follow-up', 'Internal approvals', 'Synchronization between systems', 'Order processing', 'Employee or customer onboarding'] },
      { h2: 'Automation that fits your current systems', content: 'Automation does not always require replacing your tools. We can work around existing software with APIs, webhooks, scheduled jobs and controlled spreadsheet integrations, then recommend a migration when the current process becomes a constraint.' },
      { h2: 'A real inventory workflow', content: 'For a public healthcare institution, we replaced spreadsheet-based supply tracking with a web system for movements, minimum-stock alerts and reports. The result was a reported 20% reduction in management time and better traceability.' },
      { h2: 'How do we calculate automation ROI?', content: 'We compare process volume, handling time, error cost and implementation effort. The proposal makes the expected savings and the measurement method explicit instead of promising an unexplained percentage.' },
    ],
    faqs: [
      { q: 'Do we need to replace our current systems?', a: 'Usually not. We first look for safe integration points and only recommend replacement when the existing system blocks reliability or growth.' },
      { q: 'Can you automate Excel or Google Sheets workflows?', a: 'Yes. We can automate updates, validations, reports and notifications, or help move a critical spreadsheet process into a more durable application.' },
      { q: 'How long does an automation project take?', a: 'A focused workflow can take one to two weeks. Multi-system automation usually needs three to six weeks depending on access and testing.' },
      { q: 'What happens when the process changes?', a: 'We document the workflow and build configurable rules where practical. New requirements can then be estimated without rebuilding the whole system.' },
    ],
    ctaText: 'Assess an automation opportunity',
    relatedServices: [related.software, related.ai, related.erp, related.consulting],
  },
  'Consultoría Tecnológica': {
    badge: 'Technology Consulting',
    h1: 'Technology Consulting:',
    h1Highlight: 'Make confident technical decisions.',
    subtitle: 'Get an independent technical assessment, a practical roadmap and clear next steps before committing budget to a new system or migration.',
    benefits: [
      { title: 'Independent diagnosis', desc: 'We assess the actual constraint instead of starting from a preferred technology.' },
      { title: 'Actionable roadmap', desc: 'Prioritized phases, risks, dependencies and decision points your team can use.' },
      { title: 'Lower delivery risk', desc: 'Clear scope and architecture reduce expensive rework during implementation.' },
    ],
    sections: [
      { h2: 'When is technology consulting useful?', content: 'Consulting is useful when a system is slow, a project keeps changing scope, tools do not integrate or leadership needs a defensible investment decision.', items: ['Technical and performance audits', 'Architecture and stack selection', 'Legacy modernization planning', 'SEO and Core Web Vitals reviews', 'Security and integration assessments', 'Digital transformation roadmaps'] },
      { h2: 'What you receive', content: 'We turn the discovery work into documented findings, options with trade-offs, a recommended path and a sequence of deliverables. The result is useful even when the next implementation step is handled by another team.' },
      { h2: 'A practical engagement model', content: 'We can review an existing system, interview stakeholders, inspect analytics and code, then present findings in a working session. Larger organizations can extend the engagement into architecture support or delivery oversight.' },
      { h2: 'How much does consulting cost?', content: 'A focused review may be completed as a fixed-scope engagement. Larger audits depend on system size, access and the number of workflows involved. You receive the scope and fee before work begins.' },
    ],
    faqs: [
      { q: 'Can you advise us without building the project?', a: 'Yes. We provide independent audits, architecture decisions and roadmaps without requiring a development contract.' },
      { q: 'Can you review a proposal from another vendor?', a: 'Yes. We can evaluate scope, assumptions, architecture, delivery risks and whether the proposed solution matches the business problem.' },
      { q: 'What access do you need?', a: 'That depends on the review. We may need analytics, documentation, staging access, selected code or stakeholder interviews, all agreed in advance.' },
      { q: 'Do you work with teams outside Mexico?', a: 'Yes. Remote collaboration works across Latin America, the United States and other time zones.' },
    ],
    ctaText: 'Book a technology assessment',
    relatedServices: [related.software, related.automation, related.corporate, related.ai],
  },
  'CRM Personalizado': {
    badge: 'Custom CRM',
    h1: 'Custom CRM:',
    h1Highlight: 'A sales process your team can actually use.',
    subtitle: 'We build customer and pipeline systems around your sales process, so your team has one source of truth without paying for features it will never use.',
    benefits: [
      { title: 'Your process, modeled', desc: 'Stages, fields and permissions reflect how your team actually sells.' },
      { title: 'Clear pipeline visibility', desc: 'Managers can see opportunities, ownership, activity and next actions.' },
      { title: 'Connected customer history', desc: 'Keep relevant conversations, tasks and records together for better follow-up.' },
    ],
    sections: [
      { h2: 'When does a custom CRM make sense?', content: 'A custom CRM is worth evaluating when leads live in spreadsheets, sales stages differ by team, reporting requires manual consolidation or your current platform forces the team into the wrong process.', items: ['Lead and contact management', 'Opportunity and pipeline tracking', 'Task and follow-up automation', 'Custom sales reporting', 'Customer service history', 'Integrations with email and existing systems'] },
      { h2: 'A CRM built for adoption', content: 'We prioritize the daily actions that make a CRM useful: capturing a lead quickly, knowing the next step, keeping records accurate and giving managers reliable reports. The interface should reduce work, not create administrative work.' },
      { h2: 'Integration and data ownership', content: 'We plan imports, permissions, backups and integrations before implementation. The goal is a system your company can operate and evolve without being trapped by a vendor-specific workflow.' },
      { h2: 'How much does a custom CRM cost?', content: 'Cost depends on users, modules, integrations and migration needs. We can start with a focused pipeline MVP and add reporting, automation and customer portals in later phases.' },
    ],
    faqs: [
      { q: 'Can you migrate contacts from our spreadsheets?', a: 'Yes. We clean, map and validate data before importing it, with a backup of the original files.' },
      { q: 'Can a CRM have different pipelines?', a: 'Yes. Different products, teams or business units can use distinct stages while management keeps consolidated reporting.' },
      { q: 'Can the CRM connect to our email or ERP?', a: 'Yes, when the existing system exposes a safe integration path such as an API, webhook or scheduled export.' },
      { q: 'Will our sales team need extensive training?', a: 'We design for simple daily use and include onboarding documentation and training as part of the delivery plan.' },
    ],
    ctaText: 'Plan your custom CRM',
    relatedServices: [related.software, related.automation, related.erp, related.consulting],
  },
  'Desarrollo de Software': {
    badge: 'Software Development',
    h1: 'Custom Software Development',
    h1Highlight: 'for businesses in Mexico.',
    subtitle: 'We design and build business software around the exact problem you need to solve, with clear milestones, maintainable code and a documented handover.',
    benefits: [
      { title: 'Defined delivery', desc: 'Scope, milestones and acceptance criteria are agreed before development begins.' },
      { title: 'You own the code', desc: 'The final project includes the source code and documentation agreed in the proposal.' },
      { title: 'Short feedback loops', desc: 'Frequent demonstrations make it easier to correct direction before launch.' },
    ],
    sections: [
      { h2: 'Why choose custom software?', content: 'Generic software is useful when your process matches its assumptions. Custom development is useful when spreadsheets, disconnected tools or rigid SaaS workflows are limiting the operation.', items: ['Workflows designed around your team', 'Integrations with current systems', 'A roadmap that can grow with the business', 'Ownership of the delivered code', 'Role-based access and auditability', 'Performance and accessibility considered early'] },
      { h2: 'Our software development process', content: 'We begin with discovery, define the smallest useful release, design the architecture and deliver in iterations. Testing, deployment, documentation and training are planned rather than left to the final week.', items: ['Discovery and requirements', 'Architecture and UX design', 'Incremental development', 'Quality and user acceptance testing', 'Deployment and training', 'Post-launch support'] },
      { h2: 'Examples of business software', content: 'Typical projects include inventory systems, operational dashboards, customer portals, education platforms and integrations that remove manual work between existing tools.' },
      { h2: 'How much does custom software cost?', content: 'The budget depends on users, modules, integrations, security and delivery speed. We provide a scoped estimate after understanding the workflow instead of assigning a price to an undefined idea.' },
    ],
    faqs: [
      { q: 'How long does custom software take?', a: 'A focused first release can take two to eight weeks. Larger systems are planned in phases with usable milestones.' },
      { q: 'Can we review progress during development?', a: 'Yes. We use regular demonstrations and agreed checkpoints so stakeholders can validate the product as it evolves.' },
      { q: 'Can the software integrate with our current tools?', a: 'Yes. We evaluate APIs, webhooks, imports and security constraints during discovery.' },
      { q: 'What support is included after launch?', a: 'The proposal defines the included correction window and optional maintenance. We also provide documentation and handover materials.' },
    ],
    ctaText: 'Discuss your software project',
    relatedServices: [related.software, related.web, related.automation, related.consulting],
  },
  'Desarrollo Web Corporativo': {
    badge: 'Corporate Web Development',
    h1: 'Corporate Web Development',
    h1Highlight: 'that earns trust and converts.',
    subtitle: 'We create fast, accessible corporate websites that explain your offer clearly, support organic search and turn qualified visits into conversations.',
    benefits: [
      { title: 'Clear positioning', desc: 'Information architecture and copy make the value proposition easy to understand.' },
      { title: 'Performance focused', desc: 'Responsive layouts, optimized assets and a measured loading budget.' },
      { title: 'Built to convert', desc: 'Relevant calls to action, proof and contact flows support commercial intent.' },
    ],
    sections: [
      { h2: 'What makes a corporate website effective?', content: 'A business website should answer who you help, what problem you solve, why a buyer should trust you and what they should do next. Design supports those answers instead of hiding them.', items: ['Service and solution architecture', 'Industry and location landing pages', 'Case studies and proof points', 'Technical SEO foundations', 'Accessible responsive design', 'Analytics and conversion measurement'] },
      { h2: 'Performance and SEO from the start', content: 'We use server-rendered pages where appropriate, semantic HTML, stable layouts, optimized images and metadata that matches the visible content. Performance is treated as part of the user experience and search strategy.' },
      { h2: 'A website that your team can maintain', content: 'We document the content structure and deployment process so updates do not depend on opaque edits. The implementation can include a CMS or a controlled content workflow based on your team.' },
      { h2: 'How much does a corporate website cost?', content: 'Investment depends on the number of templates, content production, integrations and language versions. We define the page architecture and scope before quoting the project.' },
    ],
    faqs: [
      { q: 'Will the website be optimized for Google?', a: 'Yes. Technical SEO, content structure, metadata, internal linking, accessibility and performance are included in the implementation scope.' },
      { q: 'Can you migrate an existing website?', a: 'Yes. We can plan URL preservation, redirects, content migration and a launch checklist to protect existing organic visibility.' },
      { q: 'Can you create an English and Spanish version?', a: 'Yes. Each language should have localized content, metadata and internal links rather than a machine-translated copy.' },
      { q: 'Can we manage content after launch?', a: 'Yes. We can implement a CMS or provide a documented content workflow suited to your team.' },
    ],
    ctaText: 'Improve your corporate website',
    relatedServices: [related.web, related.software, related.ai, related.consulting],
  },
  'ERP Empresarial': {
    badge: 'Business ERP',
    h1: 'Business ERP Development',
    h1Highlight: 'Connect operations in one system.',
    subtitle: 'We design ERP solutions that connect inventory, purchasing, sales and operational data so decisions are based on one reliable view of the business.',
    benefits: [
      { title: 'One operational view', desc: 'Connect the information your departments need to coordinate daily work.' },
      { title: 'Processes you can audit', desc: 'Roles, validations and history make important actions traceable.' },
      { title: 'Phased implementation', desc: 'Start with the highest-value module instead of disrupting the whole company at once.' },
    ],
    sections: [
      { h2: 'When does a business need an ERP?', content: 'An ERP becomes valuable when departments rely on disconnected systems, inventory numbers are unreliable, reporting is manual or growth has made informal processes too risky.', items: ['Inventory and warehouse control', 'Purchasing and supplier workflows', 'Sales and order management', 'Finance and operational reporting', 'Production or service planning', 'Role-based approvals and audit trails'] },
      { h2: 'Implementation that respects the operation', content: 'We map current processes, identify the source of truth for each data set, define the first release and plan migration and training. A phased launch reduces operational risk and gives users a working result early.' },
      { h2: 'Integration and reporting', content: 'A useful ERP must exchange data with the systems that remain in place. We evaluate APIs, imports, exports and reporting requirements before choosing the architecture.' },
      { h2: 'How much does an ERP cost?', content: 'ERP budgets vary with modules, users, integrations, data migration and controls. A discovery phase makes the scope and the implementation sequence visible before a commitment.' },
    ],
    faqs: [
      { q: 'Do we need to replace every system at once?', a: 'No. A phased roadmap can prioritize inventory, sales or another bottleneck while connecting or retiring systems gradually.' },
      { q: 'Can you migrate our existing data?', a: 'Yes. We assess quality, ownership, mapping and validation before planning a controlled migration.' },
      { q: 'Can the ERP support different user roles?', a: 'Yes. Permissions and approval flows are designed around responsibilities and separation of duties.' },
      { q: 'How do you train employees?', a: 'We use role-based training, documentation and guided adoption around the workflows each group performs.' },
    ],
    ctaText: 'Plan your ERP roadmap',
    relatedServices: [related.software, related.automation, related.crm, related.consulting],
  },
  'IA para Empresas': {
    badge: 'AI for Business',
    h1: 'AI for Business',
    h1Highlight: 'Useful automation, not hype.',
    subtitle: 'We integrate practical AI capabilities into existing systems to classify information, assist teams, analyze documents and improve customer workflows.',
    benefits: [
      { title: 'Fits existing systems', desc: 'We look for a safe integration point before recommending a replacement.' },
      { title: 'Defined use case', desc: 'The project starts with a workflow, user and success metric rather than a vague AI goal.' },
      { title: 'Security considered', desc: 'Data handling, access, retention and provider limitations are part of the architecture.' },
    ],
    sections: [
      { h2: 'Where can AI help a business today?', content: 'The strongest early use cases are repetitive, reviewable workflows where better search, classification or drafting saves time without removing human accountability.', items: ['Customer support assistants', 'Document and contract extraction', 'Demand and inventory analysis', 'Narrative report generation', 'Internal knowledge search', 'Ticket classification and routing', 'Review and sentiment analysis', 'Product recommendations'] },
      { h2: 'Choosing the right AI approach', content: 'We compare hosted APIs, retrieval-based assistants, automation rules and custom models according to accuracy, cost, latency and data sensitivity. The simplest reliable approach is usually the best first release.' },
      { h2: 'A real education use case', content: 'For Estudio Genius, we built a full-stack education platform with a Google Gemini integration for personalized academic recommendations. The case shows how AI becomes useful when it is tied to a specific product workflow.' },
      { h2: 'What does AI integration cost?', content: 'The budget depends on data preparation, integrations, evaluation, usage volume and security requirements. Provider API costs are separate and should be modeled before launch.' },
    ],
    faqs: [
      { q: 'Do we need historical data to use AI?', a: 'Not for every use case. Assistants and document workflows may start with current content, while forecasting and custom models need reliable historical data.' },
      { q: 'How do you protect confidential information?', a: 'We define what data can leave the system, apply access controls and select providers or architectures that match the confidentiality requirements.' },
      { q: 'Will AI replace our employees?', a: 'The goal is to reduce repetitive work and support decisions while keeping appropriate human review for consequential outcomes.' },
      { q: 'How do we measure whether the AI works?', a: 'We define quality, time, cost or adoption measures before launch and test representative cases instead of relying on a demo.' },
    ],
    ctaText: 'Explore an AI use case',
    relatedServices: [related.software, related.automation, related.crm, related.consulting],
  },
  'Software a Medida': {
    badge: 'Custom Software',
    h1: 'Custom Software',
    h1Highlight: 'Designed around your business.',
    subtitle: 'Replace rigid tools and disconnected spreadsheets with software that matches your process, integrates with your systems and can evolve with the company.',
    benefits: [
      { title: 'Fits the real workflow', desc: 'The product adapts to your operation instead of forcing the team into generic steps.' },
      { title: 'Grows in phases', desc: 'Start with the core workflow and add modules as the business proves what it needs.' },
      { title: 'Clear ownership', desc: 'The delivery plan defines code, documentation, hosting and operational responsibilities.' },
    ],
    sections: [
      { h2: 'Custom software versus generic tools', content: 'Generic SaaS can be the right choice for common needs. Custom software becomes compelling when your process is a competitive advantage, integrations are critical or recurring workarounds are costing the business time.', items: ['Business-specific workflows', 'Integration with existing platforms', 'Custom reporting and permissions', 'Scalable modules and data model', 'Ownership and portability', 'A roadmap based on business priorities'] },
      { h2: 'From business problem to usable product', content: 'We interview stakeholders, map the current process, define the smallest useful release and validate it through regular demonstrations. This keeps the technology connected to an outcome instead of a feature list.' },
      { h2: 'What should the first release include?', content: 'The first release should cover the critical path for a real user, include the data and permissions needed to operate safely and produce enough evidence to decide what comes next.' },
      { h2: 'How much does custom software cost?', content: 'There is no responsible fixed price without scope. We estimate after understanding users, workflows, integrations, security and the desired delivery phases.' },
    ],
    faqs: [
      { q: 'How do we know if custom software is right for us?', a: 'Look for recurring workarounds, disconnected data, expensive manual effort or a process that generic tools cannot represent reliably.' },
      { q: 'Can we start with an MVP?', a: 'Yes. A focused MVP can validate the workflow before the company invests in the broader platform.' },
      { q: 'Can the system integrate with our current software?', a: 'Yes. Integration design is part of discovery and may use APIs, webhooks, imports or controlled exports.' },
      { q: 'What happens after launch?', a: 'We provide the agreed handover and correction period, then can support maintenance, monitoring and future development.' },
    ],
    ctaText: 'Discuss your custom software idea',
    relatedServices: [related.software, related.web, related.automation, related.consulting],
  },
};
