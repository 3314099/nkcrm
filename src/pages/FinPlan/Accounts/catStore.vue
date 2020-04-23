<div class="d-flex justify-space-between">
  <div>
    <h2 class="ma-4 pr-0">Фильтры:</h2>
    </div>
  <v-container
        id="scroll-target"
        style="max-height: 100px; max-width: 900px"
        class="d-flex row ma-1 pt-1 overflow-x-auto"
      >
<div class="d-flex ">
  
        <v-chip
        v-for="n in 25"
        :key="n"
      outlined
      label
      color="teal"
      filter: true
      class="mx-1"
      close
      close-icon="mdi-lead-pencil"
      @click:close="toEditTag(tag)"
      @click="changeCheck(tag.id)"
    >
      {{ n * 50 }}
    </v-chip>
  </div>
   <v-row
          align="center"
          justify="center"
          style="height: 0px"
        >
        </v-row>
      </v-container>
  </div>
  <div class="d-flex justify-space-between">
  <div>
    <h2 class="ma-4 pr-0">Категории:</h2>
    </div>
  <v-container
        id="scroll-target"
        style="max-height: 100px; max-width: 900px"
        class="row ma-1 pt-1 overflow-x-auto"
      >
<div class="d-flex ">
  
        <v-chip
        v-for="n in 25"
        :key="n"
      label
      color="teal"
      filter: true
      class="ma-1"
      close
      close-icon="mdi-lead-pencil"
      @click:close="toEditTag(tag)"
      @click="changeCheck(tag.id)"
    >
      {{ n * 50 }}
    </v-chip>
  </div>
   <v-row
          align="center"
          justify="center"
          style="height: 0px"
        >
        </v-row>
      </v-container>
  </div>
  <div class="d-flex justify-space-between">
  <div>
    <h2 class="ma-4 pr-0">Подкатегории:</h2>
    </div>
  <v-container
        id="scroll-target"
        style="max-height: 100px; max-width: 900px"
        class="row ma-1 pt-1 overflow-x-auto"
      >
<div class="d-flex ">
  
        <v-chip
        v-for="n in 25"
        :key="n"
      outlined
      label
      color="teal"
      filter: true
      class="ma-1"
      close
      close-icon="mdi-lead-pencil"
      @click:close="toEditTag(tag)"
      @click="changeCheck(tag.id)"
    >
      {{ n * 50 }}
    </v-chip>
  </div>
   <v-row
          align="center"
          justify="center"
          style="height: 0px"
        >
        </v-row>
      </v-container>
  </div>

data: () => ({
      rules: [
        value => !!value || 'Required.',
        value => (value || '').length <= 20 || 'Max 20 characters',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      ],
    }),
