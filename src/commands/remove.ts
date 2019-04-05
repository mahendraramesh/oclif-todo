import {Command, flags} from '@oclif/command'
import todoAPI from '../api/todoAPI'
import chalk from 'chalk'

export default class Remove extends Command {
  static description = 'Remove a todo'

  static args = [{name: 'index'}]

  async run() {
    const {args} = this.parse(Remove)

    const index = args.index
    if(index) {
      const todo = todoAPI.get(index)
      todoAPI.remove(index)
      this.log(`${chalk.green('[Success]')} Removed todo: ${todo.todo}`)
    } else {
      this.log(chalk.red('Please specify the index of todo'))
    }
  }
}
