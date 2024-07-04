/*
 * @Author: tuWei
 * @Date: 2023-02-08 17:42:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-11 14:21:42
 */
import path from 'node:path';
import fs from 'node:fs';
import * as cheerio from 'cheerio';
import { marked } from 'marked';
import download from 'download';
// const fs = require('fs');
// var path = require('path');
// const cheerio = require('cheerio');
// const marked = require('marked');
// const download = require('download');
/**
 * 下载图片
 * @param {} p 
 */
const getImages = (p)=>{
  const data = fs.readFileSync(path.join(p.path, p.filename) + '', 'utf8' );
  var $ = cheerio.load(marked.parse(data)); //如果是markdown格式
  // var $ = cheerio.load(data); //如果是html格式
  $('img').map(async function(i, e) {
    let url = $(this).attr('src');
    console.log('basename :>> ', path.basename(url));
    // url = path.join("http:\/\/127.0.0.1:3000", url);
    url = "http://127.0.0.1:3000/images/" + path.basename(url)
    console.log(url);
    try{
      download(url, 'images', {});
    }catch(e) {
      console.log(e)
    }
  })
}


/**
 * 获取文件列表
 * @param {} p 
 */
function readFileList(path, filesList, isDirectory) { //isFile 是否处理文件夹
  let menu = {
    text: path.split('/')[path.split('/').length - 2],
    collapsed: false,
    items: []
  };
  if(!isDirectory){
    filesList.push(menu);
  }
  var files = fs.readdirSync(path);
  files.forEach(function (itm, index) {
      var stat = fs.statSync(path + itm);
      if (stat.isDirectory() && isDirectory) {
      //递归读取文件
        readFileList(path + itm + "/", filesList, false)
      } else {
          var obj = {};//定义一个对象存放文件的路径和名字
          obj.path = path;//路径
          obj.filename = itm//名字
          if(!stat.isDirectory()){ //如果是文件就不加列表展示
            menu.items.push({
              'text': obj.filename.substr(0, obj.filename.lastIndexOf('.')),
              'link': "/docs/" + menu.text + '/' + obj.filename,
            });
          }
      }
  })
}

const handleRouteList = function (lists){
  const routerList = lists.map((file)=>{
    return {
      'text': file.filename.substr(0, file.filename.lastIndexOf('.')),
      'link': "/docs/docker/" + file.filename.substr(0, file.filename.lastIndexOf('.'))
    }
  })
  return routerList;
}

const getFilesList = function() {
  let lists = [];
  let routerList = [];
  readFileList('./src/docs/mysql/', lists, true);
  // routerList = handleRouteList(lists);
  console.log(lists);

  // // 下载图片
  // lists.forEach((file)=>{
  //   getImages( file );
  // });
}

//获取图片集合
getFilesList();