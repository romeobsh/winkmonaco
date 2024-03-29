import { useRouter } from "next/router";
import { VolunteerFormik } from "@/schemas/volunteerSchema";

const EditVolunteer = () => {
  const router = useRouter();
  const { id } = router.query;

  return <VolunteerFormik id={id} title="Modification d'un volontaire" />;
};

export default EditVolunteer;
