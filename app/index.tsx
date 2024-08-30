import "@/global.css";

import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";

import TeamsComp from "@/components/teams/TeamsComp";
import { fetchNextGames, fetchSECCGame } from "@/lib/data";
import { Game, NextGame } from "@/lib/types";
import { useEffect, useState } from "react";
import useSWR from "swr";

const Index = () => {
  const [isConnected, setConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected ?? false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const { data: game } = useSWR<Game>(isConnected ? "sec-game" : null, () =>
    fetchSECCGame()
  );

  const { data: alpha } = useSWR<NextGame[]>(isConnected ? "alpha" : null, () =>
    fetchNextGames("alpha")
  );

  const { data: rank } = useSWR<NextGame[]>(isConnected ? "rank" : null, () =>
    fetchNextGames("rank")
  );

  const { data: record } = useSWR<NextGame[]>(
    isConnected ? "record" : null,
    () => fetchNextGames("record")
  );

  if (!isConnected)
    return (
      <View className="w-full h-full flex flex-col justify-center items-center">
        <Text
          style={{ fontFamily: "Teko" }}
          className="text-[25%] text-center tracking-widest"
        >
          CANNOT CONNECT TO INTERNET
        </Text>
        <Text
          style={{ fontFamily: "Teko" }}
          className="text-[20%] text-center tracking-widest text-black/50"
        >
          PLEASE TRY AGAIN LATER
        </Text>
      </View>
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
