import NavLink from "./NavLink";

export default function NavBar() {
  return (
    <div className="flex w-full justify-around items-center sticky bottom-0 p-4 md:flex-col md:left-0 md:items-start md:h-full md:bottom-auto md:w-[20%]">
      <NavLink href={"/dashboard/calendario"} imgSrc={"/calendario.png"} imgAlt={"Ícone calendário"} nome="Calendário" />
      <NavLink href={"/dashboard/relatorio"} imgSrc={"/relatorio.png"} imgAlt={"Ícone impressão"} nome="Relatório" />
      <NavLink href={"/dashboard/turmas"} imgSrc={"/turmas.png"} imgAlt={"Ícone pessoas"} nome="Turmas" />
      <NavLink href={"/dashboard/aluno"} imgSrc={"/cadastrar-aluno.png"} imgAlt={"Ícone adicionar perfil"} nome="Cadastrar Aluno" />
      <NavLink href={"/dashboard/sair"} imgSrc={"/desligar.png"} imgAlt={"Ícone login/logoff"} nome="Sair" />
    </div>
  )
}