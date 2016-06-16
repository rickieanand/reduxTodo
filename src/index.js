import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore} from 'redux'
import { Provider, connect } from 'react-redux'


//store

let store = createStore(todo)

console.log(store.getState())

//actions
const ADD_TODO = 'ADD_TODO'
  let x=1
function addTodo(text) {

  console.log("Action Called")
  return {
    type: ADD_TODO,
    id: ++x,
    text: text
  }

}

//reducer

function todo(state={id:0,text:"",completed:false}, action) {
	  console.log(action)
   
  switch (action.type) {
    case 'ADD_TODO':
    
    let newState =  Object.assign({},state,{
        id: action.id,
        text: action.text,
        completed: false
      })
      return newState
    default:
      return state
  }
}




//component App

class App extends Component {
  render() {
  	console.log(this.props)
    return (
      <div>
      <h1>Hello, world.</h1>
      <TodoForm />
      <TodoList/>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps){
	console.log("mapStateToProps")
	console.log(state)
	console.log(ownProps)
	return {
		text: state.text,
		id : state.id,
		completed : false
	}
}

connect(mapStateToProps)(<App/>)

//component Form

class TodoForm extends Component {
          constructor(props){
            super(props)
//            this.handleAdd = this.handleAdd.bind(this)
            }
            // handleAdd(e){
            // e.preventDefault()
            // console.log(e.target)
            // //dispatch(addTodo(e.value))
            // }
            render() {
              let input
              	console.log(this.props)
                    return (
						<div>
						      <form onSubmit={e => {
						        e.preventDefault()
						        if (!input.value.trim()) {
						          return
						        }
						        console.log(input.value)
						        store.dispatch(addTodo(input.value))
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
                return (
                  <ul><TodoListItem /></ul>
                  );
                }
}
//component TodoListItem
class TodoListItem extends Component {
            constructor(props){
              super(props)
              this.handleDelete = this.handleDelete.bind(this)
            }
              handleDelete(e){
              e.preventDefault()
              console.log(e.value)
              //this.props.dispatch(addTodo(e.value));
            }
            render(){
            	console.log(this.props)
              return (
                <li>{this.props.text}<button id={this.props.id} onClick={this.handleDelete}/></li>
              );
            }
}





ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
