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

const convertDate = (rawDate: String) => {

}

</script>

<template>
  <div class="d-flex align-center flex-column">


    <div v-for="commit in commits">
      <div class="mt-4">
        <v-card width="400">
          <v-card-item>
            <v-card-title>{{ commit.commit.message }}</v-card-title>
            <v-card-subtitle>Commited at {{ commit.commit.author.date }}</v-card-subtitle>
          </v-card-item>
          <v-card-text>
            This is content
          </v-card-text>
        </v-card>

      </div>

    </div>
  </div>
</template>