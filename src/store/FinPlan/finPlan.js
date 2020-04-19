
// import firebase from 'firebase/app'
import {eventEmitter} from '@/main'



export default{
  methods:{
    leftPanelButtons(val){
      eventEmitter.$emit('leftPanelButtons', val)
    },
    changeVisibility() {
      eventEmitter.$emit('changeVisibility')

      // this.$store.commit('changeVisibility', {
      // })
    },
    copyToClipboard(text) {
      this.$copyText(text).then(() => {
        this.snackColor = 'success',
        this.copyToClipboardText = 'Сохранено успешно!'
        this.copyToClipboarded = true
      }, () => {
        this.snackColor = 'red lighten-1',
        this.copyToClipboardText = 'Не удалось сохранить(:'
        this.copyToClipboarded = true
      })
    },
  }
  
}
