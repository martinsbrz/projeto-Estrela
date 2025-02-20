export default function Input({type, name, id, placeholder}) {
  return (
    <input 
      className="border-solid border p-2 rounded-lg bg-lightgray w-[20rem] md:w-[25rem]"
      type={type} 
      name={name} 
      id={id} 
      placeholder={placeholder}
      required
    />
  )
}