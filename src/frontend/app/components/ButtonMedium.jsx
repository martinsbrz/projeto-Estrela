export default function ButtonMedium({onClick, id, content, color}) {
  
  return (
    <button
    className={`text-white text-lg font-bold w-[10rem] h-[2.5rem] rounded-full bg-${color}`}
      id={id}
      type="submit"
      color={color}
      onClick={onClick}
    >
      {content}
    </button>
  )
}