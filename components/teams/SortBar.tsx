import { Pressable, Text, View } from "react-native";

import { useTeam } from "./Context";
import { NextGame, OOCRecord } from "@/lib/types";
import { countRankedTeams } from "@/lib/scripts";
import clsx from "clsx";

interface Props {
  alpha: NextGame[];
  rank: NextGame[];
  record: NextGame[];
  oocRecord: OOCRecord;
}

const SortBar = ({ alpha, rank, record, oocRecord }: Props) => {
  const { teams, setTeams } = useTeam();

  const rankedTeams = countRankedTeams(alpha);

  return (
    <View className="w-full flex flex-col justify-center items-center border border-neutral-350 dark:border-neutral-700 dark:bg-neutral-700">
      <View className="w-full flex flex-row justify-center items-center">
        <Pressable
          onPress={() => setTeams(alpha)}
          className="flex-1 py-2 flex flex-col justify-center items-center border-neutral-350 dark:border-neutral-800 border-t-0 border-b-0 border-l-0 border-r"
        >
          <Text
            style={{ fontFamily: "Raj-Bold" }}
            className={clsx("text-2xl uppercase", {
              "text-black dark:text-white": !(
                teams === alpha ||
                (teams !== rank && teams !== record)
              ),
              "text-blue-600 dark:text-blue-400":
                teams === alpha || (teams !== rank && teams !== record),
            })}
          >
            alpha.
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setTeams(rank)}
          className="flex-1 py-2 flex flex-col justify-center items-center border-neutral-350 dark:border-neutral-800 border-t-0 border-b-0 border-l-0 border-r"
        >
          <Text
            style={{ fontFamily: "Raj-Bold" }}
            className={clsx("text-2xl uppercase", {
              "text-black dark:text-white": teams !== rank,
              "text-blue-600 dark:text-blue-400": teams === rank,
            })}
          >
            rank
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setTeams(record)}
          className="flex-1 py-2 flex flex-col justify-center items-center"
        >
          <Text
            style={{ fontFamily: "Raj-Bold" }}
            className={clsx("text-2xl uppercase", {
              "text-black dark:text-white": teams !== record,
              "text-blue-600 dark:text-blue-400": teams === record,
            })}
          >
            record
          </Text>
        </Pressable>
      </View>
      <View className="w-full h-12 px-6 flex flex-row justify-start items-center bg-neutral-350 dark:bg-neutral-800">
        {teams === alpha || (teams !== rank && teams !== record) ? (
          <Text
            style={{ fontFamily: "Raj-Medium" }}
            className="text-2xl text-white uppercase"
          >
            <Text style={{ fontFamily: "Raj-Bold" }}>16</Text> sec teams
          </Text>
        ) : null}
        {teams === rank ? (
          <Text
            style={{ fontFamily: "Raj-Medium" }}
            className="text-2xl text-white uppercase"
          >
            <Text style={{ fontFamily: "Raj-Bold" }}>{rankedTeams}</Text> cfp
            top 25 teams
          </Text>
        ) : null}
        {teams === record ? (
          <Text
            style={{ fontFamily: "Raj-Medium" }}
            className="text-2xl text-white uppercase"
          >
            <Text style={{ fontFamily: "Raj-Bold" }}>
              {oocRecord.ooc_wins} - {oocRecord.ooc_losses}
            </Text>{" "}
            ooc record
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default SortBar;
