import { useRouter } from "next/router";
import { DonationFormik } from "@/schemas/donationSchema";

const EditDonation = () => {
  const router = useRouter();
  const { id } = router.query;

  return <DonationFormik id={id} title="Modification d'un don" />;
};

export default EditDonation;
