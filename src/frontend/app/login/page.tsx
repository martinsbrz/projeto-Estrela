import Link from "next/link";
import LoginForm from "../ui/loginform";

export default function Login() {
  return (
    <main className="main">
      <header className="header">
        <h1 className="title">Log In</h1>
        <LoginForm />
      </header>
      <footer className="footer">
        <button className="button">
        Log In
        </button>
        <Link href="/" className="link">
          Esqueceu sua senha?
        </Link>
        <Link href="/cadastrar" className="link">
          Cadastrar
        </Link>
      </footer>
    </main>
  );
}
