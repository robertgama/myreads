import React, {Component} from 'react'
import * as BooksAPI from './utils/BooksAPI'
import Bookshelves from './components/Bookshelves'
import {Link} from 'react-router-dom'
import {Route} from 'react-router-dom'
import './App.css'
import FindBooks from './components/FindBooks'
import PropTypes from 'prop-types'

class App extends Component {


    /**
     * @Props: books, moveToShelf
     */
    PropTypes={
        books: PropTypes.array.isRequired,
        moveToShelf: PropTypes.func.isRequired
    }

    /**
     * @state: books
     */
    state = {
        books: [],
    }
 
    
    componentDidMount(){
        this.books = BooksAPI.getAll().then( (books) => {
            this.setState({ books });
        });
    } 

    moveToShelf = ( targetBook, shelf ) => {
        BooksAPI.update( targetBook, shelf).then( data  => { 

            //gives the book a new shelf value
            targetBook.shelf = shelf
            
            //updating  books state
            this.setState( (prevState) => ({
                books: prevState.books
                
                //generate a new array with books which its id is different from the targetBook's id
                .filter(book => 
                    book.id !== targetBook.id)
                //update the array adding targetBook so that home page re-renders incluind it on its proper shelf
                .concat(targetBook)
                }) 
            )
        })
    }
      
    render(){
    
        const { books } = this.state

        return(
            <div>
                {<div>
                    <Route path='/' exact render={() => 
                        <div> 
                            <Bookshelves books={books} onChangeShelf={this.moveToShelf}/>
                            <div className="open-search">
                                <Link to='/findbooks'>
                                    <button />
                                </Link>
                            </div>
                        </div>
                    }/>

                    <Route path='/findbooks' render= { () => 
                        <FindBooks books={books} onChangeShelf={this.moveToShelf}/>
                    }/> 
                </div>}
            </div>
        )
    }
}

export default App;