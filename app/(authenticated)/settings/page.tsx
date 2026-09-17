import SettingsClient from "@/components/SettingsClient";
import getCurrentUser from "@/lib/auth";

const Settings = async () => {
  const _user = await getCurrentUser();
  return <SettingsClient />;
};
export default Settings;
