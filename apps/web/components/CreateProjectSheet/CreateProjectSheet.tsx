import { useEffect, useState } from "react";
import { Button } from "@workspace/ui/components/Button";
import { Input } from "@workspace/ui/components/Input";
import { Label } from "@workspace/ui/components/Label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/Sheet";
import { Dropzone } from "@/components/Dropzone";
import { Spinner } from "@/components/Spinner";
import type { CreateActionPayload } from "@/hooks/use-update-project";
import type { Project } from "@workspace/db";

interface CreateProjectSheetProps {
  project?: Project;
  isOpen: boolean;
  trigger?: React.ReactNode;
  setIsOpen: (open: boolean) => void;
  action: (payload: CreateActionPayload) => void;
  isLoading?: boolean;
  mode?: "create" | "edit";
  workspaceId?: string;
}

export const CreateProjectSheet = ({
  project,
  isOpen,
  setIsOpen,
  trigger,
  action,
  isLoading,
  mode = "create",
  workspaceId,
}: CreateProjectSheetProps) => {
  const isEditMode = mode === "edit";
  const isCreateMode = mode === "create";

  const { id, name, description, logo } = project || {};
  const [formFields, setFormFields] = useState({
    name: isEditMode ? name : "",
    description: isEditMode ? description : "",
  });

  const resetForm = () => {
    setFormFields({
      name: "",
      description: "",
    });
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
    if (isOpen && isEditMode) {
      setFormFields({ name, description });
    }
  }, [description, isEditMode, isOpen, name]);

  const title = isCreateMode ? "Create Project" : "Edit Project";
  const descriptions = isCreateMode
    ? "Create a new project and start to collaborate with other people."
    : `Edit ${project?.name} project and save the changes!`;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent className="w-full sm:max-w-full md:max-w-2/3 lg:max-w-3/7 xl:max-w-2/6 px-8 py-6">
        <div className="w-full mx-auto">
          <SheetHeader className="px-0">
            <SheetTitle>{title} </SheetTitle>
            <SheetDescription>{descriptions}</SheetDescription>
          </SheetHeader>
          <form
            action={(formData: FormData) => {
              action({
                formData,
                projectLogo: logo,
                currentWsId: workspaceId,
              });
            }}
          >
            {!isCreateMode && <input type="hidden" name="projectId" value={id} />}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formFields.name}
                  onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={formFields.description ?? ""}
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      description: e.target.value,
                    })
                  }
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="logo" className="text-right">
                  Logo
                </Label>
                <Dropzone image={logo ? logo : null} disabled={isLoading} />
              </div>
            </div>
            <SheetFooter className="px-0">
              <Button
                type="submit"
                size="lg"
                disabled={(formFields.name ?? "").length < 3 || isLoading}
                className="cursor-pointer"
              >
                {isCreateMode ? "Create project" : " Save changes"}
                {isLoading && <Spinner />}
              </Button>
            </SheetFooter>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
