import os from 'os';
import { appendFile } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const promisifiedExec = promisify(exec);
const promisifiedAppendFile = promisify(appendFile);

const EXECUTE_COMMAND_DELAY = 100;
const LOG_TO_FILE_DELAY = 60000;
const LOG_FILE_NAME = 'activityMonitor.log';

const logs: string[] = [];
const intervalTimeouts: NodeJS.Timeout[] = [];

function getCommand(): string | null {
  const platform = os.platform();
  switch (platform) {
    case 'win32':
      return "powershell \"Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }\"";
    case 'linux':
    case 'darwin':
      return 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
    default:
      return null;
  }
}

async function executeCommand(command: string) {
  try {
    const { stdout } = await promisifiedExec(command);

    const data = stdout.trim();
    process.stdout.write(`\r${data}`);

    logs.push(`${Date.now()}: ${data}`);
  } catch (error) {
    console.error(error);
  }
}

async function logToFile(fileName: string) {
  if (!logs.length) {
    return;
  }

  const data = `${logs.join(os.EOL)}${os.EOL}`;
  logs.length = 0;

  try {
    await promisifiedAppendFile(fileName, data);
  } catch (error) {
    console.error(error);
  }
}

function scheduleCommandExecution(
  command: string,
  executeCommandDelay = EXECUTE_COMMAND_DELAY,
  logToFileDelay = LOG_TO_FILE_DELAY,
  logFileName = LOG_FILE_NAME,
) {
  const executeCommandTimeout = setInterval(executeCommand, executeCommandDelay, command);
  const logToFileTimeout = setInterval(logToFile, logToFileDelay, logFileName);

  intervalTimeouts.push(executeCommandTimeout, logToFileTimeout);
}

process.on('exit', () => {
  intervalTimeouts.forEach((timeout) => clearInterval(timeout));
});

export default function run() {
  const command = getCommand();
  if (!command) {
    process.stderr.write('Unsupported platform');
    process.exit(1);
  }

  scheduleCommandExecution(command);
}
