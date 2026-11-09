import Image from "next/image";
import {
  faBookOpen,
  faCalendarDays,
  faChartColumn,
  faComments,
  faFileInvoiceDollar,
  faFolderOpen,
  faHeadset,
  faListCheck,
  faShieldHalved,
  faUserLock,
  faUsers,
  faWandMagicSparkles,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { CaseJourney } from "@/components/CaseJourney";
import { EnlargeableShot } from "@/components/EnlargeableShot";
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
      <CaseJourney />

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
            width={1368}
            height={744}
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
