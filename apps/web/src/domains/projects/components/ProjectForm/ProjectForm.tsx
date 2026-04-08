import { PriorityBadge } from "@/domains/shared/components/badges/PriorityBadge";
import { StatusBadge } from "@/domains/shared/components/badges/StatusBadge";
import { Dropzone } from "@/domains/shared/components/Dropzone";
import { Form } from "@/domains/shared/components/Form/components";
import { FormProvider } from "@/domains/shared/components/Form/context/FormProvider";
import {
  priorityBadgeData,
  statusBadgeData
} from "@/domains/shared/constants/badges";
import {
  CreateProjectsSchema,
  UpdateProjectSchema,
  type CreateProjectType
} from "@workspace/schemas";
import { Label } from "@workspace/ui/components/Label";
import { Spinner } from "@workspace/ui/components/Spinner";
import { CirclePlus } from "lucide-react";

interface ProjectFormProps {
  onSubmit: (values: CreateProjectType) => void;
  isPending?: boolean;
  values: CreateProjectType;
  mode?: "create" | "update";
  entityId: string | undefined;
}

export const ProjectForm = ({
  onSubmit,
  isPending,
  values,
  mode = "create",
  entityId
}: ProjectFormProps) => {
  const formSchema = {
    create: CreateProjectsSchema,
    update: UpdateProjectSchema
  };

  return (
    <FormProvider
      key={values.name ?? "create"}
      initialValues={values}
      variant="minimal"
      schema={formSchema[mode]}
    >
      <Form.ScrollArea className="px-8">
        <Form.Root onSubmit={onSubmit}>
          <Form.Group className="gap-5">
            <div className="grid grid-cols-2 gap-10 max-w-80">
              <Form.Field name="status">
                <Form.Label>Status</Form.Label>
                <Form.Select data={statusBadgeData}>
                  {({ value }) => <StatusBadge status={value} />}
                </Form.Select>
                <Form.Error />
              </Form.Field>
              <Form.Field name="priority">
                <Form.Label>Priority</Form.Label>
                <Form.Select data={priorityBadgeData}>
                  {({ value }) => <PriorityBadge priority={value} />}
                </Form.Select>
                <Form.Error />
              </Form.Field>
            </div>
            <Form.Field name="name">
              <Form.Label>Name</Form.Label>
              <Form.Input placeholder="Give it a name…" autoFocus />
              <Form.Error />
            </Form.Field>
            <Form.Field name="description">
              <Form.Label>Description</Form.Label>
              <Form.Textarea placeholder="Add a short description…" />
              <Form.Error />
            </Form.Field>
            {mode === "create" ? (
              <Form.Field name="logo">
                <Form.Label>Logo</Form.Label>
                <Form.Dropzone />
                <Form.Error />
              </Form.Field>
            ) : (
              <div className="flex flex-col items-start gap-2">
                <Label>Logo</Label>
                <Dropzone
                  id={entityId}
                  mode="edit"
                  image={(values.logo as string) ?? null}
                />
              </div>
            )}
          </Form.Group>
          <Form.StickyFooter>
            <Form.Submit variant="default" size="minimal">
              {isPending ? <Spinner /> : <CirclePlus />}
              Create project
            </Form.Submit>
          </Form.StickyFooter>
        </Form.Root>
      </Form.ScrollArea>
    </FormProvider>
  );
};
