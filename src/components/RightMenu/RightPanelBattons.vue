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
            active-class="rightBarMode === calendar ? true : false"
          @click="changeRMB('calendar')"
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
          @click="changeRMB('calc')"
          >
            <div class="img img-size">
            <img
            src="calculator.png"
            alt="Calculator"
            >
          </div>
          </v-btn>
          <v-btn
          @click="changeRMB('currancy')"
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
          @click="changeRMB('dayCalc')"
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
          @click="changeRMB('CreditCalc')"
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
    computed:{
      rightBarMode(){
        return this.$store.getters.rightBarMode
      },
      visibility(){
      return this.$store.getters.computedVisibility
      }
    },
    methods:{
      changeRMB(val){
        this.$store.dispatch('rightBarMode', val)
      },
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
