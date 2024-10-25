import { exec } from 'node:child_process';
import {join} from "node:path"

const unfileUrl = join(process.env.USERPROFILE || process.env.HOME, './DeskTop/sty-docs/src/stydocs');
const macCommand = 'cp -rf ./src/stydocs /Volumes/Docker/nginx_work';
const destinationFolder = '\\\\192.168.1.16\\Docker\\nginx_work\\stydocs';
const winCommand = `robocopy "${unfileUrl}" "${destinationFolder}" /E /S`;

const platform = process.platform;

const execHandler = function(Command){
  // 统计拷贝代码执行开始时间
  const startTime = performance.now();
  
  // 执行命令
  exec(Command, (error, stdout, stderr) => {
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log('部署耗时 :>> ', executionTime);
    if (error) {
      console.error(`执行命令出错: ${error}`);
      return;
    }
    if(stdout){
      console.log("命令输出:", stdout);
    }
    if(stderr){
      console.log(stderr);
    }
  });
}

if (platform === 'darwin') {
  console.log('Mac OS');
  execHandler(macCommand);
} else if (platform === 'win32') {
  console.log('Win OS');
  execHandler(winCommand);
} else {
  console.log('Other');
}