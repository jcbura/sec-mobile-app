import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, ScrollView, View } from "react-native";

import Schedule from "@/components/schedule/Schedule";
import { fetchNextGame, fetchTeam } from "@/lib/data";
import { NextGame, Team, TeamEnum } from "@/lib/types";
import useSWR from "swr";

const Param = () => {
  const { param } = useLocalSearchParams();

  const { data: nextGame } = useSWR<NextGame>(
    `${param as TeamEnum}-next-game`,
    () => fetchNextGame(param as TeamEnum)
  );

  const { data: team } = useSWR<Team>(`${param as TeamEnum}`, () =>
    fetchTeam(param as TeamEnum)
  );

  if (!team || !nextGame)
    return (
      <View className="w-full h-full flex flex-row justify-center items-center">
        <ActivityIndicator />
      </View>
    );

  return (
    <ScrollView>
      <Schedule nextGame={nextGame} team={team} />
      <StatusBar style="dark" />
    </ScrollView>
  );
};

export default Param;
