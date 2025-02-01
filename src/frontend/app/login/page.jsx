'use client'

import TitleLarge from '../components/TitleLarge';
import PageLink from '../components/PageLink';
import Input from '../components/Input';
import ButtonLarge from '../components/ButtonLarge';

export default function Page() {
  async function handleSubmit() {
    return false;
  }

  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-full md:w-[50%] md:h-[80%] relative flex flex-col justify-center items-center">
        <header className='absolute w-full flex flex-col justify-center items-center top-0'>
          <TitleLarge content="Log In" />
          <div className="absolute w-full justify-start bottom-0 p-10 hidden md:flex">
            <PageLink href={"/"} content="Home" />
          </div>
        </header>
        <form onSubmit={handleSubmit} className='relative flex flex-col justify-center items-center gap-4 py-10'>
          <Input type="email" name="email" id="email" placeholder="E-mail" />
          <Input type="password" name="password" id="password" placeholder="Senha" />
          <ButtonLarge content="Log In" id={'login-button'} />
        </form>
        <footer className='flex flex-col w-full justify-center items-center gap-3'>
          <PageLink href={"/"} content="Esqueceu sua senha?" />
          <PageLink href={"/cadastro"} content="Cadastrar" />
          <div className="absolute w-full flex justify-end bottom-0 p-10 md:hidden">
            <PageLink href={"/"} content="Home" />
          </div>
        </footer>
      </div>
    </main>
  );
}
