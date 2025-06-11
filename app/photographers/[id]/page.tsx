import PhotographerProfile from "@/component/PhotographerProfile";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProfilePage({ params }: PageProps) {
  return <PhotographerProfile id={params.id} />;
}


