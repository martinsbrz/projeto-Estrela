import Image from "next/image";
import Link from "next/link";

export default function NavLink(
  {
    href, 
    imgSrc,
    imgAlt,
    nome
  }:{
    href:string, 
    imgSrc:string,
    imgAlt:string,
    nome:string
  }
) {
  return (
    <div className="w-[60px] h-[60px] bg-lightgray flex flex-col justify-center items-center rounded-full active:bg-lightbrown md:hover:w-[140px] group">
      <Link className="rounded-full p-[14px] flex items-center gap-2" href={href}>
        <Image src={imgSrc} alt={imgAlt} width={40} height={40} />
        <h2 className="hidden group-hover:block">{nome}</h2>
      </Link>
    </div>
  )
}