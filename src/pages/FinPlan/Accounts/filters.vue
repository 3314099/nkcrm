<template>
  <div>
    <v-card-text
    flat
    outlined
    class="my-1 d-flex jastify-start py-0 px-2"
    >
    <template>
      <h2 class="my-2">Вид категории:</h2>
      <div class="my-2">
          <h2
          class="mx-2"
          style="color: green"
          @click= "alert()"
          >
            <v-icon
          >mdi-plus
          </v-icon>
          </h2>
      </div>
       <v-text-field
            hide-details
            dense
            outlined
            small
            style="max-width: 300px"
            clearable
          >
          
          </v-text-field>
    <v-chip
      pill
      color="teal"
      text-color="white"
      filter: true
      class="mx-1"
      close
      label
    >
      <v-icon>mdi-checkbox-marked-circle</v-icon>
      New Tweets
    </v-chip>
    <v-chip
    outlined
      pill
      color="teal"
      text-color="black"
      filter: true
      class="mx-1"
      close
      label
    >
      <v-icon>mdi-checkbox-marked-circle</v-icon>
      New Tweets
    </v-chip>
    </template>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>

    <v-card-text
    outlined
    class="pa-0 d-flex jastify-start my-1 py-0 px-2"
    >
    <h2 class="my-2">Категория:</h2>
      <div>
          <h2
          class="my-2"
          style="color: green"
          @click= "alert()"
          >
            <v-icon
          >mdi-plus
          </v-icon>
          </h2>
      </div>
       <v-text-field
            class=""
            hide-details
            dense
            outlined
            small
            style="max-width: 200px"
            clearable
          >
          
          </v-text-field>
    <v-chip
      color="teal"
      small
      text-color="white"
      filter: true
      class="ma-2 "
      close
    >
      New Tweets
    </v-chip>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>

    <v-card-text
    outlined
    class="pa-0 d-flex jastify-start my-1 py-0 px-2"
    >
    <h2 class="my-2">Значение:</h2>
      <div>
          <h2
          class="my-2"
          style="color: green"
          @click= "alert()"
          >
            <v-icon
          >mdi-plus
          </v-icon>
          </h2>
      </div>
       <v-text-field
            class=""
            hide-details
            dense
            outlined
            small
            style="max-width: 200px"
            clearable
          >
          
          </v-text-field>
    <v-chip
      color="teal"
      small
      text-color="white"
      filter: true
      class="ma-2 "
      close
    >
      New Tweets
    </v-chip>
    </v-card-text>
  </div>
</template>
<script>
export default {
  methods:{
    alert(){
      alert(111)
    }
  }
}
</script>
