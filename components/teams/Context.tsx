import { NextGame } from "@/lib/types";
import { createContext, useContext, useState } from "react";

interface TeamContextType {
  teams: NextGame[];
  setTeams: (teams: NextGame[]) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider = ({
  children,
  defaultTeams,
}: {
  children: React.ReactNode;
  defaultTeams: NextGame[];
}) => {
  const [teams, setTeams] = useState<NextGame[]>(defaultTeams);

  return (
    <TeamContext.Provider value={{ teams, setTeams }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);

  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider");
  }

  return context;
};
