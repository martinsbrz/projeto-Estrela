import styles from '../css/logoff.module.css';

export default function LogOff() {
  return (
    <button className={styles.turnOffButton} title="Sair">
      <img className={styles.turnOffImage} src="/desligar.png" alt="Ligado desligado ícones criados por Uniconlabs - Flaticon" />
    </button>
  )
}