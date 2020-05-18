<template>
  <div>
    <div class="text-center d-flex">
      <v-btn @click="all">all</v-btn>
      <div>{{ panel }}</div>
      <v-btn @click="none">none</v-btn>
    </div>

    <v-expansion-panels
      v-model="panel"
      focusable
      multiple
      accordion
      flat
    >
      <v-expansion-panel
        v-for="(item,i) in items"
        :key="i"
        style="background: blue; text-color: red"
      >
        <v-expansion-panel-header
        class="grey white--text"
        >Header {{ item }}

        </v-expansion-panel-header>
        <v-expansion-panel-content
        style="background: blue; text: red"
        >
          {{item}}
        </v-expansion-panel-content>

      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        panel: [],
        items: 5,
      }
    },
    methods: {
      // Create an array the length of our items
      // with all values as true
      all () {
        this.panel = [...Array(this.items).keys()].map((k, i) => i)
      },
      // Reset the panel
      none () {
        this.panel = []
      },
    },
  }
</script>
