import Link from "next/link";
import LoginForm from "../ui/tsx/loginform";
import styles from '../ui/css/login.module.css';

export default function Login() {
  return (
    <main className={styles.loginMain}>
      <header className="header">
        <h1 className="title-1">
          Log In
        </h1>
        <LoginForm />
      </header>
      <footer className="footer">
        <button className="button">
        Log In
        </button>
        <Link href="#" className="link">
          Esqueceu sua senha?
        </Link>
        <Link href="/cadastrar" className="link">
          Cadastrar
        </Link>
      </footer>
    </main>
  );
}
