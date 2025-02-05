export default function FormularioBuscaAlunos({turmas, handleChange, acao}) {
  return (
    <div className='flex gap-6 w-full justify-center items-center'>
      <select className='w-[50px] text-[1.2rem]' name="lista-turmas" id="lista-turmas" onChange={handleChange}>
        <option value=''></option>
        {turmas.map(turma => {
          return (
            <option value={turma['idade_turma']}>{turma['idade_turma']}</option>
          )
        })}
      </select>
      <button className="text-[1.2rem]" onClick={acao}>Buscar</button>
    </div>
  )
}