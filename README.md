# frame

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

# 说明
vue-cli 3.0 改变了整体的目录结构，更简洁和清晰，views文件夹中存放视图，components文件夹中存放组件。

### element-ui
之前按需引入element-ui出现了某个组件无法找到的情况，所以直接全部引入。element-ui提供了配合vue-cli 3.0 的插件，已经安装好，直接按照官网组件使用即可。

### webpack-spritesmith
采用了雪碧图，vue-cli 3.0 中，public取代了原来的static，将小图标文件放入 public/images/icons之后，会自动编译和生成
src/assets/sprite.png 和 src/css/sprite.scss 
本次生成的sprite.scss 中全部都是 mixin 类型，在需要使用图标的地方的类名中@include mixin()即可，对应mixin的名称为：
mix-iconName()

### mock
拦截请求信息，并返回随机的数据，具体用法请参考官网。这是为了在后端接口尚未完成时候前端可以进行独立的开发，仅在开发环境中可以使用。

### proxy跨域
vue.config.js中配置了跨域，请按具体需求使用。

### CSS结构
main.js为主入口，请拆分各组件分别引入
