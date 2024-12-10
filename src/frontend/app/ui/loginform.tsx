export default function LoginForm() {
  return (
    <div className="login-container">
      <input
        type="email"
        placeholder="Email"
        className="input"
      />
      <div className="password-container">
        <input
          type="password" 
          placeholder="Senha" 
          className="input"
        />
        <button className="password-button">
          Mostrar
        </button>
      </div>
    </div>
  );
}