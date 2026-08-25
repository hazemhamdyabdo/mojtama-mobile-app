export type SettingsUnit = {
  id: string;
  label: string;
};

export type SettingsProfile = {
  name: string;
  status: string;
  avatar: number;
  units: SettingsUnit[];
};

export type SettingsRowItem = {
  id: string;
  label: string;
  icon:
    | "account-outline"
    | "pencil-outline"
    | "email-outline"
    | "phone-sync-outline"
    | "bell-outline"
    | "translate"
    | "shield-lock-outline"
    | "help-circle-outline";
};
