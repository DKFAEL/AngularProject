import path from 'path'
import { observable, Observable } from 'rxjs'
import fs from 'fs'

const filePaths: string[] = [
  path.join(__dirname, 'files', 'app_1.txt'),
  path.join(__dirname, 'files', 'app_2.txt'),
  path.join(__dirname, 'files', 'app_3.txt'),
  path.join(__dirname, 'files', 'app_4.txt'),
  path.join(__dirname, 'files', 'estilo_1.css'),
  path.join(__dirname, 'files', 'estilo_2.css'),
  path.join(__dirname, 'files', 'estilo_3.css'),
  path.join(__dirname, 'files', 'estilo_4.css'),
  path.join(__dirname, 'files', 'estrutura_1.html'),
  path.join(__dirname, 'files', 'estrutura_2.html'),
  path.join(__dirname, 'files', 'estrutura_3.html'),
  path.join(__dirname, 'files', 'estrutura_4.html')
]

const isCSS = /^((.|#){0,1}(\w+-{0,1})+\s*{(\s*(\w+-{0,1})+:\s*(\w+\s*)+;\s*)+\s*}\s*)/i
const isHTML = /^<!DOCTYPE html>/i

function lerArquivos(arquivos: string[]) {
  /**
   * Observables são fontes de dados que enviam dados/informações de forma continua
   */

  /**
   * A classe Observables recebe como parâmetro uma função responsavel pela
   * geração dos dados que o Observable enviará
   */
const leitor = new Observable<string>((subscriber) => {

  /**
   * o método forEach serve para fazer um laço de repetição
   * dentro de um array
   */

arquivos.forEach((arquivo)=> {
  /**
   * readFileSync fará a leitura de um arquivo a partir do caminho desse 
   * arquivo no seu computador
   */
const conteudo = fs.readFileSync (arquivo, {encoding:'utf8'})
subscriber.next(conteudo) // Responsavel por mandar a mensagem de sucesso
//subscriber.error() // Responsavel por mandar a mensagem de erro
//subscriber.complete() // responsavel por mandar a mensagem de completo
/**
 * --> Envio de Dados do Observable <--
 * 
 * 3 ESTÁGIOS
 *   -> Sucesso: O Observable conseguiu realizar seu trabalho sem nenhum problema
 *               e enviou os dados com sucesso
 * 
 *      -> Erro: O observable teve algum problema durante a sua execução e não conseguiu
 *              realizar sua tarefa de maneira satisfatoria e  não conseguiu enviar os dados
 *              Quando um observable  passa pelo estágio  de erro, sua execução para automaticamente
 * 
 *     -> Completo: O Observable realizou TODAS as suas tarefas com sucesso e não possui
 *                  mais nenhum dado para poder enviar.
 */
})
})
return leitor
}

let obs = lerArquivos(filePaths)

obs.subscribe(

  (conteudoLido) => {
    console.log('--------- ARQUIVO LIDO COM SUCESSO ----------')
    console.log(conteudoLido)
    console.log('---------------------------------------------\n\n')
  }
)


obs.subscribe(
  (conteudoLido) => {
    console.log (`Este arquivo possui ${conteudoLido.length} caracteres`)
  }
)