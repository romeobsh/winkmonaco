import { signIn, signOut, getProviders, useSession } from "next-auth/react";

const Login = ({ providers }) => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Welcome {session.user.email}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  } else {
    return (
      <div>
        {Object.values(providers).map((provider) => {
          return (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Login;

export async function getServerSideProps(context) {
  console.log(getProviders(context));
  return {
    props: {
      providers: await getProviders(context),
    },
  };
}
