<template>
  <div
    class="d-flex flex-wrap"
  >
    <v-card class="card card1">
      <template v-if="!lineText" >

        <v-chip
          class="ma-1"
          color="green"
          dense
          dark
          outlined
          label
        >
          <h1 v-show="visibility"
            :class="{'uppercase': upperCase}"
            @click="checkToClipboardText($data.thirdName)"
          ><span class="title black-text">Фамилия: </span>{{thirdName}}</h1>
          <h1 v-show="!visibility"
            @click="checkToClipboardText($data.thirdName)"
          ><span class="title">Фамилия: </span>**********</h1>
        </v-chip>
        <v-chip
        class="ma-1"
        color="success"
        outlined
        label
        >
          <h1 v-show="visibility"
            :class="{'uppercase': upperCase}"
            @click="checkToClipboardText($data.firstName)"
          ><span class="title">Имя: </span>{{firstName}}</h1>
          <h1 v-show="!visibility"
            @click="checkToClipboardText($data.firstName)"
          ><span class="title">Имя: </span>**********</h1>
        </v-chip>
        <v-chip
          class="ma-1"
          color="success"
          outlined
          label
        >
          <h1 v-show="visibility"
            :class="{'uppercase': upperCase}"
            @click="checkToClipboardText($data.secondName)"
          ><span class="title">Отчество: </span>{{secondName}}</h1>
          <h1 v-show="!visibility"
            @click="checkToClipboardText($data.secondName)"
          ><span class="title">Отчество: </span>**********</h1>
        </v-chip>
      </template>
      <template v-if="lineText">
        <v-chip
         class="ma-2"
          color="success"
          outlined
          label
        >
          <h1 v-show="visibility"
            :class="{'uppercase': upperCase}"
            @click="checkToClipboardText(thirdName + ' ' + firstName + ' ' + secondName)"
          >{{thirdName}} {{firstName}} {{secondName}}
          </h1>
          <h1 v-show="!visibility"
            @click="checkToClipboardText(thirdName + ' ' + firstName + ' ' + secondName)"
          >********* ********* *********
          </h1>
        </v-chip>
      </template>
    </v-card>
  
    <v-card 
      class="card text-center"
    >
      <v-chip 
        class="ma-1"
        color="green"
        dense
        dark
        outlined
        label
      >
        <h2 
          
          v-show="visibility"
          :class="{'uppercase': upperCase}"
          @click="checkToClipboardText($data.birthDate)"
        >{{birthDate}}</h2>
        <h1 v-show="!visibility"
          @click="checkToClipboardText($data.birthDate)"
        >**********</h1>
        
      </v-chip>
      <v-chip 
        class="ma-1"
        color="green"
        dense
        dark
        outlined
        label
      >
        <h3 
          
          v-show="visibility"
          :class="{'uppercase': upperCase}"
          @click="checkToClipboardText($data.zodiac)"
        >{{zodiac}}</h3>
        <h1 v-show="!visibility"
          @click="checkToClipboardText($data.zodiac)"
        >**********</h1>
        
      </v-chip>
      <v-chip 
        class="ma-1"
        color="green"
        dense
        dark
        outlined
        label
      >
        <h3 
          
          v-show="visibility"
          :class="{'uppercase': upperCase}"
          @click="checkToClipboardText($data.age)"
        >{{age}}</h3>
        <h1 v-show="!visibility"
          @click="checkToClipboardText($data.age)"
        >**********</h1>
        
      </v-chip>
      <v-chip
        class="ma-1"
        color="green"
        dense
        dark
        outlined
        label
    >
      <v-icon left>mdi-gift</v-icon>
      <h3>через 98 дней</h3>
    </v-chip>
    
    </v-card>
    <v-card 
      class="card"
    >Скопировано: {{copiedToClipboard}}
    </v-card>
  </div>   
</template>

<script>
import CopyToClipboard from '@/store/ChangeButtons/CopyToClipboard.js'
export default {
  components: {
  },
  mixins: [CopyToClipboard],
  computed: {
    upperCase(){
      return this.$store.getters.computedUpperCase
    },
    lineText(){
      return this.$store.getters.computedLineText
    },
    visibility(){
      return this.$store.getters.computedVisibility
    },
    copiedToClipboard(){
      return this.$store.getters.computedCopiedToClipboard
    }
  },
  data () {
    return {
      firstName: 'Андрей',
      secondName: 'Александрович',
      thirdName: 'Петров',
      birthDate: '05 февраля 1980г.',
      age: '26 лет',
      zodiac: 'Близнецы'    
    }
  },
}

</script>

<style scoped>

.card1{
  flex: 2
}
.card2{
  flex: 2
}
.card3{
  flex: 2;
}

</style>
