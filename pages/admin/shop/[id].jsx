import { useRouter } from "next/router";
import { SubscriptionFormik } from "@/schemas/subscription";

const EditSubscription = () => {
  const router = useRouter();
  const { id } = router.query;

  return <SubscriptionFormik id={id} title="Modification d'un abonnement" />;
};

export default EditSubscription;
