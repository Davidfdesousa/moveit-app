import { useContext } from 'react';
import { challengesContext } from '../context/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css'; 

export function LevelUpModal() {
  const { level, closeLeveUpModal } = useContext(challengesContext);
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>
        <strong>Parabéns</strong>

        <p>Voce alcançou um novo level.</p>

        <button type="button" onClick={closeLeveUpModal}>
          <img src="/icons/close.svg" alt="Fechar modal"/>
        </button>
      </div>
    </div>
  );
}