import NavLink from "./NavLink";

export default function NavBar() {
  return (
    <div className="flex w-full justify-around items-center sticky bottom-0 p-4">
      <NavLink href={"/dashboard/calendario"} imgSrc={"/calendario.png"} imgAlt={"Ícone calendário"} />
      <NavLink href={"/dashboard/relatorio"} imgSrc={"/relatorio.png"} imgAlt={"Ícone impressão"} />
      <NavLink href={"/dashboard/turmas"} imgSrc={"/turmas.png"} imgAlt={"Ícone pessoas"} />
      <NavLink href={"/dashboard/aluno"} imgSrc={"/cadastrar-aluno.png"} imgAlt={"Ícone adicionar perfil"} />
      <NavLink href={"/dashboard/sair"} imgSrc={"/desligar.png"} imgAlt={"Ícone login/logoff"} />
    </div>
  )
}