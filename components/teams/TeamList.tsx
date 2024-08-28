import { View } from "react-native";

import { useTeam } from "./Context";
import TeamCard from "./TeamCard";

const TeamList = () => {
  const { teams } = useTeam();
  return (
    <View className="w-full flex flex-col gap-2 justify-center items-center">
      {teams.map((team) => (
        <TeamCard key={team.id} nextGame={team} />
      ))}
    </View>
  );
};

export default TeamList;
