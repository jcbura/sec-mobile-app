import "@/global.css";

import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, ScrollView, View } from "react-native";

import TeamsComp from "@/components/teams/TeamsComp";
import { fetchNextGames, fetchSECCGame } from "@/lib/data";
import { Game, NextGame } from "@/lib/types";
import useSWR from "swr";

const Index = () => {
  const { data: game } = useSWR<Game>("sec-game", () => fetchSECCGame());

  const { data: alpha } = useSWR<NextGame[]>("alpha", () =>
    fetchNextGames("alpha")
  );

  const { data: rank } = useSWR<NextGame[]>("rank", () =>
    fetchNextGames("rank")
  );

  const { data: record } = useSWR<NextGame[]>("record", () =>
    fetchNextGames("record")
  );

  if (!game || !alpha || !rank || !record)
    return (
      <View className="w-full h-full flex flex-row justify-center items-center">
        <ActivityIndicator />
      </View>
    );

  return (
    <ScrollView>
      <TeamsComp game={game} alpha={alpha} rank={rank} record={record} />
      <StatusBar style="dark" />
    </ScrollView>
  );
};

export default Index;
