import PageLink from "./PageLink"

export default function ListaAulas({aulas}) {
  return (
    <ul className="flex flex-col gap-1 w-full">
      {aulas.map(aula => {
        return (
          <li className="text-[1.2rem] flex justify-around items-center w-full">
            <div>Turma: <PageLink href={'/'} content={`${aula['idade_turma']} anos`} /></div>
            <div>{`${aula['inicio'].toString().slice(0, 5)} ${aula['fim'].toString().slice(0, 5)}`}</div>
          </li>
        )
      })}
    </ul>
  )
}