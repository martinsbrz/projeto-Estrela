import Image from "next/image";
import Link from "next/link";

export default function NavLink(
  {
    href, 
    imgSrc,
    imgAlt
  }:{
    href:string, 
    imgSrc:string
    imgAlt:string
  }
) {
  return (
    <div className="w-[60px] h-[60px] bg-lightgray flex flex-col justify-center items-center rounded-full active:bg-lightbrown">
      <Link className="rounded-full p-[14px]" href={href}>
        <Image src={imgSrc} alt={imgAlt} width={40} height={40} />
      </Link>
    </div>
  )
}