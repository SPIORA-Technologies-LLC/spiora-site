import Image from "next/image";
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
import { CopyValue } from "@/components/CopyValue";
import { DemoForm } from "@/components/DemoForm";
import { EnlargeableShot } from "@/components/EnlargeableShot";
import { Shot } from "@/components/Shot";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
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
      <Section id="top" labelledBy="hero-title" className="hero">
        <Container className="hero-grid">
          <div>
            <h1 id="hero-title">{copy.hero.title}</h1>
            <p className="lead">{copy.hero.lead}</p>
            <div className="hero-actions">
              <Button href="/#demo">{copy.hero.cta}</Button>
            </div>
          </div>
          <Shot
            src={copy.hero.shot.src}
            width={copy.hero.shot.width}
            height={copy.hero.shot.height}
            priority
            alt={copy.hero.shot.alt}
            caption={copy.hero.caption}
          />
        </Container>
      </Section>

      <div className="dark-sections">
      <section className="section" id="workflow" aria-labelledby="workflow-title">
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
            {copy.modules.cards.map((card, index) => (
              <article className="card" key={card.title}>
                <Icon icon={moduleIcons[index]} />
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <EnlargeableShot
                  src={card.image.src}
                  alt={card.image.alt}
                  width={card.image.width}
                  height={card.image.height}
                  enlargeLabel={copy.modules.enlarge}
                  closeLabel={copy.modules.close}
                />
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
      </div>

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
                <p className="team-role">
                  <Image src="/power-button.png" alt="" width={121} height={128} />
                  {person.role}
                </p>
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
                    <CopyValue
                      text={`${copy.contacts.street}, ${copy.contacts.city}`}
                      label={copy.contacts.copy}
                      copiedLabel={copy.contacts.copied}
                    >
                      {copy.contacts.street}
                      <br />
                      {copy.contacts.city}
                    </CopyValue>
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
                    <CopyValue
                      text={copy.contacts.email}
                      label={copy.contacts.copy}
                      copiedLabel={copy.contacts.copied}
                    >
                      <a href={`mailto:${copy.contacts.email}`}>{copy.contacts.email}</a>
                    </CopyValue>
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
                    <CopyValue
                      text={copy.contacts.phone}
                      label={copy.contacts.copy}
                      copiedLabel={copy.contacts.copied}
                    >
                      <span className="contact-static contact-phone">
                        {copy.contacts.phone}
                        <span className="contact-apps">
                          <a
                            className="contact-app-link"
                            href={copy.contacts.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={copy.contacts.whatsappLabel}
                          >
                            <svg className="contact-app" viewBox="0 0 448 512" aria-hidden="true">
                              <path
                                fill="#25D366"
                                d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                              />
                            </svg>
                          </a>
                          <a
                            className="contact-app-link"
                            href={copy.contacts.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={copy.contacts.telegramLabel}
                          >
                            <svg className="contact-app" viewBox="0 0 496 512" aria-hidden="true">
                              <path
                                fill="#2AABEE"
                                d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm115 168.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7.2-.7.3-3.1-1.2-4.4s-3.6-.8-5.1-.5c-.1 0-100 66.1-100 66.1-9.5 6.5-18.1 9.7-25.8 9.5-8.5-.2-24.8-4.8-36.9-8.7-14.9-4.8-26.7-7.4-25.7-15.6.5-4.3 6.4-8.6 17.6-13.1 69-30 114.8-49.8 137.8-59.4 65.6-27.3 79.2-32 88.1-32.2 2 0 6.3.5 9.2 2.8 2.4 1.9 3.1 4.6 3.4 6.4.3 1.8.7 6.1.4 9.3z"
                              />
                            </svg>
                          </a>
                        </span>
                      </span>
                    </CopyValue>
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
