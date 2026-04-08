import { Link } from "@tanstack/react-router";

export const WorkspaceNotFoundState = () => {
  return (
    <div className="rounded-3xl bg-transparent p-8 text-center">
      <p className="text-lg font-semibold text-neutral-900">
        Workspace not found
      </p>
      <p className="mt-2 text-sm text-neutral-500">
        The workspace you are looking for may have been removed or is not
        available yet.
      </p>
      <div className="mt-6">
        <Link
          to="/workspaces"
          className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
        >
          Back to workspaces
        </Link>
      </div>
    </div>
  );
};
