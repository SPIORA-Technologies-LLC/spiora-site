type WorkspacesProps = {
  teamTitle: string;
  team: string;
  clientTitle: string;
  client: string;
};

export function Workspaces({ teamTitle, team, clientTitle, client }: WorkspacesProps) {
  return (
    <div className="spaces-panes">
      <article className="space-pane">
        <h3>{teamTitle}</h3>
        <p>{team}</p>
      </article>
      <article className="space-pane">
        <h3>{clientTitle}</h3>
        <p>{client}</p>
      </article>
    </div>
  );
}
