<template lang="html">
  <div>
    <div class="page-description">
      <p>Todo with Routing of vue-router</p>
    </div>
    <router-view /><!-- ルーティングの指定をしたファイルの「routes.js」を表示に反映.上記のコードはURLが変わろうが表示され続ける。 -->
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.page-description {
  padding: 10px 20px;
  text-align: right;
  p {
    display: inline-block;
    color: #333;
    font-size: 18px;
  }
}
</style>
