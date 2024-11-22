export default function Login() {
  return (
    <main className="main">
      <header className="header">
        <h1 className="title-1">
          Log In
        </h1>
        <div className="form-container">
          <input type="email" placeholder="Email" className="input" />
          <div className="password-container">
            <input type="password" placeholder="Senha" className="input" />
            <button className="password-btn">Mostrar</button>
          </div>
        </div>
      </header>
      <footer className="footer">
        <button className="button">
        Log In
        </button>
        <a href="#" className="link">
          Esqueceu sua senha?
        </a>
        <a href="#" className="link">
          Cadastrar
        </a>
      </footer>
    </main>
  );
}
