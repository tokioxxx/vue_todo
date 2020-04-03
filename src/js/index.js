import Vue from 'vue';//node_modulesにあり.package.jsonのmainに書いてあるものをインポーとする、vue.runtime.common.jsが書いてありそこには Vue インスタンスの作成やレンダリング、仮想 DOM の変更などのためのコードが書いてある。
// import VueRouter from 'vue-router';

// import routes from 'TodoRouterDir/routes';
// import routes from 'TodoVuexDir/routes';
// import store from 'TodoVuexDir/store';
// import routes from 'VuexSample/routes';
// import store from 'VuexSample/store';

import '../scss/global.scss';//reset.scssとbase.scssの読み込み

// import myApp from './first';
import myApp from 'TodoDir';//src/js/todoを読み込み
// import myApp from 'TodoRouterDir';
// import myApp from 'TodoVuexDir';
// import myApp from 'VuexSample';

// Vue.use(VueRouter);
// const router = new VueRouter({
//   routes,
//   mode: 'history',
// });

new Vue({
  el: '#app',//index.htmlで<id=app>の部分がVueの領域として認識される
  // router,
  // store,
  render: h => h(myApp),//描画関数でmyAppを描画する
  // render: h => h(myApp), は↓の書き方を短くしたもの
  // render: function (createElement) {
  //   return createElement(myApp)
  // }
});
