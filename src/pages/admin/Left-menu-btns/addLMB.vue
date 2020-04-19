<template>
<div>
  <v-card>

  
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="2"
        >
          <v-text-field
            v-model="btnId"
            label="btnId"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="2"
        >
          <v-select
            v-model="checked"
            :items="items"
            label="checked"
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          md="2"
        >
          <v-select
            v-model="count"
            :items="items"
            label="count"
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          md="2"
        >
          <v-text-field
            v-model="text"
            label="text"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="2"
        >
          <v-text-field
            v-model="parentText"
            label="parentText"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="2"
        >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  
  </v-card>
</div>
</template>
<script>
  export default {
    data: () => ({
      btnId: 0,
      checked: true,
      count: false,
      text: 'ВСЕ СЧЕТА',
      parentText: '',
      icon: '',
      class: '',
      background: '',
      parentBackground: '',
      color: '',
      items: [true,false],

      leftMenuitems: [
          { btnId:   0, checked: true, count: false, text: 'ВСЕ СЧЕТА', parentText: '', icon: 'mdi-clock', value: "БАЗА", class: 'ma-0 pa-1 pl-1 ', background: '#F5F5F5', parentBackground: '#F5F5F5', color: 'black'},
          { btnId: 100, checked: true, count: false, text: 'БАЗА', parentText: '', icon: 'mdi-clock', badge: 5, value: "БАЗА", class: 'ma-0 pa-1 pl-1 ', background: '#039BE5', parentBackground: '#039BE5', color: 'white'},
          { btnId: 101, checked: true, count: true, text: 'Кошелёк', parentText: 'БАЗА', icon: 'mdi-account', badge: 5, value: "БАЗА", class: 'ma-0 pa-1 pl-6 subtitle-1 ', background: '#E1F5FE', parentBackground: '#039BE5', color: 'black'},
          { btnId: 102, checked: true, count: true, text: 'Страховка', parentText: 'БАЗА', icon: 'mdi-flag', badge: 5, value: "БАЗА", class: 'ma-0 pa-1 pl-6 subtitle-1 ', background: '#E1F5FE', parentBackground: '#039BE5', color: 'black'},
          { btnId: 103, checked: true, count: true, text: 'Сейф', parentText: 'БАЗА', icon: 'mdi-flag', badge: 5, value: "БАЗА", class: 'ma-0 pa-1 pl-6 subtitle-1 ', background: '#E1F5FE', parentBackground: '#039BE5', color: 'black'},
          { btnId: 104, checked: true, count: true, text: 'Автоплатежи', parentText: 'БАЗА', icon: 'mdi-flag', badge: 5, value: "БАЗА", class: 'ma-0 pa-1 pl-6 subtitle-1 ', background: '#E1F5FE', parentBackground: '#039BE5', color: 'black'},
          { btnId: 200, checked: true, count: false, text: 'ЦЕЛИ', parentText: '', icon: 'mdi-flag', badge: 5, value: "БАЗА", class: 'ma-0 pa-1 pl-1 ', background: '#D81B60', parentBackground: '#D81B60', color: 'white'},
          { btnId: 201, checked: true, count: true, text: 'Мелкие', parentText: 'ЦЕЛИ', icon: 'mdi-flag', badge: 555555555, value: "БАЗА", class: 'ma-0 pa-1 pl-6 subtitle-1 ', background: '#F8BBD0', parentBackground: '#D81B60', color: 'black'},
          { btnId: 202, checked: true, count: true, text: 'Средние', parentText: 'ЦЕЛИ', icon: 'mdi-flag', badge: 5, value: "БАЗА", class: 'ma-0 pa-1 pl-6 subtitle-1 ', background: '#F8BBD0', parentBackground: '#D81B60', color: 'black' },
          { btnId: 203, checked: true, count: true, text: 'Крупные', parentText: 'ЦЕЛИ', icon: 'mdi-flag', badge: 5, value: "БАЗА", class: 'ma-0 pa-1 pl-6 subtitle-1 ', background: '#F8BBD0', parentBackground: '#D81B60', color: 'black' },
          { btnId: 300, checked: true, count: false, text: 'СБЕРЕЖЕНИЯ', parentText: '', icon: 'mdi-flag', badge: '5 555 555 555', value: "БАЗА", class: 'ma-0 pa-1 pl-1 ', background: '#00897B', parentBackground: '#00897B', color: 'white' },
          { btnId: 301, checked: true, count: true, text: 'Вклады', parentText: 'СБЕРЕЖЕНИЯ', icon: 'mdi-flag', badge: 5, value: "БАЗА", class: 'ma-0 pa-1 pl-6 subtitle-1 ', background: '#B2DFDB', parentBackground: '#00897B', color: 'black' },
          { btnId: 302, checked: true, count: true, text: 'Инвестиции', parentText: 'СБЕРЕЖЕНИЯ', icon: 'mdi-flag', badge: 5, value: "БАЗА", class: 'ma-0 pa-1 pl-6 subtitle-1 ', background: '#B2DFDB', parentBackground: '#00897B', color: 'black' },
          { btnId: 303, checked: true, count: true, text: 'Пенсия', parentText: 'СБЕРЕЖЕНИЯ', icon: 'mdi-flag', badge: 5, value: "БАЗА", class: 'ma-0 pa-1 pl-6 subtitle-1 ', background: '#B2DFDB', parentBackground: '#00897B', color: 'black' },
          { btnId: 400, checked: true, count: false, text: 'ДОЛГИ', parentText: '', icon: 'mdi-flag', badge: 5, class: 'ma-0 pa-1 pl-1 ', background: '#F4511E', parentBackground: '#F4511E', color: 'white' },
          { btnId: 405, checked: true, count: true, text: 'Кредиты', parentText: 'ДОЛГИ', icon: 'mdi-flag', badge: 5, class: 'ma-0 pa-1 pl-6 subtitle-1 ', background: '#FFCCBC', parentBackground: '#F4511E', color: 'black'  },
          { btnId: 406, checked: true, count: true, text: 'Долги', parentText: 'ДОЛГИ', icon: 'mdi-flag', badge: 5, class: 'ma-0 pa-1 pl-6 subtitle-1 ', background: '#FFCCBC', parentBackground: '#F4511E', color: 'black'  },
          { btnId: 500, checked: true, count: false, text: 'ЭКОНОМИЯ', parentText: '', icon: 'mdi-flag', badge: 5, class: 'ma-0 pa-1 pl-1 ', background: '#8E24AA', parentBackground: '#8E24AA', color: 'white'},
          { btnId: 501, checked: true, count: true, text: 'Позитив', parentText: 'ЭКОНОМИЯ', icon: 'mdi-flag', badge: 5, class: 'ma-0 pa-1 pl-6 subtitle-1 ', background: '#E1BEE7', parentBackground: '#8E24AA', color: 'black' },
          { btnId: 502, checked: true, count: true, text: 'Негатив', parentText: 'ЭКОНОМИЯ', icon: 'mdi-flag', badge: 5, class: 'ma-0 pa-1 pl-6 subtitle-1 ', background: '#E1BEE7', parentBackground: '#8E24AA', color: 'black' },
      ],
    }),
    methods:{
      async pushLMBArray(leftMenuitems){
        // <v-btn @click="pushLMBArray(leftMenuitems)">
        //     <v-icon>mdi-plus</v-icon>
        //   </v-btn>
      try{
        await this.$store.dispatch('pushLMBArray', {
          leftMenuitems
          })
      }catch (e){
        console.log(leftMenuitems)
      }
    },
    }
  }
</script>
