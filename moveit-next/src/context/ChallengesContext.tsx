import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from "../components/LevelUpModal";

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
  closeLeveUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const challengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider ({ children, ...rest }:ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengeCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActivechallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelModalUp] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4,2)

     useEffect(() =>{
     Notification.requestPermission();
     }, [])

     useEffect(() =>{
      Cookies.set('level', String(level));
      Cookies.set('currentExperience', String(currentExperience));
      Cookies.set('challengesCompleted', String(challengesCompleted));
      }, [level, currentExperience, challengesCompleted])

    function levelUp () {
        setLevel(level + 1);
        setIsLevelModalUp(true);
    }

    function closeLeveUpModal() {
      setIsLevelModalUp(false);
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
          closeLeveUpModal,
        }}
      >
        {children}

        {isLevelUpModalOpen && <LevelUpModal /> }
      </challengesContext.Provider>
    );
}
