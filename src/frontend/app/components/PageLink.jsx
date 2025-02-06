import Link from "next/link";

export default function PageLink({href, content}) {
  return <Link className="text-lg md:text-xl text-lightbrown font-bold" href={href}>{content}</Link>;
}