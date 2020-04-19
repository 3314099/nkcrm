<template>
<div>
<div class="d-flex no-wrap">
  <div>
    <h2 class="mt-2 pr-0">Фильтры:</h2>
    </div>
    <div class="row" style="max-wigth: 80%">
  <v-sheet
    class="mx-auto"
    max-width="900"
    color="basil"
  >
    <v-slide-group 
    next-icon="mdi-arrow-right-drop-circle"
    prev-icon="mdi-arrow-left-drop-circle"
    >
      <v-slide-item
        v-for="n in 25"
        :key="n"
      >
        <v-chip
      v-on="on"
      outlined
      label
      color="teal"
      filter: true
      class="ma-2"
      close
      close-icon="mdi-lead-pencil"
      @click:close="toEditTag(tag)"
      @click="changeCheck(tag.id)"
    >
      {{ n }}
    </v-chip>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
  </div>
  </div>
  <v-divider class="ma-4"></v-divider>
 <div class="d-flex no-wrap">
  <div>
    <h2 class="mt-2 pr-0">Категории:</h2>
    </div>
    <div class="row" style="max-wigth: 80%">
  <v-sheet
    class="mx-auto"
    max-width="900"
    color="basil"
  >
    <v-slide-group 
    next-icon="mdi-arrow-right-drop-circle"
    prev-icon="mdi-arrow-left-drop-circle"
    >
      <v-slide-item
        v-for="n in 25"
        :key="n"
        v-slot:default="{ active, toggle }"
      >
        <v-btn
          class="mx-2"
          
          :input-value="active"
          active-class="purple white--text"
          depressed
          outlined
          @click="toggle"
          mandatory
        >
          Options {{ n }}
        </v-btn>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
  </div>
  </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      model: null,
    }),
  }
</script>
