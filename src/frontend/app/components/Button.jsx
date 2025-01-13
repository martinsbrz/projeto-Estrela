export default function Button({content, handleClick}) {
  return (
    <button className="bg-primary text-white font-bold w-[70%] md:w-[30%] h-10 rounded-full md:border-none active:bg-secondary">{content}</button>
  )
}