<template>
  <div class="child">

    <h3>这里是子组件</h3>

    <slot  :data="test"></slot>
  </div>
</template>

<script>
export default {
  data: function(){
    return {
      test:123123
    }
  },
  computed: {

  },
  methods:{

  },
  components: {

  }
}
</script>

<style scoped>
</style>
