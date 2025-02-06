export default function ListaAlunos({alunos}) {
  return (
    <ul className="flex flex-col gap-1">
      {alunos.map(aluno => {
        return (
          <li className="text-[1.2rem]">
            {aluno['nome']}
          </li>
        )
      })}
    </ul>
  )
}