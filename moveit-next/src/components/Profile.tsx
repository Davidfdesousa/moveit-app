import { useContext } from 'react';
import { challengesContext } from '../context/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile () {
  const { level } = useContext(challengesContext);

  return(
    <div className={styles.profileContainer}>
      <img src="https://www.github.com/davidfdesousa.png" alt="David Ferreira"/>
      <div>
        <strong>David Ferreira</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level { level }
        </p>
      </div>
    </div>
  );
}