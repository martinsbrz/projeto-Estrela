import PageLink from "./components/PageLink";

export default function Page() {
  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center bottom-0 absolute py-[8rem] gap-5">
        <PageLink href={"/login"} content="Login" />
        <PageLink href={"/cadastro"} content="Cadastrar" />
      </div>
    </main>
  );
}
