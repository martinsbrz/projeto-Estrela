import Link from "next/link";
import styles from '../css/navbar.module.css';

export default function BottomNavBar() {
  return (
    <>
      <div className={styles.navbar}>
        <ul className={styles.navbarList}>
          <li className={styles.navbarItem}>
            <Link href={'/home/calendario'} className={styles.navbarLink}>
                <img src="/calendario.png" alt="Calendário ícones criados por Freepik - Flaticon" className={styles.navbarImage} />
                <h3 className={styles.navbarSubtitle}>Calendário</h3>
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link href={'/home/relatorio'} className={styles.navbarLink}>
              <img src="/relatorio.png" alt="Relatório ícones criados por Shahid-Mehmood - Flaticon" className={styles.navbarImage} />
              <h3 className={styles.navbarSubtitle}>Relatório</h3>
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link href={'/home/turmas'} className={styles.navbarLink}>
              <img src="/turmas.png" alt="Pessoas ícones criados por alkhalifi design - Flaticon" className={styles.navbarImage} />
              <h3 className={styles.navbarSubtitle}>Turmas</h3>
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link href={'/home/cadastrar-aluno'} className={styles.navbarLink}>
              <img src="/cadastrar-aluno.png" alt="Adicionar usuário ícones criados por uicon - Flaticon" className={styles.navbarImage} />
              <h3 className={styles.navbarSubtitle}>Cadastrar Aluno</h3>
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link href={'/home'} className={styles.navbarLink}>
              <img src="/vazio.png" alt="Vazio ícones criados por Dreamstale - Flaticon" className={styles.navbarImage} />
              <h3 className={styles.navbarSubtitle}>Início</h3>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}