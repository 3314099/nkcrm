<template>
  
<v-card 
        class="card RightButtons"
      >
        <v-btn-toggle 
        v-model="toggle_exclusive"
        mandatory
        >
            <v-tooltip bottom>
      <template v-slot:activator="{ on }">
          <v-btn  
          @click="changeCalendar"
          v-on="on"
          >
            <div class="img img-size">
            <img
            src="agenda.png"
            alt="Calendar"
            >
          </div>
          </v-btn>
      </template>
      <span>Календарь</span>
    </v-tooltip>


          <v-btn 
          @click="changeCalculator"
          >
            <div class="img img-size">
            <img
            src="calculator.png"
            alt="Calculator"
            >
          </div>
          </v-btn>
          <v-btn 
          @click="changeCurrency"
          >
            <div class="img img-size">
            <img
            src="reimbursement.png"
            alt="Currency"
            >
          </div>
          </v-btn>
          <v-btn
          class = "button" 
          @click="changeDayCalc"
          >
          <div class="img img-size">
            <img
            src="dayCalc.png"
            alt="DayCalc"
            >
          </div>
            
          </v-btn>
          <v-btn
          class = "button" 
          @click="changeCreditCalc"
          >
            <div class="img img-size">
            <img
            src="creditCalc.png"
            alt="creditCalc"
            >
          </div>
          </v-btn>



        </v-btn-toggle>
    </v-card>
</template>
<script>

  export default {
    data() {
      return {
      toggle_exclusive: undefined
      }        
    },
    components:{
    },
    computed:{
      visibility(){
      return this.$store.getters.computedVisibility
    }

    },
    methods:{
      changeCalendar() {
        if(!this.$store.getters.computedCalendar){
        this.$store.commit('changeCalendar', {
        })
        }
      },
      changeCalculator() {
        if(!this.$store.getters.computedCalculator){
        this.$store.commit('changeCalculator', {
        })
        }
      },
      changeCurrency() {
        if(!this.$store.getters.computedCurrency){
        this.$store.commit('changeCurrency', {
        })
        }
      },
      changeDayCalc() {
        if(!this.$store.getters.computedDayCalc){
        this.$store.commit('changeDayCalc', {
        })
        }
      },
      changeCreditCalc() {
        if(!this.$store.getters.computedCreditCalc){
        this.$store.commit('changeCreditCalc', {
        })
        }
      }
  }

  }

</script>

<style scoped>
.RightButtons {
  flex:none
}
.button{
        background: none;
        border: none;
        padding: none;
    }

</style>
