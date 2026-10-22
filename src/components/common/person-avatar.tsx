import type { ComponentProps } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initials } from "@/lib/format";
import type { Person } from "@/lib/types";

// Uses the Radix avatar image rather than next/image so the initials fallback
// shows while the photo loads or if it fails.
function PersonAvatar({
  person,
  ...props
}: ComponentProps<typeof Avatar> & { person: Person }) {
  return (
    <Avatar {...props}>
      {person.avatar && <AvatarImage src={person.avatar} alt="" />}
      <AvatarFallback>{initials(person.name)}</AvatarFallback>
    </Avatar>
  );
}

export { PersonAvatar };
