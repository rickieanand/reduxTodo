import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore} from 'redux'
import { Provider, connect } from 'react-redux'

//store

let store = createStore(todo)

//actions
const ADD_TODO = 'ADD_TODO'
  let x=1
function addTodo(text) {

  return {
    type: ADD_TODO,
    id: x++,
    text: text
  }
}

//reducer

function todo(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    default:
      return state
  }
}

//component App

class App extends Component {
  onHandleSubmit(text){
    store.dispatch(addTodo(text))
  }
  render() {
     console.log("App Component")
     console.log(this.props)
    return (
      <div>
      <h1>Hello, world.</h1>
      <TodoForm onHandleSubmit={this.onHandleSubmit}/>
      <TodoList todos={this.props.todos}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
	console.log("mapStateToProps")
	return {
		todos:state
	}
}

//connect(mapStateToProps)(App)
const ConnectedApp = connect(mapStateToProps)(App);
//component Form

class TodoForm extends Component {
            constructor(props){
              super(props)
            }
            render() {
              let input
                    return (
						    <div>
						      <form onSubmit={e => {
						        e.preventDefault()
						        if (!input.value.trim()){
						          return
						        }
						        this.props.onHandleSubmit(input.value)
						        input.value = ''
						      }}>
						        <input ref={node => {
						          input = node
						        }} />
						        <button type="submit">
						          Add Todo
						        </button>
						      </form>
						    </div>
                    );
                  }
}

//component TodoList
class TodoList extends Component {
            constructor(props){
              super(props)
            }
            render() {
               console.log('Todolist')
               
                return (
                  <ul><TodoListItem todos={this.props.todos} /></ul>
                  );
                }
}

//component TodoListItem
class TodoListItem extends Component {
            constructor(props){
              super(props)
            }
            render(){
              return (
                <li>{this.props.todos.map(function(todo){return todo.text+", "})}</li>
              );
            }
}





//ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
ReactDOM.render(<Provider store={store}><ConnectedApp /></Provider>, document.getElementById('root'));

