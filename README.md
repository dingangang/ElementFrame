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
框架中综合了Vue.js全家桶。UI组件启用的ElementUI。ElementUI已经按照按需引入配置（避免某些风险），如果仅仅是写demo用可以按照全部引入的方式配置。

配置均已完善，对照ElementUI库使用即可。eslint采用的是标准的配置，推荐按照标准配置编写代码。

整个项目中仅做了基本的配置，有其他的要求请自行拓展。

### Spritesmith 
启用了方便的雪碧图。

icons请放在static/icons文件夹中。

对应的Spritesmith配置在build/webpack.dev.conf.js中。部分注释了的内容时是适配移动端的雪碧图生成配置。请按需修改。

在assets的handler中css.handlebars是配置雪碧图的模板。

