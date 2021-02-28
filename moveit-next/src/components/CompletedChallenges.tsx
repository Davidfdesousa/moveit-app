import { useContext } from 'react';
import { challengesContext } from '../context/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges () {
  const { challengesCompleted } = useContext(challengesContext);

  return (
    <div className={styles.CompletedChallengesContainer}>
      <span>Desafios Completos</span>
      <span>{ challengesCompleted }</span>
    </div>
  );
}