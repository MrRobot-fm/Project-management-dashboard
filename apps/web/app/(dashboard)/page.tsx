import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/Accordion/Accordion";
import { Button } from "@workspace/ui/components/Button";
import { Avatar } from "@/components/Avatar";
import { AvatarStack } from "@/components/AvatarStack";
import { getCurrentUser } from "@/services/get-current-user";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getCurrentUser();

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <Avatar image="" />
        <AvatarStack
          avatars={[
            {
              name: "federico Migliore",
              image: "https://github.com/shadcn.png",
            },
            { name: "maria chiara", image: "https://github.com/shadcn.png" },
            {
              name: "federico Migliore",
              image: "https://github.com/shadcn.png",
            },
            { name: "maria chiara", image: "https://github.com/shadcn.png" },
            {
              name: "federico Migliore",
              image: "https://github.com/shadcn.png",
            },
            { name: "maria chiara", image: "https://github.com/shadcn.png" },
          ]}
          avatarStyles="size-10"
        />
        <h1 className="text-2xl font-bold">
          Welcome back, {`${data.user.name}!`}
        </h1>
        <Button size="sm">Button</Button>
        <Accordion type="single" collapsible className="w-96">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It is animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
