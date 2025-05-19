import { Button } from "@workspace/ui/components/Button";
import { Avatar } from "@/components/Avatar";
import { getCurrentUser } from "@/services/users/get-current-user";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { user } = await getCurrentUser();

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <Avatar image={user?.logo} fallback={user?.name} size="3xl" />
        <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
        <Button size="sm">Action</Button>
      </div>
    </div>
  );
}
