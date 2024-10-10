import { Image, Text, View } from "react-native";

import { getTimeUntil, formatDate, formatTime } from "@/lib/scripts";
import { Game } from "@/lib/types";
import { useEffect, useState } from "react";

interface Props {
  game: Game;
}

const Countdown = ({ game }: Props) => {
  const [date, day] = formatDate(game.game_date || "", "short");
  const time = formatTime(game.game_time || "");

  const [timeLeft, setTimeLeft] = useState(
    getTimeUntil(game.game_date || "", game.game_time || "00:00:00")
  );

  useEffect(() => {
    setTimeLeft(
      getTimeUntil(game.game_date || "", game.game_time || "00:00:00")
    );

    const interval = setInterval(() => {
      setTimeLeft(
        getTimeUntil(game.game_date || "", game.game_time || "00:00:00")
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [game.game_date, game.game_time]);

  return (
    <View className="w-full flex flex-col justify-center items-center border border-neutral-350">
      <View className="w-full pt-2 flex flex-col gap-3 justify-center items-center">
        <View className="w-full px-6 flex flex-row justify-center items-center">
          <View className="flex flex-col justify-center items-center">
            <Image
              source={require("@/assets/images/sec/sec.png")}
              className="w-16 h-16"
            />
            <Text
              style={{ fontFamily: "Raj-Bold" }}
              className="text-2xl uppercase"
            >
              sec championship game
            </Text>
          </View>
        </View>
        <View className="w-full flex flex-row justify-center items-center border-neutral-350 border-t border-b-0 border-l-0 border-r-0">
          <View className="flex-1 py-2 flex flex-col justify-center items-center border-neutral-350 border-t-0 border-b-0 border-l-0 border-r">
            <Text
              style={{ fontFamily: "Raj-Bold" }}
              className="text-2xl uppercase"
            >
              {timeLeft.days}
            </Text>
            <Text
              style={{ fontFamily: "Raj-Medium" }}
              className="text-lg uppercase"
            >
              days
            </Text>
          </View>
          <View className="flex-1 py-2 flex flex-col justify-center items-center border-neutral-350 border-t-0 border-b-0 border-l-0 border-r">
            <Text
              style={{ fontFamily: "Raj-Bold" }}
              className="text-2xl uppercase"
            >
              {timeLeft.hours}
            </Text>
            <Text
              style={{ fontFamily: "Raj-Medium" }}
              className="text-lg uppercase"
            >
              hours
            </Text>
          </View>
          <View className="flex-1 py-2 flex flex-col justify-center items-center border-neutral-350 border-t-0 border-b-0 border-l-0 border-r">
            <Text
              style={{ fontFamily: "Raj-Bold" }}
              className="text-2xl uppercase"
            >
              {timeLeft.minutes}
            </Text>
            <Text
              style={{ fontFamily: "Raj-Medium" }}
              className="text-lg uppercase"
            >
              minutes
            </Text>
          </View>
          <View className="flex-1 py-2 flex flex-col justify-center items-center">
            <Text
              style={{ fontFamily: "Raj-Bold" }}
              className="text-2xl uppercase"
            >
              {timeLeft.seconds}
            </Text>
            <Text
              style={{ fontFamily: "Raj-Medium" }}
              className="text-lg uppercase"
            >
              seconds
            </Text>
          </View>
        </View>
      </View>
      <View className="w-full h-12 px-6 flex flex-row justify-start items-center bg-neutral-350">
        <Text
          style={{ fontFamily: "Raj-Medium" }}
          className="text-2xl text-white uppercase"
        >
          <Text style={{ fontFamily: "Raj-Bold" }}>{time}</Text> {day}, {date}
        </Text>
      </View>
    </View>
  );
};

export default Countdown;
