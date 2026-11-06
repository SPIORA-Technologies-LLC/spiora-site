import Image from "next/image";
import Link from "next/link";
import {
  faBookOpen,
  faCalendarDays,
  faChartColumn,
  faComments,
  faFileInvoiceDollar,
  faEnvelope,
  faFolderOpen,
  faHeadset,
  faLocationDot,
  faPhone,
  faListCheck,
  faShieldHalved,
  faUserLock,
  faUsers,
  faWandMagicSparkles,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { DemoForm } from "@/components/DemoForm";
import { Shot } from "@/components/Shot";
import { copy } from "@/content/en";

const workflowIcons = [faFolderOpen, faClock, faHeadset];
const moduleIcons = [
  faWandMagicSparkles,
  faUsers,
  faListCheck,
  faComments,
  faCalendarDays,
  faFileInvoiceDollar,
  faBookOpen,
  faChartColumn,
];

export default function HomePage() {
  return (
    <main id="content">
      <section className="section hero" id="top" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div>
            <h1 id="hero-title">{copy.hero.title}</h1>
            <p className="lead">{copy.hero.lead}</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/#demo">
                {copy.hero.cta}
              </Link>
            </div>
          </div>
          <Shot
            src="/shots/team-workspace.png"
            width={1024}
            height={556}
            priority
            alt={copy.hero.shotAlt}
            caption={copy.hero.caption}
          />
        </div>
      </section>

      <section className="section band" id="workflow" aria-labelledby="workflow-title">
        <div className="container">
          <div className="section-intro">
            <h2 id="workflow-title">{copy.workflow.title}</h2>
          </div>
          <div className="card-grid">
            {copy.workflow.cards.map((card, index) => (
              <article className="card" key={card.title}>
                <Icon icon={workflowIcons[index]} />
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="modules" aria-labelledby="modules-title">
        <div className="container">
          <div className="section-intro">
            <h2 id="modules-title">{copy.modules.title}</h2>
          </div>
          <div className="module-features">
            {copy.modules.cards.slice(0, 2).map((card, index) => (
              <article className="card" key={card.title}>
                <Icon icon={moduleIcons[index]} />
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                {"image" in card ? (
                  <Image
                    className="module-shot"
                    src={card.image.src}
                    alt={card.image.alt}
                    width={card.image.width}
                    height={card.image.height}
                    unoptimized
                  />
                ) : null}
              </article>
            ))}
          </div>
          <div className="module-grid">
            {copy.modules.cards.slice(2).map((card, index) => (
              <article className="card" key={card.title}>
                <Icon icon={moduleIcons[index + 2]} />
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
          <ol className="scenario" aria-label={copy.modules.scenarioLabel}>
            {copy.modules.steps.map((step, index) => (
              <li key={step}>
                <span>{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section band" id="ai" aria-labelledby="ai-title">
        <div className="container split">
          <div>
            <h2 id="ai-title">{copy.ai.title}</h2>
            <p className="lead">{copy.ai.lead}</p>
          </div>
          <Shot
            src="/shots/ai-workspace.png"
            width={1024}
            height={556}
            alt={copy.ai.shotAlt}
            caption={copy.ai.caption}
          />
        </div>
      </section>

      <section className="section" id="security" aria-labelledby="security-title">
        <div className="container">
          <div className="section-intro">
            <h2 id="security-title">{copy.security.title}</h2>
            <p className="lead">{copy.security.lead}</p>
          </div>
          <div className="point-grid">
            <article className="card">
              <Icon icon={faShieldHalved} />
              <h3>{copy.security.points[0].title}</h3>
              <p>{copy.security.points[0].body}</p>
            </article>
            <article className="card">
              <Icon icon={faUserLock} />
              <h3>{copy.security.points[1].title}</h3>
              <p>{copy.security.points[1].body}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section team-section" id="team" aria-labelledby="team-title">
        <div className="container">
          <div className="section-intro">
            <h2 id="team-title">{copy.team.title}</h2>
            <p className="lead">{copy.team.lead}</p>
          </div>
          <div className="team-grid">
            {copy.team.members.map((person) => (
              <article className="card team-card" key={person.name}>
                <div className="team-photo">
                  <Image
                    src={person.photo}
                    alt={person.alt}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 899px) 50vw, 20vw"
                  />
                </div>
                <p className="team-role">{person.role}</p>
                <h3>{person.name}</h3>
                {person.phone ? (
                  <p className="team-contact">
                    <a href={person.phoneHref}>{person.phone}</a>
                    <span>{copy.team.channels}</span>
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="reach-band">
        <div className="container reach-grid">
          <section className="reach-col" id="contacts" aria-labelledby="contacts-title">
            <div className="reach-intro">
              <h2 id="contacts-title">{copy.contacts.title}</h2>
              <p className="lead">{copy.contacts.lead}</p>
            </div>
            <div className="contact-panel">
              <div className="contact-row">
                <span className="contact-icon" aria-hidden="true">
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                <div>
                  <p className="contact-kicker">{copy.contacts.company}</p>
                  <p className="contact-value">
                    {copy.contacts.street}
                    <br />
                    {copy.contacts.city}
                  </p>
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-icon" aria-hidden="true">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <div>
                  <p className="contact-kicker">{copy.contacts.emailLabel}</p>
                  <p className="contact-value">
                    <a href={`mailto:${copy.contacts.email}`}>{copy.contacts.email}</a>
                  </p>
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-icon" aria-hidden="true">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <div>
                  <p className="contact-kicker">{copy.contacts.phoneLabel}</p>
                  <p className="contact-value">
                    <a href={copy.contacts.phoneHref}>{copy.contacts.phone}</a>
                    <span>{copy.contacts.channels}</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="reach-col" id="demo" aria-labelledby="demo-title">
            <div className="reach-intro">
              <h2 id="demo-title">{copy.demo.title}</h2>
              <p className="lead">{copy.demo.lead}</p>
            </div>
            <DemoForm />
          </section>
        </div>
      </div>
    </main>
  );
}

function Icon({ icon }: { icon: IconDefinition }) {
  return (
    <span className="card-icon" aria-hidden="true">
      <FontAwesomeIcon icon={icon} />
    </span>
  );
}
