import { Link, usePathname } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import clsx from "clsx";
import { fetchTeams } from "@/lib/data";
import { getDecodedName, getHeaderTitle } from "@/lib/scripts";
import { Team } from "@/lib/types";
import useSWR, { preload } from "swr";

preload("teams", () => fetchTeams());
const Header = () => {
  const pathname = usePathname();

  const { data: teams } = useSWR<Team[]>("teams", () => fetchTeams());

  if (!teams) return null;

  const { name, mascot, team_rank } = getHeaderTitle(pathname, teams);

  return (
    <View className="w-full flex flex-col justify-center items-center">
      <View
        className={clsx(
          "w-full h-[95px] flex flex-col justify-end items-center",
          {
            "bg-sec-primary": name === "SOUTHEASTERN",
            "bg-alabama": name === "Alabama",
            "bg-arkansas": name === "Arkansas",
            "bg-auburn-primary": name === "Auburn",
            "bg-florida-primary": name === "Florida",
            "bg-georgia": name === "Georgia",
            "bg-kentucky": name === "Kentucky",
            "bg-lsu-primary": name === "LSU",
            "bg-mississippi-state": name === "Mississippi State",
            "bg-missouri": name === "Missouri",
            "bg-oklahoma": name === "Oklahoma",
            "bg-ole-miss-primary": name === "Ole Miss",
            "bg-south-carolina": name === "South Carolina",
            "bg-tennessee-primary": name === "Tennessee",
            "bg-texas": name === "Texas",
            "bg-texas-a&m": name === "Texas A&M",
            "bg-vanderbilt": name === "Vanderbilt",
          }
        )}
      >
        <View className="w-full h-[55px] px-6 flex flex-row justify-center items-center">
          <Text
            style={{ fontFamily: "Raj-Medium" }}
            className="text-2xl text-white uppercase"
          >
            {team_rank} <Text style={{ fontFamily: "Raj-Bold" }}>{name}</Text>{" "}
            {mascot}
          </Text>
        </View>
      </View>
      <View className="w-full h-[45px] flex flex-row justify-center items-center bg-neutral-350 dark:bg-neutral-700">
        <View className="w-full py-3 flex flex-row justify-center items-center">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Link
              href="/"
              asChild
              className="px-2 flex flex-col justify-center items-center"
            >
              <Pressable>
                <Text
                  style={{ fontFamily: "Raj-Medium", textAlign: "center" }}
                  className="text-lg text-white text-nowrap uppercase"
                >
                  <Text style={{ fontFamily: "Raj-Bold" }}>southeastern</Text>{" "}
                  conference
                </Text>
              </Pressable>
            </Link>
            {teams.map((team) => (
              <Link
                key={team.id}
                href={`/${getDecodedName(team.name)}`}
                asChild
                className="px-2 flex flex-col justify-center items-center"
              >
                <Pressable>
                  <Text
                    style={{ fontFamily: "Raj-Medium" }}
                    className="text-lg text-white text-nowrap uppercase"
                  >
                    {team.team_rank ? `${team.team_rank} ` : null}
                    <Text style={{ fontFamily: "Raj-Bold" }}>
                      {team.name}
                    </Text>{" "}
                    {team.mascot}
                  </Text>
                </Pressable>
              </Link>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Header;
