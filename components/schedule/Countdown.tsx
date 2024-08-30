import { Image, Text, View } from "react-native";

import { teamImages, teamName } from "@/lib/mapping";
import {
  getDecodedName,
  getTimeUntil,
  formatDate,
  formatTime,
} from "@/lib/scripts";
import { NextGame, Team } from "@/lib/types";
import { useEffect, useState } from "react";

interface Props {
  nextGame: NextGame;
  team: Team;
}

const Countdown = ({ nextGame, team }: Props) => {
  const [date] = formatDate(nextGame.next_game?.game_date || "", "short");
  const time = formatTime(nextGame.next_game?.game_time || "");

  const homeGame = nextGame.next_game?.home_team === team.name;
  const opponent = homeGame
    ? nextGame.next_game?.away_team
    : nextGame.next_game?.home_team;
  const opponentRank = homeGame
    ? nextGame.next_game?.away_rank
    : nextGame.next_game?.home_rank;

  const decodedTeam = getDecodedName(team.name);
  const decodedOpponent = getDecodedName(opponent || "");

  const [timeLeft, setTimeLeft] = useState(
    getTimeUntil(
      nextGame.next_game?.game_date || "",
      nextGame.next_game?.game_time || "00:00:00"
    )
  );

  useEffect(() => {
    setTimeLeft(
      getTimeUntil(
        nextGame.next_game?.game_date || "",
        nextGame.next_game?.game_time || "00:00:00"
      )
    );

    const interval = setInterval(() => {
      setTimeLeft(
        getTimeUntil(
          nextGame.next_game?.game_date || "",
          nextGame.next_game?.game_time || "00:00:00"
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [nextGame.next_game?.game_date, nextGame.next_game?.game_time]);

  return (
    <View className="w-[95%] flex flex-col gap-2 justify-center items-center bg-white border border-neutral-300">
      <View className="w-full px-4 pt-2 flex flex-row justify-between items-center">
        <Text
          style={{ fontFamily: "Teko" }}
          className="text-[20%] text-center tracking-widest text-black/50"
        >
          NEXT GAME
        </Text>
        <Text
          style={{ fontFamily: "Teko" }}
          className="text-[20%] text-center tracking-widest"
        >{`${date.toUpperCase()} - ${time.toUpperCase()}`}</Text>
      </View>
      <View className="w-full pb-2 flex flex-row gap-16 justify-center items-center">
        <Image
          source={
            homeGame
              ? teamImages[decodedOpponent as teamName]
              : teamImages[decodedTeam as teamName]
          }
          className="w-16 h-16"
        />
        <Text
          style={{ fontFamily: "Teko" }}
          className="text-[15%] text-center tracking-widest"
        >
          {nextGame.next_game?.neutral_site ? "VS" : homeGame ? "VS" : "AT"}
        </Text>
        <Image
          source={
            homeGame
              ? teamImages[decodedTeam as teamName]
              : teamImages[decodedOpponent as teamName]
          }
          className="w-16 h-16"
        />
      </View>
      <View className="w-full flex flex-row justify-center items-center border border-neutral-300 border-t border-b-0 border-l-0 border-r-0">
        <View className="flex-1 w-full p-2 flex flex-col justify-center items-center border border-neutral-300 border-t-0 border-b-0 border-l-0 border-r">
          <Text
            style={{ fontFamily: "Teko" }}
            className="text-[25%] text-center tracking-widest"
          >
            {timeLeft.days}
          </Text>
          <Text
            style={{ fontFamily: "Teko" }}
            className="text-[15%] text-center tracking-widest text-black/50"
          >
            DAYS
          </Text>
        </View>
        <View className="flex-1 w-full p-2 flex flex-col justify-center items-center border border-neutral-300 border-t-0 border-b-0 border-l-0 border-r">
          <Text
            style={{ fontFamily: "Teko" }}
            className="text-[25%] text-center tracking-widest"
          >
            {timeLeft.hours}
          </Text>
          <Text
            style={{ fontFamily: "Teko" }}
            className="text-[15%] text-center tracking-widest text-black/50"
          >
            HOURS
          </Text>
        </View>
        <View className="flex-1 w-full p-2 flex flex-col justify-center items-center border border-neutral-300 border-t-0 border-b-0 border-l-0 border-r">
          <Text
            style={{ fontFamily: "Teko" }}
            className="text-[25%] text-center tracking-widest"
          >
            {timeLeft.minutes}
          </Text>
          <Text
            style={{ fontFamily: "Teko" }}
            className="text-[15%] text-center tracking-widest text-black/50"
          >
            MINUTES
          </Text>
        </View>
        <View className="flex-1 w-full p-2 flex flex-col justify-center items-center">
          <Text
            style={{ fontFamily: "Teko" }}
            className="text-[25%] text-center tracking-widest"
          >
            {timeLeft.seconds}
          </Text>
          <Text
            style={{ fontFamily: "Teko" }}
            className="text-[15%] text-center tracking-widest text-black/50"
          >
            SECONDS
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Countdown;
