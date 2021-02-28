import { createContext, useState, ReactNode, useEffect } from "react";
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  starNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const challengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider ({ children }:ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengeCompleted] = useState(0);

    const [activeChallenge, setActivechallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4,2)

     useEffect(() =>{
     Notification.requestPermission();
     }, [])

    function levelUp () {
        setLevel(level + 1);
    }

    function starNewChallenge () {
      const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
      const challenge = challenges[randomChallengeIndex];
      
      setActivechallenge(challenge)

      new Audio('/notification.mp3').play();
      
      if (Notification.permission === 'granted') {
        new Notification('Novo Desafio', {
          body: `Valendo ${challenge.amount}xp!`
        })
      }
    }

    function resetChallenge (){
      setActivechallenge(null);
    }

    function completeChallenge () {
      if (!activeChallenge) {
        return;
      }

      const { amount } = activeChallenge;

      let finalExperience = currentExperience + amount;

      if(finalExperience >= experienceToNextLevel) {
        finalExperience = finalExperience - experienceToNextLevel;
        levelUp();
      }

      setCurrentExperience(finalExperience);
      setActivechallenge(null);
      setChallengeCompleted(challengesCompleted + 1);
    }

    return (
      <challengesContext.Provider
        value={{
          level,
          currentExperience,
          challengesCompleted,
          levelUp,
          starNewChallenge,
          activeChallenge,
          resetChallenge,
          experienceToNextLevel,
          completeChallenge,
        }}
      >
        {children}
      </challengesContext.Provider>
    );
}
