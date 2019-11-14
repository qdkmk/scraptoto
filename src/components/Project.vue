<template>
<div class="project">
  
      <h2 class="pagename" >{{projectitem.pagename}}</h2>
      <div class="pageContents" v-for="content in projectitem.contents" :key="content.title">
        <a class="pageContentsLink" v-bind:href="'https://scrapbox.io/' + projectitem.pagename + '/' + content.title">
          <div class="content-image-wrapper">
            <img class="content-image" :src="content.image"/>
          </div>
          <div class="content-text">
            <h3 class="content-title">{{ content.title }}</h3>
            <p class="content-descriptions">{{ content.descriptions }}</p>
          </div>
        </a>
      </div>
  
</div>
</template>

<script>
export default {
  props:{
    projectitem:Object,
  },
  data: function() {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none;
  color: #000;
}

.project{
}
.pageContents{
  width: 80%;
  padding: 1rem;
  margin: 0.5rem auto;
  border-bottom: 1px solid #bfdddd;
  text-align: left;
}
@media screen and (max-width: 480px) {
  .pageContents{
    width: 90%;
  }
   }
.pageContentsLink{
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
}
.content-image-wrapper{
  width: 10%;
  position: relative;
}
.content-image{
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.pagename {
  font-size: 3rem;
  max-width: 100%;
  max-height: 100%;
}

.content-text{
  width: 85%;
}
.content-title {
  font-size: 1.2rem;
  font-weight: normal;
  line-height: 1.5;
  margin: 0;
}
.content-descriptions{
  line-height: 1.8;
  font-size: 0.8rem;
  word-break:break-all;
}
@media screen and (max-width: 480px) {
  .content-image-wrapper{
    width: 20%;
  }
  .content-text{
    width: 75%;
  }
  .content-title {
    font-size: 1rem;
  }
  .content-descriptions{
    font-size: 0.7rem
  }
   }



</style>
