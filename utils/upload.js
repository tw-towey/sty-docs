/*
 * @Author: tuWei
 * @Date: 2023-02-10 22:09:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-18 14:30:16
 */
const OSS = require('ali-oss')
const fs = require('fs')
const path = require("path")
// const compressing = require('compressing');
const config = require('./config.js')


const client = new OSS({
    region: 'oss-cn-beijing',//地域节点
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    bucket: 'alyui'//域名 	oss-cn-beijing.aliyuncs.com
});

async function putOSS (src, dist) {
  try {
    client.put(dist, src);
  } catch (e) {
    console.log(e);
  }
}
// src上传本地目录， dist远程文件目录（oss）
function addFileToOSSSync(src, dist){
    var docs = fs.readdirSync(src);
    docs.forEach(function(doc){
        if(doc === 'images'){
          return;
        }
        var _src = src + '/' + doc,
            _dist = dist + '/' + doc;
        var st = fs.statSync( _src);
            // 判断是否为文件
        if( st.isFile() && doc !== '.DS_Store' ){
            putOSS(_src, _dist);
            // console.log(_src, _dist)
        }
        // 如果是目录则递归调用自身
        else if( st.isDirectory() ){
            // console.log(_src+'是文件夹')
            addFileToOSSSync( _src, _dist);
        }
    })
}

//记录还是时间
let startNow = Date.now();
console.log('正在开始上传文件....');

const dirList = path.join(__dirname,  '../towey-blogs');
//处理文件夹
addFileToOSSSync(dirList, 'towey-blogs');

//上传zip
// putOSS(dirList, 'nodejs.zip');
//folder为自定义要压缩的文件夹
// compressing.zip.compressDir(dirList, dirList + '.zip')
// .then(() => {
//   console.log('ok');
//   // putOSS(dirList, 'xxx.zip');
// })
// .catch(err => {
//     console.log(err);
//     return
// });

process.on("exit",function(code){
  let now = Date.now();
  console.log("文件上传完成了...., 用时: ", (now - startNow) / 1000 + 's');
});


