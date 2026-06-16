"use client";

import { ContactFrame } from "@/app/components/ContactFrame";
import { PageCanvas } from "@/app/components/PageCanvas";

export default function ContactPage() {
  return (
    <PageCanvas pageId="contact">
      <ContactFrame />
    </PageCanvas>
  );
}
