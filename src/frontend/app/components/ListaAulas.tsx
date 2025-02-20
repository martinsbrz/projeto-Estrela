import { Button } from "@heroui/react";

export default function ListaAulas({aulasDoDia, dataFormatada, setAlunosDaChamada}) {
  function getAlunos(turma:string) {
    const dbContent = sessionStorage.getItem('dbAlunos');
    const alunosFiltrados = JSON.parse(dbContent).filter(aluno => {
      return aluno.turma === turma;
    })
    setAlunosDaChamada(alunosFiltrados);
  }

  return (
    <ul className="flex flex-col gap-1 w-full">
      {aulasDoDia.map((aula) => {
        return (
          <li className="text-[1.2rem] flex justify-around items-center w-full">
            <div>
              <p className="text-[1.1rem]">
                Turma: {aula['turma']}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p>{dataFormatada}</p>
              <p className="text-[1.1rem]">
              {`${aula['inicio']}`}
              </p>
            </div>
            <Button 
              className="bg-lightbrown text-white font-bold text-[1.1rem] h-[2rem]"
              onPress={() => {
                getAlunos(aula.turma);
              }}
            >Chamada</Button>
          </li>
        )
      })}
    </ul>
  )
}