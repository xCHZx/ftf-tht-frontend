<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';

onMounted(() => {
  getData()
  console.log("hola");
})



const data = ref();

const getData = async () => {
  await axios.get('https://api.github.com/repos/xCHZx/ftf-tht-frontend/commits/7283418fb0ef7d61f6c3a95896fd8f853f506b3e').then(res => {
    data.value = res.data;
  })
}

</script>

<template>
  <div class="d-flex align-center flex-column">

    <div class="text-subtitle-2">With props</div>

    <v-card width="400" title="This is a title" subtitle="This is a subtitle" text="This is content"></v-card>

    <div class="mt-4 text-subtitle-2">With slots</div>

    <div v-for="item in data">
      <h1>Prueba for</h1>
    </div>

    <v-card width="400">
      <template v-slot:title>
        This is a title
      </template>

      <template v-slot:subtitle>
        This is a subtitle
      </template>

      <template v-slot:text>
        This is content
      </template>
    </v-card>

    <div class="mt-4 text-subtitle-2">With markup</div>

    <v-card width="400">
      <v-card-item>
        <v-card-title>This is a title</v-card-title>

        <v-card-subtitle>This is a subtitle</v-card-subtitle>
      </v-card-item>

      <v-card-text>
        This is content
      </v-card-text>
    </v-card>
  </div>
</template>