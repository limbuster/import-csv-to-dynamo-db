
const program = require('commander');

function getArgs() {
  const args = {};
  program
    .version('0.1.0', '-v, --version')
    .arguments('<file>')
    .option('-t, --table [table]', 'Specify the table that you want to import the CSV file to')
    .action((file) => {
      args.file = file;
    })
    // .option('-p, --profile [profile]', 'Specify the profile to be deleted')
    .parse(process.argv);

  if (!program.table) {
    program.outputHelp();
    process.exit(1);
  }

  return Object.assign(args, { table: program.table });
}

module.exports = getArgs;
