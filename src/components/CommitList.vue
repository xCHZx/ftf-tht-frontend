<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { getCommits, getSingleCommit } from '../services/Octokit'

onMounted(() => {
  getData()
})

const commits = ref();
const singleCommit = ref();
const dialog = ref(false);

const getData = async () => {
  commits.value = await getCommits()
}

const getCommitData = async (sha: String) => {
  console.log(sha);
  singleCommit.value = await getSingleCommit(sha)
}

const convertDate = (rawDate: Date) => {
  const date = new Date(rawDate)
  return date
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
            <a target="blank" :href="commit.html_url"> See commit in Github</a>
            <div>
              <v-btn variant="tonal" size="small" class="mt-3" @click="dialog = true, getCommitData(commit.sha)">
                More Information
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>

  <v-dialog v-model="dialog" width="800" v-if="singleCommit">
    <v-card class="pt-5 pl-5 pr-5">
      <v-card-title>
        <!-- {{ singleCommit ? singleCommit.commit.message : 'Loading...' }} -->
        <h3><b>{{ singleCommit.commit.message }}</b></h3>
        <h6>Created by {{ singleCommit.commit.author.name }} @ {{ convertDate(singleCommit.commit.author.date) }}</h6>
        <h6 style="font-style:italic">#{{ singleCommit.sha }}<a target="blank" :href="singleCommit.html_url"> See commit
            in Github</a></h6>
      </v-card-title>
      <v-card-text>
        <b>Files Affected:</b> {{ Object.keys(singleCommit.files).length }}
        <v-expansion-panels class="mt-4">
          <v-expansion-panel style="width:min-content;" v-for="file in singleCommit.files" :key="file">
            <v-expansion-panel-title>📄{{ file.filename }}</v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row>
                <v-col cols="3">
                  <b>✅Additions:</b> {{ file.additions }}
                </v-col>
                <v-col cols="3">
                  <b>🗑️Deletions:</b> {{ file.deletions }}
                </v-col>
                <v-col cols="3">
                  <b>🔨Changes:</b> {{ file.changes }}
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>