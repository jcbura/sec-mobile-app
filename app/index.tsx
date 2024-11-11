import "@/global.css";

import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";

import TeamsComp from "@/components/teams/TeamsComp";
import { fetchNextGames, fetchOOCRecord, fetchSECCGame } from "@/lib/data";
import { Game, NextGame, OOCRecord } from "@/lib/types";
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

  const { data: oocRecord } = useSWR<OOCRecord>(
    isConnected ? "oocRecord" : null,
    () => fetchOOCRecord()
  );

  if (!isConnected)
    return (
      <View className="bg-white dark:bg-neutral-800 w-full h-full flex flex-col justify-center items-center">
        <Text
          style={{ fontFamily: "Raj-Bold" }}
          className="text-2xl text-center text-black dark:text-white"
        >
          CANNOT CONNECT TO INTERNET
        </Text>
        <Text
          style={{ fontFamily: "Raj-Medium" }}
          className="text-lg text-center text-black dark:text-white"
        >
          PLEASE TRY AGAIN LATER
        </Text>
      </View>
    );

  if (!game || !alpha || !rank || !record || !oocRecord)
    return (
      <View className="w-full h-full flex flex-row justify-center items-center">
        <ActivityIndicator className="w-full h-full bg-white dark:bg-neutral-800" />
      </View>
    );

  return (
    <ScrollView className="bg-white dark:bg-neutral-800">
      <TeamsComp
        game={game}
        alpha={alpha}
        rank={rank}
        record={record}
        oocRecord={oocRecord}
      />
      <StatusBar style="light" />
    </ScrollView>
  );
};

export default Index;
