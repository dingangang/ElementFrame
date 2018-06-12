# ElementFrame

> Vue+VueRouter+Vuex+Element-UI+Spritesmith

## 开始

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
## 简介
框架中综合了Vue.js全家桶。UI组件启用的ElementUI。ElementUI采用的是全局引入模式，如需修改成按需引入，请按官方指引修改。

配置均已完善，对照ElementUI库使用即可。如需禁用eslint，请自行配置。

整个项目中仅做了基本的配置，有其他的要求请自行拓展。

### Spritesmith 
启用了方便的雪碧图。

icons请放在static/icons文件夹中。

对应的Spritesmith配置在build/webpack.dev.conf.js中。部分注释了的内容时是适配移动端的雪碧图生成配置。请按需修改。

在assets的handler中css.handlebars是配置雪碧图的模板。

