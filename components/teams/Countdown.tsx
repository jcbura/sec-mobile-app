import { Image, Text, View } from "react-native";

import { getTimeUntil, formatDate, formatTime } from "@/lib/scripts";
import { Game } from "@/lib/types";
import { useEffect, useState } from "react";

interface Props {
  game: Game;
}

const Countdown = ({ game }: Props) => {
  const [date] = formatDate(game.game_date || "", "short");
  const time = formatTime(game.game_time || "");

  const [timeLeft, setTimeLeft] = useState(
    getTimeUntil(game.game_date || "", game.game_time || "00:00:00")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(
        getTimeUntil(game.game_date || "", game.game_time || "00:00:00")
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [game.game_date, game.game_time]);

  return (
    <View className="w-[95%] flex flex-col gap-2 justify-center items-center bg-white border border-neutral-300">
      <View className="w-full px-4 pt-2 flex flex-row justify-between items-center">
        <Text
          style={{ fontFamily: "Teko" }}
          className="text-[25%] text-center tracking-widest text-black/50"
        >
          SECCG
        </Text>
        <Text
          style={{ fontFamily: "Teko" }}
          className="text-[25%] text-center tracking-widest"
        >{`${date.toUpperCase()} - ${time.toUpperCase()}`}</Text>
      </View>
      <View className="w-full pb-2 flex flex-col gap-2 justify-center items-center">
        <Image
          source={require("@/assets/images/sec/sec.png")}
          className="w-16 h-16"
        />
        <Text
          style={{ fontFamily: "Teko" }}
          className="text-[25%] text-center tracking-widest"
        >
          SEC CHAMPIONSHIP GAME
        </Text>
      </View>
      <View className="w-full flex flex-row justify-center items-center border border-neutral-300 border-t border-b-0 border-l-0 border-r-0">
        <View className="flex-1 w-full p-2 flex flex-col justify-center items-center border border-neutral-300 border-t-0 border-b-0 border-l-0 border-r">
          <Text
            style={{ fontFamily: "Teko" }}
            className="text-[30%] text-center tracking-widest"
          >
            {timeLeft.days}
          </Text>
          <Text
            style={{ fontFamily: "Teko" }}
            className="text-[20%] text-center tracking-widest text-black/50"
          >
            DAYS
          </Text>
        </View>
        <View className="flex-1 w-full p-2 flex flex-col justify-center items-center border border-neutral-300 border-t-0 border-b-0 border-l-0 border-r">
          <Text
            style={{ fontFamily: "Teko" }}
            className="text-[30%] text-center tracking-widest"
          >
            {timeLeft.hours}
          </Text>
          <Text
            style={{ fontFamily: "Teko" }}
            className="text-[20%] text-center tracking-widest text-black/50"
          >
            HOURS
          </Text>
        </View>
        <View className="flex-1 w-full p-2 flex flex-col justify-center items-center border border-neutral-300 border-t-0 border-b-0 border-l-0 border-r">
          <Text
            style={{ fontFamily: "Teko" }}
            className="text-[30%] text-center tracking-widest"
          >
            {timeLeft.minutes}
          </Text>
          <Text
            style={{ fontFamily: "Teko" }}
            className="text-[20%] text-center tracking-widest text-black/50"
          >
            MINUTES
          </Text>
        </View>
        <View className="flex-1 w-full p-2 flex flex-col justify-center items-center">
          <Text
            style={{ fontFamily: "Teko" }}
            className="text-[30%] text-center tracking-widest"
          >
            {timeLeft.seconds}
          </Text>
          <Text
            style={{ fontFamily: "Teko" }}
            className="text-[20%] text-center tracking-widest text-black/50"
          >
            SECONDS
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Countdown;
