<template>
  <div>
    <v-card
    outlined
  >
  <v-card-actions>
    <v-list-item three-line>
      <v-list-item-content>
       <v-data-table
    class="elevation-1"
    hide-default-footer
  ></v-data-table>
      </v-list-item-content>

    </v-list-item>
    <v-spacer />
          <div 
          >
  <v-btn
                @click="openBanner('toCreateAccountBanner',{})" 
                >
                <v-icon>mdi-plus</v-icon>
                </v-btn>
    <v-btn-toggle
            >
              
          <v-btn @click="openBanner('toEditAccountBanner', account)">
            <v-icon>mdi-lead-pencil</v-icon>
          </v-btn>
          <v-btn @click="openBanner('toRemoveAccountBanner', account)">
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-btn-toggle>
        </div>
        </v-card-actions>
  </v-card>
  </div>
</template>
