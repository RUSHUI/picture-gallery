Gallery By React
=====
a react project

clone项目到本地后，首先安装依赖，通过npm命令安装
```
npm install
```
这个命令的执行依赖网络，所以需要一些时间。

若成功运行完毕，使用下面命令启动项目

npm start  启动项目，启动之后,脚本命令会自动启动浏览器打开该网址浏览程序 [`http://localhost:8000/webpack-dev-server/`](http://localhost:8000/webpack-dev-server/)

本项目是根据[`慕课网《React实战》课程`](http://www.imooc.com/learn/507)完成的该项目，主讲老师materliu是一个非常热心的前端开发者。特别感谢他

他分享的demo [`画廊应用`](http://materliu.github.io/gallery-by-react/)

materliu的开源开发项目：[`画廊项目项目开源地址`](https://github.com/materliu/gallery-by-react)

若遇到node-sass模块未找到，请尝试
```node
SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/
npm install node-sass --save-dev
```
或者
```node
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
安装cnpm工具然后通过下面cnpm命令安装node-sass
```
cnpm install  node-sass --save-dev
```

本项目是基于node v6.3.1开发的项目，由于讲师在制作课程的时候比较早，yeoman上react的generator还是使用grunt与webpack构建的项目和现在yeoman上react的generator构建工具webpack,去除了grunt之后有所不同，所以对于最初接触react的学生来说，还是蛮有压力的，我通过个下午的时间将使用最新版的react generator完成了该项目，供大家借鉴参考。
欢迎fork项目，若有问题欢迎[`邮箱联系`](mailto:tanpf2012@163.com)反馈问题
