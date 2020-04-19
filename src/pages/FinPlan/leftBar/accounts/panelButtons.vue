<template>
  <div>
    {{visibility}}
    <v-card 
    >
      <v-btn-toggle 
      >
        <v-btn
        v-for="(button, i) in this.lMbuttons"
        :key="i"
        fab 
        :to="button.link"
        @click="leftPanelButtons(button.click)"
        >
          <v-icon>{{button.icon}}</v-icon>
        </v-btn>

        <v-btn
        fab 
        @click="changeVisibility()"
        >
          <v-icon
          v-if="visibility"
          >mdi-eye-off
          </v-icon>
          <v-icon
          v-if="!visibility"
          >mdi-eye-settings-outline
          </v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-card>
  </div>
</template>
<script>
import fp_state from '@/state/fp_state'

export default{
  mixins:[fp_state],
  methods:{
    changeVisibility(){
      this.visibility = !this.visibility
      this.counter++
    }
  }
}
</script>
<style scoped>

</style>
