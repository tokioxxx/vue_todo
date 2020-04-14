import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {//データを格納してある場所。
    todos: [],
    todoFilter: '',
    targetTodo: {
      id: null,
      title: '',
      detail: '',
      completed: '',
    },
    errorMessage: '',
    emptyMessage: '',
  },
  getters: {//state のデータを加工して表示したいときに使用.依存する値に変更があった場合に行われる.computedとタイミングは同じだがcomputedだとそのコンポーネントでしか動かないが、gettersだどstoreを参照しているので他のコンポーネントからも利用できる。
    completedTodos: (state) => state.todos.filter((todo) => todo.completed),//stateを引数で持ってきてcompletedのtodoの配列を作り、変数に入れている
    incompleteTodos: (state) => state.todos.filter((todo) => !todo.completed),
    completedTodosLength: (state, getters) => getters.completedTodos.length,//completedTodosの数を変数に入れている。フッターで取得して数を表示している。
    incompleteTodosLength: (state, getters) => getters.incompleteTodos.length,
  },
  mutations: {//ストア内を変更する処理をかく、同期的な処理だけを扱うことが特徴
    setTodoFilter(state, routeName) {//routeNameを取得
      state.todoFilter = routeName;
    },
    setEmptyMessage(state, routeName) {//対象のrouteNameを取得しエラーメッセージをemptyMessageに代入
      if (routeName === 'completedTodos') {
        this.state.emptyMessage = '完了済みのやることリストはありません。';
      } else if (routeName === 'incompleteTodos') {
        this.state.emptyMessage='未完了のやることリストはありません。';
      } else {
        this.state.emptyMessage = 'やることリストには何も登録されていません。';
      }
    },
    initTargetTodo(state) {//TargetTodoの初期化
      state.targetTodo = {
        id: null,
        title: '',
        detail: '',
        completed: false,
      };
    },
    hideError(state) {//エラーメッセージの初期化
      state.errorMessage = '';
    },
    showError(state, payload) {//actionでshowErrorがコミットされ引数が返ってきたらerrorMessageに代入、なくてエラーの場合は文字を代入
      if (payload) {
        const errorMessage = payload.data;
      } else {
        state.errorMessage = 'ネットに接続がされていない、もしくはサーバーとの接続がされていません。ご確認ください。';
      }
    },
    updateTargetTodo(state, { name, value }) {//targetTodoの更新
      state.targetTodo[name] = value;
    },
    getTodos(state, payload) {
      state.todos = payload.reverse();//返ってきたデータをstateに後ろから代入
    },
    addTodo(state, payload) {
      state.todos.unshift(payload);//返ってきたデータをstateに追加
    },
    showEditor(state, payload) {
      state.targetTodo = Object.assign({}, payload);//返ってきたデータをtargetTodoと置き換える
    },
    editTodo(state, payload) {
      state.todos = state.todos.map((todoItem) => {//対象のidと同じ場合返ってきたデータを代入違う場合todoItemを代入
        if (todoItem.id === payload.id) return payload;
        return todoItem;
      });
    },
  },
  actions: {//非同期な処理を行えるのでthenが使える。storeにアクセスできる.アクションがあることで、アクション内で非同期処理を完了させてからコミットを行うことができるようになる。非同期な処理(state内を直接変更しない処理)を行う。
    setTodoFilter({ commit }, routeName) {
      commit('setTodoFilter', routeName);//(呼び出す関数,mutationで使う値)
    },
    setEmptyMessage({ commit }, routeName) {
      commit('setEmptyMessage', routeName);
    },
    updateTargetTodo({ commit }, { name, value }) {
      commit('updateTargetTodo', { name, value });
    },
    getTodos({ commit }) {
      // const targetTodo = Object.assign({}, todo);
      // axios.delete(`http://localhost:3000/api/todos/${targetTodo.id}`).then(({ data }) => {
      //   console.log(data);
      //   commit('getTodos', data.todos);
      // },
      axios.get('http://localhost:3000/api/todos/').then(({ data }) => {
        commit('getTodos', data.todos);
      }).catch((err) => {
        commit('showError', err.response);
      })
    },
    addTodo({ commit, state }) {
      if (!state.targetTodo.title || !state.targetTodo.detail) {
        commit({
          type: 'showError',
          data: 'タイトルと内容はどちらも必須項目です。',
        });
        return;
      }
      const postTodo = Object.assign({}, {
        title: state.targetTodo.title,
        detail: state.targetTodo.detail,
      });
      axios.post('http://localhost:3000/api/todos/', postTodo).then(({ data }) => {
        commit('addTodo', data);
      }).catch((err) => {
        commit('showError', err.response);
      });
      commit('initTargetTodo');
    },
    changeCompleted({ commit }, todo) {
      const targetTodo = Object.assign({}, todo);
      axios.patch(`http://localhost:3000/api/todos/${targetTodo.id}`, {
        completed: !targetTodo.completed,
      }).then(({ data }) => {
        commit('editTodo', data);
      }).catch((err) => {
        commit('showError', err.response);
      });
      commit('initTargetTodo');
    },
    showEditor({ commit }, todo) {
      commit('showEditor', todo);
    },
    editTodo({ commit, state }) {
      const targetTodo = state.todos.find(todo => todo.id === state.targetTodo.id);
      if (
        targetTodo.title === state.targetTodo.title
        && targetTodo.detail === state.targetTodo.detail
      ) {
        commit('initTargetTodo');
        return;
      }
      axios.patch(`http://localhost:3000/api/todos/${state.targetTodo.id}`, {
        title: state.targetTodo.title,
        detail: state.targetTodo.detail,
      }).then(({ data }) => {
        commit('editTodo', data);
      }).catch((err) => {
        commit('showError', err.response);
      });
      commit('initTargetTodo');
    },
      deleteTodo: function({ commit },todo) {
       const targetTodo = Object.assign({}, todo);//変数targetTodoとクリックした対象のTodoと置き換える
        axios.delete(`http://localhost:3000/api/todos/${targetTodo.id}`).then(({ data }) => {
        console.log(data);//対象のTodoのデータが削除されたTodoが返ってくる。
        commit('getTodos', data.todos);//返ってきたデータをmutationsのgetTodosを使いstoreのtodosと置き換える。
      }).catch((err) => {
        commit('showError', err.response);
      });
      commit('initTargetTodo');//targetTodoを空にする必要があれば処理

    },
  },
});

export default store;


