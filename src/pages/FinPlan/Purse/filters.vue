<template>
  <div>
    <div class="d-flex flex-wrap justify-space-between px-0">
      <v-col class="d-flex flex-wrap py-0 border" cols="3" >
        <v-select
        class="mr-6"
          v-model="currancy"
            :items="items"
            label="Валюта"
            name="currancy"
        ></v-select>
        <ColorPicker 
        :color="color"
        @changeColor="changeColor"
        />
      </v-col>
      <v-col class="d-flex flex-wrap py-0 border" cols="3" >
        <v-select
        class="mr-6"
          v-model="currancy"
            :items="items"
            label="Валюта"
            name="currancy"
        ></v-select>
        <ColorPicker 
        :color="color"
        @changeColor="changeColor"
        />
      </v-col>
      <v-col class="d-flex flex-wrap py-0 border" cols="3" >
        <v-select
        class="mr-6"
          v-model="currancy"
            :items="items"
            label="Валюта"
            name="currancy"
        ></v-select>
        <ColorPicker 
        :color="color"
        @changeColor="changeColor"
        />
      </v-col>
      <v-col class="d-flex flex-wrap py-0 border" cols="3" >
        <v-select
        class="mr-6"
          v-model="currancy"
            :items="items"
            label="Валюта"
            name="currancy"
        ></v-select>
        <ColorPicker 
        :color="color"
        @changeColor="changeColor"
        />
      </v-col>
    </div>
  </div>
</template>
