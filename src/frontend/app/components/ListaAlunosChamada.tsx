import { Button } from "@heroui/react";

export default function ListaAlunosChamada({alunos, data, enviarPresenca}) {
  return (
    <ul className="flex flex-col gap-3 w-[90%] flex-1 py-4 overflow-scroll">
      {alunos.map(aluno => {
        console.log()
        return (
          <li className="w-full flex flex-col justify-between items-center">
              {`${aluno['nome']} ${aluno['sobrenome']}`}
            <div className="md:flex md:gap-2">
              <Button 
                className="bg-[#00aa00] text-white font-bold h-[20px]" 
                onPress={() => {
                  enviarPresenca(
                    aluno['id_turma'],
                    aluno['id_aluno'],
                    'presente',
                    data.toString(),
                    aluno['inicio']
                );
              }}>Presente</Button>
              <Button 
                className="bg-[#aa0000] text-white font-bold h-[20px]" 
                onPress={() => {
                  enviarPresenca(
                    aluno['id_turma'],
                    aluno['id_aluno'],
                    'ausente',
                    data.toString(),
                    aluno['inicio']
                );
              }}>Ausente</Button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}