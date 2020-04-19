<template>
  
<v-card 
        class="card"
      >
        <v-btn-toggle 
        multiple
        >
          <v-btn  
          @click="changeLineText"
          >
            <v-icon>mdi-drag-horizontal-variant</v-icon>
          </v-btn>
          


          <v-btn 
          @click="changeUpperCase"
          >
            <v-icon>mdi-format-size</v-icon>
          </v-btn>

          <v-btn 
          @click="changeVisibility"
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
          <v-btn>
            <v-icon>mdi-lead-pencil</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-printer</v-icon>
          </v-btn>
        </v-btn-toggle>
    </v-card>
</template>

<script>
  export default{
    computed:{
      visibility(){
      return this.$store.getters.computedVisibility
    }

    },
    methods:{
      copyToClipboard(text) {
        this.$copyText(text).then(() => {
          this.snackColor = 'success',
          this.copyToClipboardText = 'Сохранено успешно!'
          this.copyToClipboarded = true
        }, () => {
          this.snackColor = 'red lighten-1',
          this.copyToClipboardText = 'Не удалось сохранить(:'
          this.copyToClipboarded = true
        })
      },
      changeUpperCase() {
        this.$store.commit('changeUpperCase', {
        })
      },
      changeLineText() {
        this.$store.commit('changeLineText', {
        })
      },
      changeVisibility() {
        this.$store.commit('changeVisibility', {
        })
      }
  }
  }
</script>
