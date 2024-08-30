import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

import clsx from "clsx";
import { secImages, teamImages, teamName } from "@/lib/mapping";
import { NextGame, TeamEnum } from "@/lib/types";
import { getDecodedName, formatDate, formatTime } from "@/lib/scripts";

interface Props {
  nextGame: NextGame;
}

const TeamCard = ({ nextGame }: Props) => {
  const decodedTeam = getDecodedName(nextGame.name);
  const game = nextGame.next_game;
  const homeGame = game?.home_team === nextGame.name;
  const opponentRank = homeGame ? game.away_rank : game?.home_rank;

  const [date, day] = formatDate(game?.game_date || "", "short");
  const time = formatTime(game?.game_time || "");

  return (
    <View className="w-[95%] flex flex-col justify-center items-center">
      <View
        className={clsx(
          "w-full flex flex-row gap-2 justify-center items-center border border-transparent border-t border-b-0 border-l border-r",
          {
            "bg-alabama": nextGame.name === "Alabama",
            "bg-arkansas": nextGame.name === "Arkansas",
            "bg-auburn-primary": nextGame.name === "Auburn",
            "bg-florida-primary": nextGame.name === "Florida",
            "bg-georgia": nextGame.name === "Georgia",
            "bg-kentucky": nextGame.name === "Kentucky",
            "bg-lsu-primary": nextGame.name === "LSU",
            "bg-mississippi-state": nextGame.name === "Mississippi State",
            "bg-missouri": nextGame.name === "Missouri",
            "bg-oklahoma": nextGame.name === "Oklahoma",
            "bg-ole-miss-primary": nextGame.name === "Ole Miss",
            "bg-south-carolina": nextGame.name === "South Carolina",
            "bg-tennessee-primary": nextGame.name === "Tennessee",
            "bg-texas": nextGame.name === "Texas",
            "bg-texas-a&m": nextGame.name === "Texas A&M",
            "bg-vanderbilt": nextGame.name === "Vanderbilt",
          }
        )}
      >
        {nextGame.team_rank ? (
          <Text
            style={{ fontFamily: "Teko" }}
            className="py-2 text-[22%] text-center tracking-widest text-white/80"
          >
            {nextGame.team_rank}
          </Text>
        ) : null}
        <Text
          style={{ fontFamily: "Teko" }}
          className="py-2 text-[22%] text-center tracking-widest text-white"
        >{`${nextGame.name.toUpperCase()} ${nextGame.mascot.toUpperCase()}`}</Text>
      </View>
      <View className="w-full p-2 flex flex-col gap-2 justify-center items-center bg-white border border-neutral-300 border-t-0 border-b-0 border-l border-r">
        <View className="flex flex-col gap-2 justify-center items-center">
          <View className="flex flex-col gap-2 justify-center items-center">
            <Link
              href={`/${decodedTeam}`}
              asChild
              className="flex flex-row justify-center items-center"
            >
              <Pressable className="flex flex-col justify-center items-center">
                <Image
                  source={teamImages[decodedTeam as teamName]}
                  className="w-16 h-16"
                />
              </Pressable>
            </Link>
            <View className="flex flex-col justify-center items-center">
              <Text
                style={{ fontFamily: "Teko" }}
                className="text-[22%] text-center tracking-widest"
              >
                {`${day.toUpperCase()} ${date.toUpperCase()} - ${time.toUpperCase()}`}
              </Text>
              <View className="flex flex-row gap-2 justify-center items-center">
                <Text
                  style={{ fontFamily: "Teko" }}
                  className="text-[17%] text-center tracking-widest text-black/50"
                >
                  {game?.neutral_site ? "VS" : homeGame ? "VS" : "AT"}
                </Text>
                {opponentRank ? (
                  <Text
                    style={{ fontFamily: "Teko" }}
                    className="text-[17%] text-center tracking-widest text-black"
                  >
                    {opponentRank}
                  </Text>
                ) : null}
                <Text
                  style={{ fontFamily: "Teko" }}
                  className="text-[17%] text-center tracking-widest text-black/50"
                >
                  {`${
                    homeGame
                      ? game?.away_team.toUpperCase()
                      : game?.home_team.toUpperCase()
                  } ${
                    homeGame
                      ? game.away_mascot.toUpperCase()
                      : game?.home_mascot.toUpperCase()
                  } `}
                </Text>
              </View>
            </View>
          </View>
          <View className="flex flex-col justify-center items-center">
            <Text
              style={{ fontFamily: "Teko" }}
              className="text-[27%] text-center tracking-widest"
            >
              {`${nextGame.total_wins} - ${nextGame.total_losses}`}
            </Text>
          </View>
        </View>
      </View>
      <View className="w-full p-2 flex flex-row justify-center items-center bg-neutral-300 border border-transparent border-t-0 border-b border-l border-r">
        <Image
          source={secImages[decodedTeam as TeamEnum]}
          className="w-8 h-8"
        />
      </View>
    </View>
  );
};

export default TeamCard;
