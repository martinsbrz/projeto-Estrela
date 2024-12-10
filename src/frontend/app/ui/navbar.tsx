import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <div className="navbar-container">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link href={'/home/calendario'} className="navbar-link">
                <img src="/calendario.png" alt="Calendário ícones criados por Freepik - Flaticon" className="navbar-icon" />
                <h3 className="navbar-subtitle">Calendário</h3>
            </Link>
          </li>
          <li className="navbar-item">
            <Link href={'/home/relatorio'} className="navbar-link">
              <img src="/relatorio.png" alt="Relatório ícones criados por Shahid-Mehmood - Flaticon" className="navbar-icon" />
              <h3 className="navbar-subtitle">Relatório</h3>
            </Link>
          </li>
          <li className="navbar-item">
            <Link href={'/home/turmas'} className="navbar-link">
              <img src="/turmas.png" alt="Pessoas ícones criados por alkhalifi design - Flaticon" className="navbar-icon" />
              <h3 className="navbar-subtitle">Turmas</h3>
            </Link>
          </li>
          <li className="navbar-item">
            <Link href={'/home/cadastrar-aluno'} className="navbar-link">
              <img src="/cadastrar-aluno.png" alt="Adicionar usuário ícones criados por uicon - Flaticon" className="navbar-icon" />
              <h3 className="navbar-subtitle">Cadastrar Aluno</h3>
            </Link>
          </li>
          <li className="navbar-item">
            <Link href={'/home'} className="navbar-link">
              <img src="/vazio.png" alt="Vazio ícones criados por Dreamstale - Flaticon" className="navbar-icon" />
              <h3 className="navbar-subtitle">Início</h3>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}