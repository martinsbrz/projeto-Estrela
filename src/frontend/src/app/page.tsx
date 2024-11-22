import styles from "./page.module.css";

export default function Login() {
  return (
    <main className="login">
      <header>
        <h1 className="header-title">
          Log In
        </h1>
        <div className="form-container">
          <input type="email" placeholder="Email" />
          <div className="password-container">
            <input type="password" placeholder="Senha" />
            <a href="#" className="password-link">Mostrar</a>
          </div>
        </div>
      </header>
      <footer>
        <button className="login-button">
        Log In
        </button>
        <a href="#" className="password-forgoten">
          Esqueceu sua senha?
        </a>
        <a href="#" className="register">
          Cadastrar
        </a>
      </footer>
    </main>
  );
}
