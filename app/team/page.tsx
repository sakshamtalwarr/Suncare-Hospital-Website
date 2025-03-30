import type { Metadata } from "next"
import TeamClient from "./team-client"

export const metadata: Metadata = {
  title: "Our Team | Suncare Hospital",
  description:
    "Meet our dedicated team of healthcare professionals at Suncare Hospital, committed to providing exceptional care.",
}

export default function TeamPage() {
  return <TeamClient />
}

