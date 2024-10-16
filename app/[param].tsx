import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";

import Schedule from "@/components/schedule/Schedule";
import { fetchNextGame, fetchTeam } from "@/lib/data";
import { NextGame, Team, TeamEnum } from "@/lib/types";
import { useEffect, useState } from "react";
import useSWR from "swr";

const Param = () => {
  const [isConnected, setConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected ?? false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const { param } = useLocalSearchParams();

  const { data: nextGame } = useSWR<NextGame>(
    isConnected ? `${param as TeamEnum}-next-game` : null,
    () => fetchNextGame(param as TeamEnum)
  );

  const { data: team } = useSWR<Team>(
    isConnected ? `${param as TeamEnum}` : null,
    () => fetchTeam(param as TeamEnum)
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

  if (!team || !nextGame)
    return (
      <View className="w-full h-full flex flex-row justify-center items-center">
        <ActivityIndicator className="w-full h-full bg-white dark:bg-neutral-800" />
      </View>
    );

  return (
    <ScrollView className="bg-white dark:bg-neutral-800">
      <Schedule nextGame={nextGame} team={team} />
      <StatusBar style="light" />
    </ScrollView>
  );
};

export default Param;
