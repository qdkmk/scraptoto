<template>
<div class="container">
  <div class="targetPagesListWrapper">
    <ul v-for="targetPage in targetPages" :key="targetPage.targetPageName">
      <li class="targetPageList" v-on:click="targetPage.active = !targetPage.active" v-bind:class="{ active: targetPage.active }">
        {{ targetPage.targetPageName }}
      </li>
    </ul>
    <button class="targetPageListAdd" v-on:click="addPageModal = !addPageModal ">+</button>
  </div>
  <div v-if="addPageModal" class="addPage">
    <form class="add-form" @submit.prevent="addPage">
      <input class="input" type="text" v-model="addPageModalTmp" placeholder="ページ名">
      <button class="submit" type="submit">Add</button>
    </form>
  </div>

  
  <form name="search" class="search-form" @submit.prevent="request">
    <input class="input" type="text" v-model="boxword" placeholder="検索ワードを入力してください。">
    <button class="submit" type="submit">Go</button>
  </form>

  <div class="pageWrapper" v-for="targetPage in targetPages" :key="targetPage.targetPageName">
    <div v-if="targetPage.active">
      <Project :projectitem="targetPage.items" />
    </div>
  </div>

</div>
</template>

<script>
import Project from './Project.vue'
export default {
  components: {
    Project
  },
  data: function() {
    return {
      targetPages: [],
      boxword: "",
      addPageModal: false,
      addPageModalTmp: "",
    }
  },
  computed: {},
  created(){
    //setTargetPages
    if(localStorage.getItem("targetPages")){
      let localdata = JSON.parse(localStorage.getItem("targetPages"))
      for (let l of localdata){
        this.targetPages.push(l)
      }
    }
  },
  methods: {
    request() {
      document.activeElement.blur()
      for (let t of this.targetPages) {
        t.items = {}
        if (t.active === true) {
          this.$axios.get('/hello', {
              params: {
                pages: t.targetPageName,
                searchword: this.boxword
              },
            })
            .then(function(res) {
              let pageitems = {
                pagename: t.targetPageName,
                contents: res.data.message.pages
              }
              t.items = pageitems
            });
        }
      }
    },
    addPage() {
      if(this.addPageModalTmp!=""){
        this.targetPages.push({
          targetPageName: this.addPageModalTmp,
          active: true,
          items: {}
        })
        this.addPageModal = !this.addPageModal
        this.addPageModalTmp=""
        localStorage.setItem("targetPages", JSON.stringify(this.targetPages))
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  text-decoration: none;
  color: #000;
}
.add-form{
  width: 50%;
  margin: auto;
  margin-bottom: 2rem;
}

.search-form {
  width: 50%;
  margin: auto;
}

@media screen and (max-width: 480px) {
  .add-form{
    width: 100%
  }
  .search-form {
    width: 100%
  }
}

.input {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  background-image: none;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 3px;
  color: inherit;
  font-family: inherit;
  font-size: 1em;
  padding: 0.4em 0.8em;
  width: 70%;
}

.input:focus {
  border: 1px solid #42b983;
  box-shadow: none;
  outline: none;
}

.submit {
  -webkit-appearance: none;
  background-color: #42b983;
  background-image: none;
  border: none;
  border-radius: 0;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 1em;
  margin: 0 0 1em;
  padding: 0.6em;
  text-decoration: none;
  border-radius: 3px;
}

.targetPagesListWrapper {
  display: flex;
  flex-flow: wrap;
  justify-content: center;
}

.targetPageList {
  background-color: #919191;
  color: #fff;
  border-radius: 3px;
  padding: 0.5rem;
}

.active {
  background-color: #42b983;
}

.targetPageListAdd {
  background-color: #919191;
  color: #fff;
  border-radius: 3px;
  padding: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.pageWrapper {}
</style>
