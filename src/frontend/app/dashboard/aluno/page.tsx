'use client'

import TitleLarge from "@/app/components/TitleLarge";
import TitleMedium from "@/app/components/TitleMedium";
import { Button, DatePicker, Form, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { useEffect, useState } from "react";
import { IoIosAddCircle, IoMdClose } from "react-icons/io";
import { CiEdit } from "react-icons/ci";

export default function Page() {
  const [alunos, setAlunos] = useState([]);
  const [aluno, setAluno] = useState({});
  const [telaAdicionar, setTelaAdicionar] = useState(false);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [turma, setTurma] = useState('');
  const [turmas, setTurmas] = useState([]);
  const [observacao, setObservacao] = useState('');
  const [telaEditar, setTelaEditar] = useState(false);

  function listarAlunos() {
    const dbContent = sessionStorage.getItem('dbAlunos');
    if (!dbContent) {
      sessionStorage.setItem('dbAlunos', '[]');
    } else {
      const alunos = JSON.parse(dbContent).sort((a, b) => {
        a.nome > b.nome ? 1 : -1;
      });
      setAlunos(alunos);
    }
  }

  function criarAluno() {
    const novoAluno = {
      nome: nome,
      sobrenome: sobrenome,
      nascimento: nascimento.toString(),
      turma: turma.target.value,
      observacao: observacao
    }
    const alunoExistente = alunos.find(aluno => {
      return (aluno.nome === novoAluno.nome && aluno.sobrenome === novoAluno.sobrenome && aluno.nascimento === novoAluno.nascimento);
    });
    if (alunoExistente) {
      const alunosAtualizados = alunos.map(aluno => {
        const alunoAAtualizar = (aluno.nome === novoAluno.nome && aluno.sobrenome === novoAluno.sobrenome && aluno.nascimento === novoAluno.nascimento);
        if (alunoAAtualizar) {
          aluno = novoAluno;
        }
        return aluno;
      });
      sessionStorage.setItem('dbAlunos', JSON.stringify(alunosAtualizados));
    } else {
      alunos.push(novoAluno);
      sessionStorage.setItem('dbAlunos', JSON.stringify(alunos));
    }
  }

  function listarTurmas() {
    const dbContent = sessionStorage.getItem('dbTurmas');
    if (!dbContent) {
      sessionStorage.setItem('dbTurmas', '[]');
    } else {
      const turmas = JSON.parse(dbContent).sort((a, b) => {
        a.turma > b.turma ? 1 : -1;
      });
      setTurmas(turmas);
    }
  }

  function getDiaCompleto(dia) {
    switch(dia) {
      case 'Seg':
        return 'Segunda';
      case 'Ter':
        return 'Terça';
      case 'Qua':
        return 'Quarta';
      case 'Qui':
        return 'Quinta';
      case 'Sex':
        return 'Sexta';
      case 'Sáb':
        return 'Sábado';
      case 'Dom':
        return 'Domingo';
    }
  }

  function encontrarAluno(event) {
    const alunoNome = event.target.value;
    setAluno(alunos.filter(aluno => aluno.nome === alunoNome)[0]);
  }

  function calcularIdade(dataNascimento) {
    const diferenca = Date.now() - new Date(dataNascimento).getTime();
    const anoDiferenca = new Date(diferenca);
    console.log(anoDiferenca)
    return Math.abs(anoDiferenca.getUTCFullYear() - 1970);
  }

  function exibirAluno() {
    return (
      <div className="relative">
        <p>Aluno(a): {aluno.nome} {aluno.sobrenome}</p>  
        <p>Idade: {calcularIdade(aluno.nascimento)}</p>
        <p>Turma: {aluno.turma}</p>
        <p>Observações: {aluno.observacoes}</p>
        <Button
          isIconOnly
          onPress={() => {
            setTelaEditar(true);
          }}
          className="absolute rounded-full bg-lightbrown right-0"
        ><CiEdit className="w-[70%] h-[70%] text-white" /></Button>
      </div>
    );
  }

  useEffect(() => {
    listarAlunos();
    listarTurmas();
  }, []);

  return (
    <div className="flex flex-col h-full w-full justify-start items-center gap-5 relative">
      <header className='relative'>
        <TitleLarge content={'Alunos'} />
      </header>
      <div className='flex flex-col  justify-start w-full h-full relative gap-4 items-center'>
        <div className='flex flex-col justify-start items-center w-full h-full'>
          <div className='flex w-[80%] justify-between items-center'>
            <TitleMedium content={'Aluno'} />
            <Form className='w-[70%]'>
              <Select onChange={encontrarAluno} label='Alunos'>
                {alunos && alunos.map(aluno => (
                  <SelectItem key={aluno.nome}>{`${aluno.nome} ${aluno.sobrenome}`}</SelectItem>
                ))}
              </Select>
            </Form>
          </div>
          <div className='flex flex-col justify-start items-center h-full p-10'>
            {Object.entries(aluno).length != 0 && 
            exibirAluno()}
          </div>
          <Button isIconOnly color='transparent' className='absolute right-0 bottom-0 w-[60px] h-[60px] m-4' onPress={() => setTelaAdicionar(true)}>
            <IoIosAddCircle className='w-[60px] h-[60px] text-lightbrown'/>
          </Button>
        </div>
        {
        telaAdicionar &&
        <div className='bg-white h-full sm:h-full md:h-[90%] w-[80%] absolute border z-10 bottom-10 sm:bottom-0 md:bottom-12 p-8 flex flex-col justify-center items-center gap-4'>
          <Form className='w-[90%] flex flex-col gap-6' onSubmit={criarAluno} validationBehavior='native'>
            <div className='flex justify-between w-full gap-5'>
              <Input 
                className='h-[30px]'
                type='text'
                isRequired
                label='Nome'
                name='nome'
                onValueChange={setNome}
              />
              <Input
                className='h-[30px]'
                type='text'
                isRequired
                label='Sobrenome'
                name='sobrenome'
                onValueChange={setSobrenome}
              />
            </div>
            <DatePicker 
                label="Data de nascimento"
                name='nascimento'
                showMonthAndYearPickers
                isRequired
                onChange={setNascimento}
              />
            <Select isRequired label={'Turma'} name='turma' onChange={setTurma} className='h-[40px]'>
              {turmas.map(turma => (
                <SelectItem key={turma.turma}>{`Turma: ${turma.turma} Dia: ${getDiaCompleto(turma.dia)}`}</SelectItem>
              ))}
            </Select>
            <Textarea 
              label='Observação'
              onValueChange={setObservacao}
              className='overflow-scroll h-[6rem]'
            />
            <Button type="submit" className='bg-lightbrown text-white font-bold text-[1.1rem]'>Salvar</Button>
          </Form>
          <Button isIconOnly className='rounded-full relative bottom-0 right-0 absolute bottom-0 md:bottom-reset md:top-0 md:right-0 m-5' onPress={() => setTelaAdicionar(false)}>
            <IoMdClose className='h-[80%] w-[80%]' />
          </Button>
        </div>
        }
        {telaEditar && 
        <div className="bg-white h-full sm:h-full md:h-[90%] w-[80%] absolute border z-10 bottom-10 sm:bottom-0 md:bottom-12 p-8 flex flex-col justify-center items-center gap-4">
          <Form className='w-[90%] flex flex-col gap-6' onSubmit={criarAluno} validationBehavior='native'>
            <div className='flex justify-between w-full gap-5'>
              <Input 
                className='h-[30px]'
                type='text'
                isRequired
                label='Nome'
                name='nome'
                value={aluno.nome}
                onValueChange={setNome}
              />
              <Input
                className='h-[30px]'
                type='text'
                isRequired
                label='Sobrenome'
                name='sobrenome'
                value={aluno.sobrenome}
                onValueChange={setSobrenome}
              />
            </div>
            <DatePicker 
                label="Data de nascimento"
                name='nascimento'
                showMonthAndYearPickers
                isRequired
                value={parseDate(aluno.nascimento)}
                onChange={setNascimento}
              />
            <Select isRequired label={'Turma'} name='turma' onChange={setTurma} value={aluno.turma} className='h-[40px]'>
              {turmas.map(turma => (
                <SelectItem key={turma.turma}>{`Turma: ${turma.turma} Dia: ${getDiaCompleto(turma.dia)}`}</SelectItem>
              ))}
            </Select>
            <Textarea 
              label='Observação'
              onValueChange={setObservacao}
              value={aluno.observacao}
              className='overflow-scroll h-[6rem]'
            />
            <Button type="submit" className='bg-lightbrown text-white font-bold text-[1.1rem]'>Salvar</Button>
          </Form>
          <Button isIconOnly className='rounded-full relative bottom-0 right-0 absolute bottom-0 md:bottom-reset md:top-0 md:right-0 m-5' onPress={() => setTelaEditar(false)}>
            <IoMdClose className='h-[80%] w-[80%]' />
          </Button>
        </div>}
      </div>
    </div>
  );
}