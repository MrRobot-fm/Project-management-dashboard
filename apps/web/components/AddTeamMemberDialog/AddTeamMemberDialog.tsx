import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@workspace/ui/components/Button";
import { Label } from "@workspace/ui/components/Label";
import {
  MultipleSelector,
  type MultipleSelectorRef,
  type Option,
} from "@workspace/ui/components/MultipleSelector";
import { Spinner } from "@workspace/ui/components/Spinner";
import { Avatar } from "@/components/Avatar";
import { CustomDialog } from "@/components/CustomDialog";
import { addProjectMembers } from "@/services/projects/add-project-members";
import { searchUsers } from "@/services/users/search-users";
import type { ProjectMember } from "@/types/models/api-get-project-by-id";
import { Users } from "lucide-react";

interface AddTeamMemberDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  members: ProjectMember[];
  workspaceId: string;
  projectId: string;
}

const mockSearch = async (query: string, projectId: string): Promise<Option[]> => {
  const res = await searchUsers(query, projectId);

  const options: Option[] = res.map((user) => ({
    label: user.name,
    email: user.email,
    logo: user.logo,
    value: user.id,
  }));

  return options;
};

export const AddTeamMemberDialog = ({
  isOpen,
  setIsOpen,
  members,
  workspaceId,
  projectId,
}: AddTeamMemberDialogProps) => {
  return (
    <CustomDialog
      title="Add team members"
      description="Add members on this projects"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      contentSlot={
        <TeamMemberDialogContent
          members={members}
          workspaceId={workspaceId}
          projectId={projectId}
        />
      }
    />
  );
};

const TeamMemberDialogContent = ({
  members,
  workspaceId,
  projectId,
}: {
  members: ProjectMember[];
  workspaceId: string;
  projectId: string;
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const selectorRef = useRef<MultipleSelectorRef>(null);

  const addMembersAction = async (formData: FormData) => {
    const response = await addProjectMembers(formData);

    if (response.success) {
      setSelectedOptions([]);
      selectorRef.current?.reset();
    }

    return response;
  };

  return (
    <form
      action={async (formData) => {
        await addMembersAction(formData);
      }}
      className="flex flex-col gap-8"
    >
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name="workspaceId" value={workspaceId} />
      <input type="hidden" name="role" value="COLLABORATOR" />
      {selectedOptions.map((option) => (
        <input key={option.value} type="hidden" name="userId[]" value={option.value} />
      ))}
      <div className="flex flex-col gap-4">
        <Label className="ml-1">Share project whit</Label>
        <MultipleSelector
          data-test-id="multiple-selector"
          ref={selectorRef}
          placeholder="Search and add members..."
          onSearch={async (value) => {
            return await mockSearch(value, projectId as string);
          }}
          onChange={setSelectedOptions}
          menuItem={(item) => <UserItem {...item} />}
          inputProps={{ className: "px-1 py-0 ml-0" }}
          badgeClassName="bg-transparent text-neutral-600 border !border-neutral-400"
          className="border-none pl-0 py-0"
          creatable
        />
      </div>
      <div className="flex flex-col gap-4">
        <Label className="ml-1">Project Members</Label>
        <div className="flex flex-wrap gap-4">
          {members?.map((member) => (
            <UserItem key={member.id} label={member.name} logo={member.logo} />
          ))}
        </div>
      </div>
      <div className="pt-2 flex justify-end">
        <CreateMembersButton disable={selectedOptions.length === 0} />
      </div>
    </form>
  );
};

const CreateMembersButton = ({ disable = false }: { disable?: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="outline"
      className="rounded text-xs cursor-pointer px-3"
      disabled={pending || disable}
    >
      {pending ? <Spinner size="xs" className="text-neutral-600" /> : <Users />}
      Add members
    </Button>
  );
};

const UserItem = ({ label, email, logo }: Partial<Option>) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar size="md" image={logo ?? ""} fallback={label} />
      <div className="flex flex-col">
        <p className="text-sm">{label}</p>
        {email && <p className="text-xs text-muted-foreground">{email}</p>}
      </div>
    </div>
  );
};
