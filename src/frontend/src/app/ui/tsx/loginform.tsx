export default function LoginForm() {
  return (
    <div className="form-container">
      <input type="email" placeholder="Email" className="input" />
      <div className="password-container">
        <input type="password" placeholder="Senha" className="input" />
        <button className="password-btn">Mostrar</button>
      </div>
    </div>
  );
}