<template>
  <div class="father">
    <h3>这里是父组件</h3>
    <!--第一次使用：用flex展示数据-->
    <child >
      <template slot-scope="test01">
      {{test01.data}}
      </template>

    </child>

    <child >
      <template slot-scope="test01">
        {{test01}}
      </template>
    </child>
  </div>
</template>

<script>
import Child from './children.vue'
export default {
  data: function () {
    return {
      msg: '',
    }
  },
  methods: {
    clickHandler(data){
      console.log(data);
    }
  },
  components:{
    'child': Child
  }
}
</script>

<style scoped>
.father{
  width:100%;
  background-color: #ccc;
  height: 650px;
}
.tmpl{
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  width: 30%;
  margin: 0 auto;
}
.tmpl span{
  border:1px solid red;
  height:50px;
  line-height: 50px;
  padding: 10px;
}
</style>
