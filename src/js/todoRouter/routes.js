import Todos from 'TodoRouterDir/containers/Todos';//ページを構成している表示したいファイルをインポート

const routes = [
  {
    name: 'allTodos',//コンポーネントのnameと紐付けることが可能.setFilter()で使用している。
    path: '/',//パスが/のときにインポートしたページ（Todos）を表示する.同じTodosでもURLによって中身を変えて表示している。
    component: Todos,//表示したいページ
  },
  {
    name: 'completedTodos',
    path: '/completed',
    component: Todos,
  },
  {
    name: 'incompleteTodos',
    path: '/incomplete',
    component: Todos,
  },
];

export default routes;
