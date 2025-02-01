'use client'

import TitleLarge from '../components/TitleLarge';
import PageLink from '../components/PageLink';
import Input from '../components/Input';
import ButtonLarge from '../components/ButtonLarge';

export default function Page() {
  function handleClick() {
    return false;
  }

  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-full md:w-[50%] md:h-[80%] relative flex flex-col justify-center items-center">
        <header className='absolute w-full flex flex-col justify-center items-center top-0'>
          <TitleLarge content="Cadastrar" />
          <div className="absolute w-full justify-between bottom-0 p-10 hidden md:flex">
            <PageLink href={"/"} content="Home" />
            <PageLink href={"/login"} content="Login" />
          </div>
        </header>
        <section className='relative flex flex-col justify-center items-center gap-4 py-10'>
        <Input 
            type="text"
            name="name"
            id="name"
            placeholder="Nome"
          />
          <Input 
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
          />
          <Input 
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
          />
        </section>
        <footer className='flex flex-col w-full justify-center items-center gap-3'>
          <ButtonLarge 
            content="Cadastrar"
            acao={handleClick}
            id={'register-button'}
          />
          <PageLink href={"/forgotpassword"} content="Esqueceu sua senha?" />
          <div className="absolute w-full flex justify-between bottom-0 p-10 md:hidden">
            <PageLink href={"/"} content="Home" />
            <PageLink href={"/login"} content="Login" />
          </div>
        </footer>
      </div>
    </main>
  );
}
