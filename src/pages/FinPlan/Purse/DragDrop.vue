<template>
  <div>
    <v-card
    
    >



      <PurseTop 
      @created="addNewAccount" 
      :typesAccountList="typesAccountList"
      :key="typesAccountList.length + typesAccountListCounter"
      @updatedTypesAccountList="updateTypesAccountList"
      />
    <ul class="todo-list pl-0 pt-0">
      <v-container
        id="scroll-target"
        style="max-height: 500px"
        class="pt-1 overflow-y-auto"
      >
      <v-card
      class="ml-0"
      outlined
      >
        <li class="todo-item userSelect" 
        v-for="(item, i) in accounts" 
        :key="i" 
        :draggable="draggable" 
        @dragstart="dragStart(i, $event)" 
        @dragover.prevent 
        @dragenter="dragEnter" 
        @dragleave="dragLeave" 
        @dragend="dragEnd" 
        @drop="dragFinish(i, $event)"
      >
      <account 
      :item="item"
      :typesAccountList="typesAccountList"
      @deletedAccount="deletedAccount"
      @updatedAccount="updatedAccount"
      />
        
      </li>
      </v-card>
        <v-row
          v-scroll:#scroll-target="onScroll"
          align="center"
          justify="center"
          style="height: 0px"
        >
        </v-row>
      </v-container>
      
    </ul>
    </v-card>
  </div>
</template>

<script>
import {eventEmitter} from '@/main'
import PurseTop from '@/pages/FinPlan/Purse/PurseTop'
import account from '@/pages/FinPlan/Purse/account'
// import addAccount from '@/pages/FinPlan/Purse/addAccount'


export default {
  components: {
    PurseTop,
    account,
    // addAccount
  },
 
  data: () => ({
      newItem: "",
      dragging: -1,
      typesAccount: [],
      accounts: [],
      loading: true,
      currentDrap: null,
      typesAccountList: [],
      typesAccountListCounter: 0,
      openBanner: false,
      draggable: true,
      updateCounter: 0
  }),
  computed: {
    isDragging() {
      return this.dragging > -1
    },
  },
  created(){
      eventEmitter.$on('draggbleStop', () =>{
        this.draggbleStop()
      }),
      eventEmitter.$on('draggbleStart', () =>{
        this.draggbleStart()
      })
    },
  async mounted(){
    this.accounts = await this.$store.dispatch('fetchAccounts')
    this.typesAccount = await this.$store.dispatch('fetchTypesAccount')
    let arr = []
         Object.keys(this.typesAccount).forEach(key => {
          arr.push(this.typesAccount[key].type)
        })
        this.typesAccountList = [...new Set(arr)];
        this.typesAccountList = this.typesAccountList.sort()
        this.typesAccountListCounter++
  },
  methods: {
    draggbleStop(){
      this.draggable = false
    },
    draggbleStart(){
      this.draggable = true
    },
    toOpenCreateAccount(){
      this.openCreateAccount = !this.openCreateAccount
      this.v0 = !this.v0

    },
    addNewAccount(account){
      this.accounts.unshift(account)
    },
    updatedAccount(account){
      const idx = this.accounts.findIndex(c => c.id === account.id)
      this.accounts[idx].categoryTypeAccount = account.categoryTypeAccount
      this.accounts[idx].categoryAccount = account.categoryAccount
      this.accounts[idx].title = account.title
      this.accounts[idx].type = account.type
      this.accounts[idx].bill = account.bill
      this.accounts[idx].currancy = account.currancy
      this.accounts[idx].color = account.color
      this.accounts[idx].comments = account.comments
      eventEmitter.$emit('closeBanners')
      this.$forceUpdate()


                // this.accounts.forEach((value, i) => {
                //   if(value.id == account.id){
                //     this.accounts[i] = {
                //       categoryTypeAccount: account.categoryTypeAccount,
                //       categoryAccount: account.categoryAccount,
                //       title: account.title,
                //       type: account.type,
                //       bill: account.bill,
                //       currancy: account.currancy,
                //       comments: account.comments,
                //     }
                //   }
                // });
                console.log(this.accounts);
    },
    deletedAccount(id){
      for (var i = this.accounts.length - 1; i >= 0; --i) {
      if (this.accounts[i].id === id) {
          this.accounts.splice(i,1);
    }
  }
    },
    updateTypesAccountList(type){
      this.typesAccountList.push(type)
      this.typesAccountList.sort()
      this.typesAccountListCounter++
    },
    onScroll (e) {
        this.offsetTop = e.target.scrollTop
      },

      // drag and drop
    removeItem(item) {
      this.todos.splice(this.todos.indexOf(item), 1);
    },
    removeItemAt(index) {
      this.todos.splice(index, 1);
    },
    dragStart(which, ev) {
      ev.dataTransfer.setData('Text', this.id);
      ev.dataTransfer.dropEffect = 'move'
      this.dragging = which;
    },
    dragEnter(ev) {
      if (ev.clientY > ev.target.height / 2) {
        ev.target.style.marginBottom = '0px'
      } else {
        ev.target.style.marginTop = '0px'
      }
    },
    dragLeave(ev) {
      ev.target.style.marginTop = '0px'
      ev.target.style.marginBottom = '0px'
    },
    dragEnd() {
      this.dragging = -1
    },
    dragFinish(to, ev) {
      this.moveItem(this.dragging, to);
      ev.target.style.marginTop = '0px'
      ev.target.style.marginBottom = '0px'
    },
    moveItem(from, to) {
      if (to === -1) {
        this.removeItemAt(from);
      } else {
        this.accounts.splice(to, 0, this.accounts.splice(from, 1)[0]);
      }
    }
  },
  // watch accounts change for localStorage persistence
  watch: {
    todos: {
      // handler: function(todos) {
      //   // todoStorage.save(todos);
      // },
      deep: true
    }
  }
};
</script>
<style>
body {
  font-family: "Source Sans Pro", "Arial", sans-serif;
}

.userSelect{
  user-select: none
  }

* {
  box-sizing: border-box;
}

.todo-list {
  list-style-type: none;
  padding: 10px;
  padding-left: 0px;
}

.done {
  text-decoration: line-through;
  color: #888;
}

.new-todo {
  width: 100%;
}

.trash-drop {
  border: 2px dashed #ccc !important;
  text-align: center;
  color: #e33;
}

.trash-drop:-moz-drag-over {
  border: 2px solid red;
}

.todo-item {
  border: 1px solid #ccc;
  /* border-radius: 2px; */
  /* padding: 14px 8px; */
  /* margin-bottom: 3px; */
  /* background-color: #fff; */
  box-shadow: 1px 2px 2px #ccc;
  /* font-size: 22px; */
}

.remove-item {
  float: right;
  color: #a45;
  opacity: 0.5;
}

.todo-item:hover .remove-item {
  opacity: 1;
  font-size: 28px;
}

</style>
