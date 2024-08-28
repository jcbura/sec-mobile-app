import { Pressable, Text, View } from "react-native";

import clsx from "clsx";
import { useTeam } from "./Context";
import { NextGame } from "@/lib/types";

interface Props {
  alpha: NextGame[];
  rank: NextGame[];
  record: NextGame[];
}

const SortBar = ({ alpha, rank, record }: Props) => {
  const { teams, setTeams } = useTeam();

  return (
    <View className="w-[95%] flex flex-row justify-center items-center bg-white border border-neutral-300">
      <View className="flex-1 py-2 flex flex-col justify-center items-center border border-neutral-300 border-t-0 border-b-0 border-r border-l-0">
        <Pressable onPress={() => setTeams(alpha)}>
          <Text
            style={{ fontFamily: "Teko" }}
            className={clsx("text-[25%] text-center tracking-widest", {
              "text-blue-500":
                teams === alpha || (teams !== rank && teams !== record),
            })}
          >
            ALPHA.
          </Text>
        </Pressable>
      </View>
      <View className="flex-1 py-2 flex flex-col justify-center items-center border border-neutral-300 border-t-0 border-b-0 border-r border-l-0">
        <Pressable onPress={() => setTeams(rank)}>
          <Text
            style={{ fontFamily: "Teko" }}
            className={clsx("text-[25%] text-center tracking-widest", {
              "text-blue-500": teams === rank,
            })}
          >
            RANK
          </Text>
        </Pressable>
      </View>
      <View className="flex-1 py-2 flex flex-col justify-center items-center">
        <Pressable onPress={() => setTeams(record)}>
          <Text
            style={{ fontFamily: "Teko" }}
            className={clsx("text-[25%] text-center tracking-widest", {
              "text-blue-500": teams === record,
            })}
          >
            RECORD
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SortBar;
