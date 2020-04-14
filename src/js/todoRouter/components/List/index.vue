<template lang="html">
  <ul class="todos__list">
    <!-- listItemを表示しつつtodosのidやtitleを渡している -->
    <app-list-item
      v-for="todo in todos"
      :key="todo.id"
      :todo-title="todo.title"
      :todo-detail="todo.detail"
      :todo-completed="todo.completed"
      @changeCompleted="$emit('changeCompleted', todo)"
      @showEditor="$emit('showEditor', todo)"
      @deleteTodo="$emit('deleteTodo', todo.id)"
    />
  </ul>
</template>

<script>
import ListItem from 'TodoRouterDir/components/ListItem';

export default {
  components: {
    appListItem: ListItem,
  },
  //containersからtodosを受け取っている
  props: {
    todos: {
      type: Array,//todosの型の指定
      default: () => [],//デフォルトの値の指定
    },
  },
};
</script>
