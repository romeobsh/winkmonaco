import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const withConditionalRedirect = (WrappedComponent) => {
  const WithConditionalRedirect = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
      return <React.Fragment>Loading</React.Fragment>;
    }

    if (!session) {
      router.push("/admin/login");
    }

    return <WrappedComponent {...props} />;
  };

  // Set the display name for the component
  WithConditionalRedirect.displayName = `WithConditionalRedirect(${getDisplayName(WrappedComponent)})`;

  return WithConditionalRedirect;
};

// Helper function to get the display name of a component
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withConditionalRedirect;
