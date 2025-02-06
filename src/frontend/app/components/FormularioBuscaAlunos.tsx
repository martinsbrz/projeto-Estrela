import { Button } from "@heroui/react"

export default function FormularioBuscaAlunos({turmas, handleChange, acao}) {
  return (
    <div className='flex gap-6 w-full justify-center items-center'>
      <select className='w-[50px] text-[1.2rem]' name="lista-turmas" id="lista-turmas" onChange={handleChange}>
        {turmas.map(turma => {
          return (
            <option value={turma['idade_turma']}>{turma['idade_turma']}</option>
          )
        })}
      </select>
      <Button className="bg-lightbrown text-white font-bold text-[1.1rem]" onPress={acao}>Buscar</Button>
    </div>
  )
}