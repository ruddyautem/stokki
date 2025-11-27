import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack/server";

const getCurrentUser = async () => {
  const user = await stackServerApp.getUser();
  !user && redirect("/login");

  return user;
};

export default getCurrentUser;
