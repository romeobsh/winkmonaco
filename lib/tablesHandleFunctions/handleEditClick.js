import Router from "next/router";

export const handleEditClick = (id) => {
  Router.push(Router.pathname + "/edit/" + id);
};
