import {eventEmitter} from '@/main'



export default{
  methods:{
    leftMenuButton(btnId){
      eventEmitter.$emit('leftMenuButton', btnId)
    },
    toChangeCheckLMB(bool, id){
      eventEmitter.$emit('toChangeCheckLMB', bool,id )
    }
  },
  
}
