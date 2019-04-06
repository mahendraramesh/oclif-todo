import {Command, flags} from '@oclif/command'
import todoAPI from '../api/todoAPI'
import * as inquirer from 'inquirer'

export default class Interact extends Command {
  static description = 'Interacting mode'

  async run() {
    const todos = todoAPI.list()
    const todosCp = todos

    const prompt : any = await inquirer.prompt([
      {
        type: 'checkbox',
        message: 'Update todo',
        name: 'todos',
        choices: todosCp.map(todo => {
          return { name: todo.todo, checked: todo.done }
        })
      }
    ])

    const selectedTodos = prompt.todos

    todos.forEach((todo, index) => {
      if(selectedTodos.indexOf(todo.todo) !== -1) {
        todoAPI.done(index)
      } else {
        todoAPI.undone(index)
      }
    })
  }
}
