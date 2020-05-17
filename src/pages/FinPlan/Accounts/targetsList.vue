<template>
  <div align="center">

        <v-card color="red" flat>
          <v-card-text>
            <v-row class="mb-4" align="center">
              <v-avatar color="grey" class="mr-4"></v-avatar>
              <strong class="title">Title</strong>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </v-row>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            
          </v-card-text>
        </v-card>
  </div>
</template>
<script>
  export default {
    data: () => ({
      length: 5,
      window: 0,
      showArrows: true,
      vertical: true,
      reverse: false,
      autorun: false,
    }),

    created () {
      setInterval(() => {
        if (!this.autorun) return
        if (++this.window >= this.length) this.window = 0
      }, 1000)
    },
  }
</script>
