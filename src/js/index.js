import Vue from 'vue';//node_modulesにあり.vueのpackage.jsonのmainに書いてあるものをインポートする、vue.runtime.common.jsが書いてありそこには Vue インスタンスの作成やレンダリング、仮想 DOM の変更などのためのコードが書いてある。
import VueRouter from 'vue-router';

// import routes from 'TodoRouterDir/routes';//ルーティングの定義がされているroutes.jsを呼び出し
import routes from 'TodoVuexDir/routes';
import store from 'TodoVuexDir/store';
// import routes from 'VuexSample/routes';
// import store from 'VuexSample/store';

import '../scss/global.scss';//reset.scssとbase.scssの読み込み

// import myApp from './first';
// import myApp from 'TodoDir';//src/js/todoを読み込み,ディレクティブ
// import myApp from 'TodoRouterDir';
import myApp from 'TodoVuexDir';
// import myApp from 'VuexSample';

Vue.use(VueRouter);//Vue.js用に作られたプラグイン(VueRouter)を使うための記述
const router = new VueRouter({//ルーティング用のインスタンスの生成時に渡す引数
  routes,//オブジェクトでインポートしてきたルートの設定が書かれている配列
  mode: 'history',//historyのほかにhashもしくはabstract.hashだとURLに＃がつく。historyだと#がなくなるがAPIとサーバーの設定が必要で古いブラウザでは対応してないのもある。 ，ユーザが直接 URL で検索した時や、リロードをした際に、サーバーからは エラー が返ってきてしまうのでwebpackファイルで設定する。abstractは全てのJavaScriptの環境で動作する。
});

new Vue({
  el: '#app',//vueインスタンスをindex.htmlの<id=app>の部分でマウントしている
  router,//vueインスタンス生成時にルーティングのインスタンスを指定
  store,
  render: h => h(myApp),//描画関数でmyAppを描画する
  // render: h => h(myApp), は↓の書き方を短くしたもの
  // render: function (createElement) {
  //   return createElement(myApp)
  // }
});
