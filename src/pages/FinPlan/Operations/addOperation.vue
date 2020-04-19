<template>
  <v-card
class="mx-3"
  >
    <v-container
    >
    <div class="d-flex flex-wrap justify-space-between px-0">
      <v-col class="d-flex flex-wrap py-0 border" cols="6" >
        <h2>Создание новой операции в разделе:&nbsp;</h2>
      </v-col>
      <v-col class="d-flex flex-wrap py-0 border" cols="6">
        <h3>Базовый фонд</h3>
            <div class="img img-size">
            <img
            src="arrow-right.png"
            alt="arrow"
            >
          </div>
          <h3>Кошелёк</h3>
          <div class="img img-size">
            <img
            src="arrow-right.png"
            alt="arrow"
            >
          </div>
          <h3>Наименование счета</h3>

      </v-col>
      <v-col class="d-flex flex-wrap flex-grow py-0 border" cols="3">
        <v-radio-group
      :disabled="disabled"
      :readonly="readonly"
      :mandatory="mandatory"
      :multiple="multiple"
      :error="error"
      :success="success"
      :row="row"
      :color="color"
    >
      <v-radio label="Пополнение"></v-radio>
      <v-radio label="Расход"></v-radio>
      <v-radio label="Перевод"></v-radio>
    </v-radio-group>
      </v-col>
        
      <v-col class="d-flex flex-wrap flex-grow py-0 border" cols="3">
        <v-radio-group
      :disabled="disabled"
      :readonly="readonly"
      :mandatory="mandatory"
      :multiple="multiple"
      :error="error"
      :success="success"
      :row="row"
      :color="color"
    >
      <v-radio label="План"></v-radio>
      <v-radio label="Факт"></v-radio>
      <v-radio label="Черновик"></v-radio>
    </v-radio-group>
      </v-col>
      
      <v-col class="d-flex flex-wrap py-0 border" cols="3">
        <v-text-field
                v-model="title"
                class="mr-6"
                :error-messages="titleErrors"
                label="Сумма"
                required
                @input="$v.title.$touch()"
                @blur="$v.title.$touch()"
                name="title"
                type="text"
                  >
                </v-text-field>
                <DatePicker/>
                
      </v-col>
      <v-col class="d-flex flex-wrap py-0 border" cols="3">
      <ColorPicker 
        :color="color"
        @changeColor="changeColor"
        />
        <v-select
        class="mr-6 pt-8"
          v-model="currancy"
            :items="items"
            label="Категория"
            name="currancy"
        ></v-select>
      </v-col>
      <v-col class="text-center pa-0 border" cols="12" >
        <Tags/>
      </v-col>
      <v-col class="text-center pa-0 border" cols="12" >
        <filters/>
      </v-col>
      <v-col class="text-center pa-0 border" cols="8" >

        <v-textarea
          rows="1"
          v-model="comments"
          outlined
          name="comments"
          label="Комментарии"
          type="text"
        >
        </v-textarea>
      </v-col>
      <v-col class="text-center ma-0 pa-0 border" col-lg-4 col-md-4>
        <v-btn
          @click="openBanner('', true)"
          class="my-2 mx-5"
          outlined
          color="red" 
          >Отменить</v-btn>
        <v-btn
          class="my-2 mx-5"
          outlined
          color="primary" 
          @click="toCreateAccount()"
          >
          Сохранить
        </v-btn>
        <v-btn
          v-if="mode ==='edit'"
          class="my-2 mx-5"
          outlined
          color="primary" 
          @click="toEditAccount(item.id)"
          >
          Сохранить
        </v-btn>
        </v-col>

      </div>
    </v-container>
    </v-card>
</template>
<script>
import Account from '@/store/FinPlan/Account.js'
import Operation from '@/store/FinPlan/Operation.js'
import ColorPicker from '@/pages/FinPlan/Purse/ColorPicker'
import Tags from '@/pages/FinPlan/Purse/Tags'
import filters from '@/pages/FinPlan/Purse/filters'
import DatePicker from '@/pages/FinPlan/Operations/DatePicker'

export default {
  mixins:[Operation,Account],
  components:{
    ColorPicker,
    Tags,
    filters,
    DatePicker

  },
  data: () => ({
      items: [
        {
          text: 'Базовый фонд',
          disabled: true,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Link 1',
          disabled: true,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
    }),
  
}
</script>
<style >
.border{
  /* border: solid 2px; */
}
</style>
