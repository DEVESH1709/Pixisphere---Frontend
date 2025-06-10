import PhotographerProfile from "@/component/PhotographerProfile";

export default function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  return <PhotographerProfile id={params.id} />;
}

