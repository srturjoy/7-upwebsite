import { notFound } from "next/navigation"
import { getTeamMember, TEAM_MEMBERS } from "@/data/team"
import { MemberProfileView } from "@/components/team/member-profile-view"

export function generateStaticParams() {
  return TEAM_MEMBERS.map((member) => ({
    id: member.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const member = getTeamMember(id)
  if (!member) {
    return { title: "Team Member Not Found | Boosting Agency BD" }
  }

  return {
    title: `${member.name} — ${member.role} | Boosting Agency BD`,
    description: member.description,
    openGraph: {
      title: `${member.name} — ${member.role}`,
      description: member.description,
      images: member.defaultImages[0]?.url ? [member.defaultImages[0].url] : [],
    },
  }
}

export default async function TeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const member = getTeamMember(id)

  if (!member) {
    notFound()
  }

  return <MemberProfileView member={member} />
}
