// Delete an item based on its API endpoint and its id, using a confirmationModal

export const deletionHandler = async (id, endpoint, setIsLoading, setIsOpened) => {
  setIsLoading(true);
  setIsOpened(false);
  try {
    const res = await fetch("/api/" + endpoint + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 204) {
      setIsLoading(false);
    } else {
      console.log("Une erreur est survenue");
    }
  } catch (error) {
    console.error(error);
  }
};
