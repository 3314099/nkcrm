import {eventEmitter} from '@/main'



export default{
  computed:{
    
  },
  methods:{
    leftMenuButton(btnId){
      eventEmitter.$emit('leftMenuButton', btnId)
    },
    toChangeCheckLMB(bool, id){
      eventEmitter.$emit('toChangeCheckLMB', bool,id )
    }
  },
  
}
