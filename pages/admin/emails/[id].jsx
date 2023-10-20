import { useRouter } from 'next/router';
import { EmailFormik } from '@/schemas/emailSchema';

const EditEmail = () => {
  const router = useRouter();
  const { id } = router.query;

  return <EmailFormik id={id} title="Modification d'un email envoyé" />;
};

export default EditEmail;
