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
    id: ++x,
    text: text
  }

}

//reducer

function todo(state={id:0,text:"",completed:false}, action) {
     console.log("reducer Called")
     console.log(action)

  switch (action.type) {
    case 'ADD_TODO':
      
      console.log(Object.assign({},state,{
        id: action.id,
        text: action.text,
        completed: false
      }) !== state)

      return Object.assign({},state,{
        id: action.id,
        text: action.text,
        completed: false
      })
    default:
      return state
  }
}




//component App

class App extends Component {
  onHandleSubmit(text){
    console.log('OnHandleSubmit Called')
    store.dispatch(addTodo(text))
    store.
  }
  render() {
  	console.log(this.props)
    return (
      <div>
      <h1>Hello, world.</h1>
      <TodoForm onHandleSubmit={this.onHandleSubmit}/>
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

//connect(mapStateToProps)(App)
const ConnectedApp = connect(mapStateToProps)(App);

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
                    return (
						<div>
						      <form onSubmit={e => {
						        e.preventDefault()
						        if (!input.value.trim()) {
						          return
						        }
						        console.log(input.value)
						        this.props.onHandleSubmit(input.value)
                    //store.dispatch(addTodo(input.value))
						        //input.value = ''
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
              return (
                <li>{this.props.text}<button id={this.props.id} onClick={this.handleDelete}/></li>
              );
            }
}





ReactDOM.render(<Provider store={store}><ConnectedApp /></Provider>, document.getElementById('root'));
