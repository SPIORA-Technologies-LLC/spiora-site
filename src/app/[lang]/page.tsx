import Image from "next/image";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BeforeAfter } from "@/components/BeforeAfter";
import { CaseDemo } from "@/components/CaseDemo";
import { DemoForm } from "@/components/DemoForm";
import { DiscussTimeline } from "@/components/DiscussTimeline";
import { HeroPoster } from "@/components/HeroPoster";
import { Modules } from "@/components/Modules";
import { Workspaces } from "@/components/Workspaces";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { anchorHref, isLocale } from "@/i18n/config";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { copy, story, demoCase, implementation } = getDictionary(lang);
  const anchor = (id: string) => anchorHref(lang, id);

  return (
    <main id="content">
      <Section id="top" labelledBy="hero-title" className="hero">
        <Container className="hero-grid">
          <div>
            <h1 id="hero-title">{story.hero.title}</h1>
            <p className="lead">{story.hero.lead}</p>
            <div className="hero-actions">
              <Button href={anchor("case")}>{story.hero.primary}</Button>
              <Button variant="outline" href={anchor("demo")}>
                {story.hero.secondary}
              </Button>
            </div>
          </div>
          <HeroPoster copy={copy} story={story} />
        </Container>
      </Section>

      <Section labelledBy="explain-title">
        <Container>
          <div className="section-intro">
            <h2 id="explain-title">{story.explain.title}</h2>
            <p className="lead">{story.explain.lead}</p>
          </div>
          <div className="audience-grid">
            {story.explain.audiences.map((audience) => (
              <article className="card" key={audience.title}>
                <h3>{audience.title}</h3>
                <p>{audience.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="workflow" labelledBy="workflow-title">
        <Container>
          <div className="section-intro">
            <h2 id="workflow-title">{story.beforeAfter.title}</h2>
          </div>
          <BeforeAfter
            title={story.beforeAfter.title}
            beforeLabel={story.beforeAfter.beforeLabel}
            before={story.beforeAfter.before}
            afterLabel={story.beforeAfter.afterLabel}
            after={story.beforeAfter.after}
            tools={story.beforeAfter.tools}
            workspace={story.beforeAfter.workspace}
          />
        </Container>
      </Section>

      <Section id="case" labelledBy="case-title">
        <Container>
          <div className="section-intro">
            <h2 id="case-title">{demoCase.title}</h2>
            <p className="lead">{demoCase.lead}</p>
          </div>
          <CaseDemo demoCase={demoCase} shotAlts={copy.shotAlts} />
        </Container>
      </Section>

      <Section labelledBy="spaces-title">
        <Container>
          <div className="section-intro">
            <h2 id="spaces-title">{story.spaces.title}</h2>
          </div>
          <Workspaces
            teamTitle={story.spaces.teamTitle}
            team={story.spaces.team}
            clientTitle={story.spaces.clientTitle}
            client={story.spaces.client}
          />
        </Container>
      </Section>

      <Section id="modules" labelledBy="modules-title">
        <Container>
          <div className="section-intro">
            <h2 id="modules-title">{story.modules.title}</h2>
          </div>
          <Modules
            label={story.modules.title}
            items={story.modules.items}
            shotAlts={copy.shotAlts}
            enlargeLabel={copy.modules.enlarge}
            closeLabel={copy.modules.close}
          />
        </Container>
      </Section>

      <Section labelledBy="approach-title">
        <Container>
          <div className="section-intro">
            <h2 id="approach-title">{story.approach.title}</h2>
            <p className="lead">{story.approach.lead}</p>
          </div>
          <ul className="approach-list">
            {story.approach.modes.map((mode) => (
              <li key={mode.title}>
                <h3>{mode.title}</h3>
                <p>{mode.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="implementation" labelledBy="implementation-title">
        <Container>
          <div className="section-intro">
            <h2 id="implementation-title">{implementation.title}</h2>
          </div>
          {"items" in implementation ? <DiscussTimeline items={implementation.items} /> : null}
        </Container>
      </Section>

      <Section id="security" labelledBy="security-title">
        <Container>
          <div className="section-intro">
            <h2 id="security-title">{story.security.title}</h2>
            <p className="lead">{story.security.lead}</p>
          </div>
          <div className="space-grid">
            {story.security.points.map((point) => (
              <article className="card security-card" key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </article>
            ))}
          </div>
          <div className="hero-actions">
            <Button variant="outline" href={anchor("demo")}>
              {story.security.cta}
            </Button>
          </div>
        </Container>
      </Section>

      <Section id="team" labelledBy="team-title" className="team-section">
        <Container>
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
        </Container>
      </Section>

      <div className="reach-band">
        <Container className="reach-grid">
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
                    <a className="contact-email" href={`mailto:${copy.contacts.email}`}>{copy.contacts.email}</a>
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
                </p>
              </div>
            </div>
          </div>
          </section>

          <section className="reach-col" id="demo" aria-labelledby="demo-title">
            <div className="reach-intro">
              <h2 id="demo-title">{story.finalCta.title}</h2>
              <p className="lead">{story.finalCta.lead}</p>
            </div>
            <div className="reach-form">
              <div className="hero-actions">
                <Button variant="outline" href={anchor("case")}>
                  {story.finalCta.secondary}
                </Button>
              </div>
              <DemoForm />
            </div>
          </section>
        </Container>
      </div>

      <Section labelledBy="faq-title">
        <Container>
          <div className="section-intro">
            <h2 id="faq-title">{copy.ui.faqTitle}</h2>
          </div>
          <Accordion
            items={story.faq.map((item, index) => ({
              id: `faq-${index}`,
              title: item.question,
              body: item.answer,
            }))}
          />
        </Container>
      </Section>
    </main>
  );
}
