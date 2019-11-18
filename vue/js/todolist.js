
let vm = new Vue({
    el: '.app',
    data:{
      newTodo:'',
      todos:[]
    },
    methods:{
      addTodo: function(){
        var text = this.newTodo.trim();
        if(text){
          this.todos.push({text:text});
          this.newTodo = '';
        }
      },
      removeTodo: function(todo){
        this.todos.splice(this.todos.indexOf(todo), 1);
      }
    }
  })
