import { Button } from "@heroui/react";

export default function ListaAulas({aulas, dataFormatada, getAlunos, setAlunos}) {
  return (
    <ul className="flex flex-col gap-1 w-full">
      {aulas.map((aula) => {
        return (
          <li className="text-[1.2rem] flex justify-around items-center w-full">
            <div>
              <p className="text-[1.1rem]">
                Turma: {aula['idade_turma']} anos
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p>{dataFormatada}</p>
              <p className="text-[1.1rem]">
              {`${aula['inicio'].toString().slice(0, 5)} ${aula['fim'].toString().slice(0, 5)}`}
              </p>
            </div>
            <Button 
              className="bg-lightbrown text-white font-bold text-[1.1rem] h-[2rem]"
              onPress={() => {
                getAlunos(aula['idade_turma'], setAlunos);
              }}
            >Chamada</Button>
          </li>
        )
      })}
    </ul>
  )
}