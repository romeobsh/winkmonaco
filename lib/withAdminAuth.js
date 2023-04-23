import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAdminAuth = (WrappedComponent) => {
  const WithAdminAuth = (props) => {
    const [session, loading] = useSession();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !session) {
        router.push("/admin");
      }
    }, [loading, session, router]);

    if (loading || !session) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  // Set the display name for the component
  WithAdminAuth.displayName = `WithAdminAuth(${getDisplayName(WrappedComponent)})`;

  return WithAdminAuth;
};

// Helper function to get the display name of a component
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAdminAuth;
