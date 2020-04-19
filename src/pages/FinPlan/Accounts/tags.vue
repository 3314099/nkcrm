<template>
  <div>
    <v-card-text
    outlined
    >
    <div 
    v-if="modeBtn === 'editTag'"
    class="d-inline-flex"
    >
    <div>
    <h2 class="mt-1">Изменение тега:</h2>
    </div>
    <div>
    <v-tooltip 
    max-width= 400
    top
    >
      <template v-slot:activator="{ on }">
        <v-chip
        v-on="on"
          v-if="modeBtn === 'editTag'"
          color="teal"
          text-color="white"
          filter: true
          class="mx-2 mt-0"
    >
      {{editTag.title}}
    </v-chip>
      </template>
      <span 
      >
      <div v-if="editTag.comment">{{editTag.comment}}</div>
      <div v-else>Нет комментариев</div>
      </span>
    </v-tooltip>
    </div>
    </div>
      
    <div class="d-flex ">
      <div class="d-flex flex-wrap justify-space-between row" >
        <div style="d-flex max-width: 20%" class="px-3 pt-1" >
          <div>
          <v-text-field
            label="Тег"
            v-model="textField"
            dense
            hint="3-16 символов"
            outlined
            small
            clearable
            :counter="15"
          >
            </v-text-field>
            </div>
        
        </div>
        
         <div 
         v-if="modeBtn === ''"
         class="flex-grow-1 px-3 pt-1">
            <v-btn
            
            class="mx-2"
            outlined
            color="primary" 
            @click= "modeBtn = 'addTag'"
            :disabled="errorBtn"
            >
            В режим сохранения
          </v-btn>
          </div>    
        <div class="row" 
        v-if="modeBtn === 'addTag' || modeBtn === 'editTag'"
        >
          <div class="flex-grow-1 px-3 pt-1">
          <v-text-field
            label="Комментарий к тегу"
            v-model="commentField"
            dense
            hint="не более 50 символов"
            outlined
            small
            clearable
            :counter="50"
          >
            </v-text-field>
        </div>
        <div
        v-if="modeBtn === 'editTag'" 
        class="d-flex flex-nowrap pt-1"
        >
        <v-btn
            @click="toRemoveTag()"
            class="mx-2"
            outlined
            color="red" 
            >УдалитьEdit
            </v-btn>
          <v-btn
            @click="toCancelEditTag()"
            class="mx-2"
            outlined
            color="green" 
            >ОтменитьEdit
            </v-btn>
          <v-btn
            class="mx-2"
            outlined
            color="primary" 
            @click="toSaveEditTag(editTag)"
            :disabled="errorBtn"
            >
            СохранитьEdit
          </v-btn>
          </div>
            <div
            v-else 
            class="d-flex flex-nowrap pt-1"
            >
              <v-btn
                @click="toCancelAddTag()"
                class="mx-2"
                outlined
                color="red" 
                >ОтменитьAdd
                </v-btn>
              <v-btn
                class="mx-2"
                :disabled="errorBtn"
                outlined
                color="green" 
                @click= "toCreateTag()"
                >
                СохранитьAdd
              </v-btn>
            </div>
          
        </div>
      </div>
    </div>
    <v-divider class="ma-4"></v-divider>
    <v-tooltip 
    max-width= 400
    top
    v-for="tag in filteredAndSortedTags"
      :key="tag.id"
    >
      <template v-slot:activator="{ on }">
        <v-chip
      v-on="on"
      
      color="teal"
      small
      :disabled="modeBtn === 'editTag'"
      :outlined="tag.checked ? false : true"
      :text-color="tag.checked ? 'white' : 'black'"
      filter: true
      class="ma-2"
      close
      close-icon="mdi-lead-pencil"
      @click:close="toEditTag(tag)"
      @click="changeCheck(tag.id)"
    >
      {{tag.title}}
    </v-chip>
      </template>
      <span 
      >
      <div v-if="tag.comment">{{tag.comment}}</div>
      <div v-else>Нет комментариев</div>
      </span>
    </v-tooltip>
    <v-divider class="ma-4"></v-divider>
    </v-card-text>
  </div>
