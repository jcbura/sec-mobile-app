import { View, Text } from "react-native";

import { Team } from "@/lib/types";

interface Props {
  team: Team;
}

const Record = ({ team }: Props) => {
  return (
    <View className="w-[95%] flex flex-row justify-center items-center bg-white border border-neutral-300">
      <View className="flex-1 py-2 flex flex-col justify-center items-center border border-neutral-300 border-t-0 border-b-0 border-r border-l-0">
        <Text
          style={{ fontFamily: "Teko" }}
          className="text-[27%] text-center tracking-widest"
        >{`${team.total_wins} - ${team.total_losses}`}</Text>
        <Text
          style={{ fontFamily: "Teko" }}
          className="text-[17%] text-center tracking-widest text-black/50"
        >
          OVERALL
        </Text>
      </View>
      <View className="flex-1 flex flex-col justify-center items-center">
        <Text
          style={{ fontFamily: "Teko" }}
          className="text-[27%] text-center tracking-widest"
        >{`${team.conference_wins} - ${team.conference_losses}`}</Text>
        <Text
          style={{ fontFamily: "Teko" }}
          className="text-[17%] text-center tracking-widest text-black/50"
        >
          CONFERENCE
        </Text>
      </View>
    </View>
  );
};

export default Record;
