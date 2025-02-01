export default function ButtonLarge({acao, id, content}) {
  return (
    <button
    className="text-white text-lg font-bold bg-lightbrown w-[20rem] h-[2.5rem] md:w-[25rem] rounded-md"
      onClick={acao}
      id={id}
    >
      {content}
    </button>
  )
}