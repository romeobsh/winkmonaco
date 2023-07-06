export const fetchData = async (endpoint, setIsLoading, setData, id) => {
  try {
    const { data } = await (await fetch(`/api/${endpoint}/${id === "singleDocument" || id === undefined ? "" : id}`)).json();
    setData(id === "singleDocument" ? data[0] : data);
    setIsLoading(false);
  } catch (error) {
    console.error(error);
  }
};
