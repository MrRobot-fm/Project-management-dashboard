import type { Project } from "@workspace/db";

export interface ApiCreateProjectResponseModel {
  success: boolean;
  project: Project | undefined;
}
