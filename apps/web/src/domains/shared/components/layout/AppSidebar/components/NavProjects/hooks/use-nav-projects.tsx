import type { Project } from "@/domains/projects/api/types";
import { useCallback, useMemo, useState } from "react";

interface UseNavProjectsProps {
  projects: Project[];
  open: boolean;
}

export const useNavProjects = ({ projects, open }: UseNavProjectsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isDeleteProjectDialogOpen, setIsDeleteProjectDialogOpen] =
    useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectPendingDelete, setProjectPendingDelete] =
    useState<Project | null>(null);

  const visibleProjects = useMemo(
    () => (isExpanded || !open ? projects : projects.slice(0, 3)),
    [isExpanded, open, projects]
  );

  const handleOpenCreate = useCallback(() => {
    setEditingProject(null);
    setIsProjectDialogOpen(true);
  }, []);

  const handleOpenEdit = useCallback((project: Project) => {
    setEditingProject(project);

    setTimeout(() => {
      setIsProjectDialogOpen(true);
    }, 200);
  }, []);

  const handleProjectSheetOpenChange = useCallback((open: boolean) => {
    setIsProjectDialogOpen(open);

    if (!open) {
      setEditingProject(null);
    }
  }, []);

  const handleOpenDelete = useCallback((project: Project) => {
    setProjectPendingDelete(project);
    setIsDeleteProjectDialogOpen(true);
  }, []);

  const handleDeleteDialogOpenChange = useCallback((open: boolean) => {
    setIsDeleteProjectDialogOpen(open);
    if (!open) {
      setProjectPendingDelete(null);
    }
  }, []);

  return {
    isExpanded,
    setIsExpanded,
    isProjectDialogOpen,
    editingProject,
    projectPendingDelete,
    visibleProjects,
    handleOpenCreate,
    handleOpenEdit,
    handleProjectSheetOpenChange,
    handleOpenDelete,
    isDeleteProjectDialogOpen,
    handleDeleteDialogOpenChange
  };
};
