import styles from '../styles/components/Profile.module.css';

export function Profile () {
  return(
    <div className={styles.profileContainer}>
      <img src="https://www.github.com/davidfdesousa.png" alt="David Ferreira"/>
      <div>
        <strong>David Ferreira</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level 1
        </p>
      </div>
    </div>
  );
}