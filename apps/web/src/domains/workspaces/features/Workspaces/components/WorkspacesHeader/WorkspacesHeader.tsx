export const WorkspacesHeader = () => {
  return (
    <section className="gap-6">
      <div className="w-full flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
          Workspaces
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-950">
          Scan active workspaces and open the one that needs attention
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600">
          Use this index to compare volume, freshness, and activity before
          moving into a specific workspace.
        </p>
      </div>
    </section>
  );
};
