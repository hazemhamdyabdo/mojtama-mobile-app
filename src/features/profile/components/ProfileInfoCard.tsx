import ProfileAvatar from "@/features/profile/components/ProfileAvatar";
import ProfileContactCard from "@/features/profile/components/ProfileContactCard";
import ProfileStatusBadge from "@/features/profile/components/ProfileStatusBadge";
import ProfileUnitsSection from "@/features/profile/components/ProfileUnitsSection";
import type { UserProfile } from "@/features/profile/types";
import { Text, View } from "react-native";

type ProfileInfoCardProps = {
  profile: UserProfile;
  onEditAvatarPress?: () => void;
};

export default function ProfileInfoCard({
  profile,
  onEditAvatarPress,
}: ProfileInfoCardProps) {
  return (
    <View className="mb-6 items-center rounded-2xl border border-[#E4E4E7] bg-white px-4 py-5">
      <ProfileAvatar avatar={profile.avatar} onEditPress={onEditAvatarPress} />

      <View className="mt-4 flex-row flex-wrap items-center justify-center gap-2">
        <Text className="text-lg font-bold text-[#1F1F1F]">{profile.name}</Text>
        <ProfileStatusBadge status={profile.status} />
      </View>

      <ProfileUnitsSection units={profile.units} />

      <View className="mt-4 w-full flex-row gap-3">
        <ProfileContactCard label="Phone number" value={profile.phone} />
        <ProfileContactCard label="Email Address" value={profile.email} />
      </View>
    </View>
  );
}
