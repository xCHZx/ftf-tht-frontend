<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { getCommits } from '../services/Octokit'

onMounted(() => {
  getData()
})

const commits = ref();

const getData = async () => {
  commits.value = await getCommits()
}

const convertDate = (rawDate: Date) => {
  const date = new Date(rawDate)
  return date
}

const countFiles = (files: Object) => {
  console.log(files)
}

</script>

<template>
  <div class="d-flex align-center flex-column">
    <v-timeline>
      <v-timeline-item v-for="commit in  commits " size="large">
        <template v-slot:icon>
          <v-avatar :image="commit.author.avatar_url"></v-avatar>
        </template>
        <template v-slot:opposite>
          <span>Commited by {{ commit.commit.author.name }}</span>
          <div class="text-caption">@ {{ convertDate(commit.commit.author.date) }}</div>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="text-h5">
            {{ commit.commit.message }}
          </v-card-title>
          <v-card-text>
            <div>{{ countFiles(commit) }} Archivos afectados</div>
            <a target="blank" :href="commit.html_url"> Ver en GitHub</a>
            <div>
              <v-btn variant="tonal" size="small" class="mt-3">
                Más información
              </v-btn>
            </div>


          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>