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
      <View className="w-full h-full flex flex-col justify-center items-center">
        <Text
          style={{ fontFamily: "Teko" }}
          className="text-[22%] text-center tracking-widest"
        >
          CANNOT CONNECT TO INTERNET
        </Text>
        <Text
          style={{ fontFamily: "Teko" }}
          className="text-[17%] text-center tracking-widest text-black/50"
        >
          PLEASE TRY AGAIN LATER
        </Text>
      </View>
    );

  if (!team || !nextGame)
    return (
      <View className="w-full h-full flex flex-row justify-center items-center">
        <ActivityIndicator />
      </View>
    );

  return (
    <ScrollView className="bg-white">
      <Schedule nextGame={nextGame} team={team} />
      <StatusBar style="light" />
    </ScrollView>
  );
};

export default Param;
