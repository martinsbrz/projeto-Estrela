import { Button, ButtonGroup } from "@heroui/react";
import { useState } from "react";

export default function ListaAlunosChamada({alunosDaChamada, setAlunosDaChamada, data}) {
  const [informacoesAlunos, setInformacoesAlunos] = useState({});

  function getStatus(nome) {
    const dbContent = sessionStorage.getItem('dbTurmasChamadas');
    if (dbContent) {
      const chamadas = JSON.parse(dbContent);
      const aluno = chamadas.filter(item => {
        return item.nome === nome && item.data === data.toString();
      })[0];
      return aluno;
    } else {
      sessionStorage.setItem('dbTurmasChamadas', '[]');
    }
  }

  function adicionarStatus(aluno, novoStatus) {
    const informacoes = {
      nome: aluno.nome,
      sobrenome: aluno.sobrenome,
      turma: aluno.turma,
      inicio: aluno.inicio,
      status: novoStatus,
      data: data.toString()
    };
    informacoesAlunos[`${aluno.nome} ${aluno.sobrenome}`] = {...informacoes};
    setInformacoesAlunos(informacoesAlunos);
  }

  async function salvarStatus() {
    const dbContent = sessionStorage.getItem('dbTurmasChamadas');
    let chamadas = JSON.parse(dbContent);
    for (const[key, values] of Object.entries(informacoesAlunos)) {
      const informacaoExistente = chamadas.find(item => {
        return item.data === values.data && item.nome === values.nome;
      });
      if (!informacaoExistente) {
        chamadas.push(values);
        sessionStorage.setItem('dbTurmasChamadas', JSON.stringify(chamadas));
      } else {
        chamadas = chamadas.map(item => {
          if (item.data === values.data && item.nome === values.nome) {
            item = values;
          }
          return item;
        });
        sessionStorage.setItem('dbTurmasChamadas', JSON.stringify(chamadas));
      }
    }
    setInformacoesAlunos({});
  }

  return (
    <>
    <ul className="flex flex-col gap-3 w-[100%] flex-1 py-2 overflow-scroll">
      {alunosDaChamada.map((aluno) => {   
        const [presente, setPresente] = useState(false);
        const [ausente, setAusente] = useState(false); 
        return (
          <li className="w-full flex flex-col justify-between items-center">
            <div className="flex flex-col justify-center items-center">
              <p>{`${aluno['nome']} ${aluno['sobrenome']}`}</p>
              <p>{getStatus(aluno.nome) && getStatus(aluno.nome).status}</p>
            </div>
            <div className="md:flex md:gap-2">
              <ButtonGroup>
                <Button
                  className="text-white font-bold h-[20px]"
                  color='success'
                  onPress={() => {
                    adicionarStatus(aluno, 'Presente');
                    setPresente(true);
                    setAusente(false);
                  }}
                  isDisabled={ausente}
                >Presente</Button>
                <Button
                  className="text-white font-bold h-[20px]"
                  color="danger"
                  onPress={() => {
                    adicionarStatus(aluno, 'Ausente');
                    setPresente(false);
                    setAusente(true);
                  }}
                  isDisabled={presente}
                >Ausente</Button>
                <Button className="text-white font-bold h-[20px] bg-[gray]" onPress={() => {
                  setPresente(false);
                  setAusente(false);
                }}>Resetar</Button>
              </ButtonGroup>
            </div>
          </li>
        )
      })}
    </ul>
    <div className="flex items-center">
      <Button className="bg-lightbrown text-white font-bold text-[1.1rem] m-2" onPress={() => {
        salvarStatus();
        setAlunosDaChamada(undefined);
      }}>Salvar</Button>
    </div>
    </>
  )
}