</template>
<script>
import {eventEmitter} from '@/main'
export default {
  data() {
    return {
      modeBtn: '',
      textField: '',
      // valid: false,
      // titleRules: [
      //   v => 3 <= v.length <= 16 || '3-16 символов',
      // ],
      commentField: '',
      editTag:{}
    }
  },
  props:{
    tags:{
      type:Array
    }
  },
  computed:{
    childTitleField(){
      if(this.textField){
        return this.textField
      }else{
        return ''
      }
    },
    childCommentField(){
      if(this.commentField){
        return this.commentField
      }else{
        return ''
      }
    },
    filteredAndSortedTags(){
      // return [...this.filteredTags].sort((a, b) => b.title - a.title)
      return [...this.filteredTags].sort(( a, b ) => a.title > b.title ? 1 : -1)
      // return [...this.filteredTags].sort(function(a,b){
      //   return a.title - b.title
      // })
    },
    filteredTags(){
      if(!this.childTitleField){
        if(this.editTag.title){
          return this.tags.filter((tag)=>{
          return (tag.id !== this.editTag.id)
          })
        }else{
          return this.tags
        }
      }else{  
        return this.tags.filter((tag)=>{
          return (tag.title.toUpperCase()).match(this.childTitleField.toUpperCase())
        })
      }
    },
    errorBtn(){
      if(this.modeBtn === ''){
        if(!this.checkChildTitleFieldLength() && !this.checkEqualityTagAndChildTitleField()){
          return false
          }else{
          return true
        }
      }else if(this.modeBtn === 'addTag' || this.modeBtn === 'editTag'){
        if(!this.checkChildTitleFieldLength() && !this.checkEqualityTagAndChildTitleField() && !this.checkChildCommentFieldLength()){
          return false
        }else{
          return true
        }
      }else{
      return false
      }
    }
  },
  methods:{
    sort_by(field, reverse, primer){
      var key = primer ? 
          function(x) {return primer(x[field])} : 
          function(x) {return x[field]};

      reverse = !reverse ? 1 : -1;

      return function (a, b) {
          return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        } 
    },
    checkEqualityTagAndChildTitleField(){ // сравнение наличия тега из строки поиска
      let arr = this.tags.filter((tag)=>{
          return tag.title.toUpperCase() === this.childTitleField.toUpperCase()
        })
      return (arr.length === 0) ? false : true
    },
    checkChildTitleFieldLength(){
      return (this.childTitleField.length >= 3 && this.childTitleField.length < 16) ? false : true
    },
    checkChildCommentFieldLength(){
      return (this.childCommentField.length < 50) ? false : true
    },
    async toCreateTag(){
      try{
        const tag = await this.$store.dispatch('createTag', {
          title: this.childTitleField,
          comment: this.childCommentField,
          })
          // this.tags.push(tag)
          this.textField = ''
          this.commentsField = ''
          this.modeBtn = ''

          eventEmitter.$emit('createdTag', tag,'tags')
          // eventEmitter.$emit('openBanner', '')
        }catch (e){
          // console.log('error')
        }
    },
    toEditTag(tag){
      this.modeBtn = 'editTag'
      this.editTag = tag
      this.textField = this.editTag.title
      this.commentField = this.editTag.comment
      // this.filteredTags = this.tags.filter((item)=>{
      //     return item.id !== tag.id
      //   })
    },
    async toRemoveTag(){
      try{
            await this.$store.dispatch('removeTag', this.editTag.id)
            eventEmitter.$emit('deletedTag', this.editTag.id,'tags')
            this.textField = ''
            this.commentsField = ''
            this.tag = {}
            this.modeBtn = ''

          }catch (e){
            // console.log('error')
          }
    },
    toCancelAddTag(){
      // this.textField = ''
      this.commentsField = ''
      this.modeBtn = ''
    },
    toCancelEditTag(){
      this.modeBtn = ''
      this.textField = this.editTag.title
      this.commentsField = ''
      eventEmitter.$emit('updatedTag', '','tags')
      this.editTag = {}
    },
    async toSaveEditTag(tag){
      try{
        const editTag = await this.$store.dispatch('editTag', {
          id: tag.id,
          title: this.childTitleField,
          comment: this.childCommentField,
          })
          this.textField = tag.title
          this.commentsField = ''
          this.modeBtn = ''
          eventEmitter.$emit('updatedTag', editTag,'tags')
          this.editTag = {}

          // eventEmitter.$emit('openBanner', '')
        }catch (e){
          // console.log('error')
        }
    },
    changeCheck(id){
      for (var i = this.tags.length - 1; i >= 0; --i) {
        if (this.tags[i].id === id) {
            this.tags[i].checked = !this.tags[i].checked
            return
        }
      }
    },
  }
}
</script>

