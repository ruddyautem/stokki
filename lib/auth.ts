import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack/server";

const getCurrentUser = async () => {
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/sign-in");
  }

  return user;
};

export default getCurrentUser;
