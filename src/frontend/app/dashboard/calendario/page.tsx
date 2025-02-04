import PageCalendar from "@/app/components/PageCalendar";

export default function Page() {
  return (
    <article className="w-full h-full flex flex-col justify-center items-center md:flex-row">
      <div className="flex justify-center items-center">
        <PageCalendar />
      </div>
      <div className="flex-1 flex items-center justify-center bg-lightgray h-full w-full m-[10px] md:m-[30px] rounded-[20px]">Conteúdo</div>
    </article>
  )
}