import Link from "next/link";

export default function Page() {
  return (
    <main className="main">
      <header className="header">
        <h1 className="title">Projeto Estrela</h1>
      </header>
      <footer className="footer">
        <Link href={'/login'} className="link">
          Login
        </Link>
        <Link href={'/cadastro'} className="link">
          Cadastro
        </Link>
        <Link href={'/home'} className="link">
          Início
        </Link>
      </footer>
    </main>
  );
}
