import { View, Text } from "react-native";

import { Team } from "@/lib/types";

interface Props {
  team: Team;
}

const Record = ({ team }: Props) => {
  const winPercentage =
    (team.total_wins || 0) /
    ((team.total_wins || 0) + (team.total_losses || 0));

  return (
    <View className="w-full flex flex-col justify-center items-center border border-neutral-350 dark:border-neutral-700 dark:bg-neutral-700">
      <View className="w-full flex flex-row justify-center items-center">
        <View className="flex-1 py-2 flex flex-col justify-center items-center border-neutral-350 dark:border-neutral-800 border-t-0 border-b-0 border-l-0 border-r">
          <Text
            style={{ fontFamily: "Raj-Bold" }}
            className="text-2xl text-black dark:text-white"
          >
            {team.total_wins} - {team.total_losses}
          </Text>
          <Text
            style={{ fontFamily: "Raj-Medium" }}
            className="text-lg uppercase text-black dark:text-white"
          >
            overall
          </Text>
        </View>
        <View className="flex-1 py-2 flex flex-col justify-center items-center">
          <Text
            style={{ fontFamily: "Raj-Bold" }}
            className="text-2xl text-black dark:text-white"
          >
            {team.conference_wins} - {team.conference_losses}
          </Text>
          <Text
            style={{ fontFamily: "Raj-Medium" }}
            className="text-lg uppercase text-black dark:text-white"
          >
            conference
          </Text>
        </View>
      </View>
      <View className="w-full h-12 px-6 flex flex-row justify-start items-center bg-neutral-350 dark:bg-neutral-800">
        <Text
          style={{ fontFamily: "Raj-Medium" }}
          className="text-2xl text-white uppercase"
        >
          <Text style={{ fontFamily: "Raj-Bold" }}>{`${
            winPercentage ? winPercentage.toFixed(3) : "0.000"
          }`}</Text>{" "}
          win percentage
        </Text>
      </View>
    </View>
  );
};

export default Record;
