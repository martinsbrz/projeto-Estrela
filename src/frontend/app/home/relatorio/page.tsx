import Link from "next/link";
import Button from "../../components/Button.jsx";

export default function Relatorio() {

  return (
    <main className="flex flex-col justify-center items-center p-5 w-full" id="main">
      <header className="flex flex-row relative w-full justify-center items-center">
        <Link className="absolute left-0 pl-4 text-primary" href={"/calendario"} >Voltar</Link>
        <h1 className="text-3xl font-bold">Relatório</h1>
      </header>
      <form action="" className="flex flex-col p-5 gap-5 w-[85%] md:w-[35%]">
        <div className="flex justify-between bg-lightgray rounded-full px-4 py-1 md:py-2">
          <label htmlFor="inicio">Início</label>
          <input className="bg-transparent" name="inicio" type="date" placeholder="Data Início" />
        </div>
        <div className="flex justify-between bg-lightgray rounded-full px-4 py-1 md:py-2">
          <label htmlFor="fim">Fim</label>
          <input className="bg-transparent" name="fim" type="date" placeholder="Data Fim" />
        </div>
      </form>
      <Button content={"Emitir Relatório"} handleClick={console.log('teste')} />
    </main>
  )
}