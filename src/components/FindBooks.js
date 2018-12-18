import React, {Component} from 'react'
import * as BooksAPI from '../utils/BooksAPI'
import {Link} from 'react-router-dom'
import Books from './Books';
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class FindBooks extends Component{

    /**
     * @PropTypes
     * @Props: books, booksToAdd, onChangeShelf
    */
    PropTypes = {
        books: PropTypes.array.isRequired,
        booksToAdd: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
    }

    //@state
    state = {
        query:'',
        booksToAdd:[],
        showResult: false
    }

    /**
     * @func: searchBooks
     * @param: event
    */
    searchBooks = event => {
        const query = event.target.value
        this.setState ({query})
        
        //if query was updated
        //if(query) {
        if (query.trim().length > 0) {

            //showResult must only be true if query is not empty
            this.setState({showResult: true})

            BooksAPI.search(query).then( books => {
                //cheking if 'books' returns any entry
                //console.log(books.length)
                if ( books.length > 0 ) {
                    this.setState({ booksToAdd: books })
                    
                } else {
                    //booksToAdd state must be reseted
                    this.setState({ booksToAdd: [] })
                }
            })
        } else {
            //just loging to check if '.trim().lenth > 0' works :)
            //console.log('query is empty')
            
            //if query is empty, then booksToAdd must be reseted to re-render the component with no books
            this.setState({booksToAdd: []})
            this.setState({showResult: false})
        }
    }
    
    render(){

        const {onChangeShelf, books} = this.props
        const { booksToAdd, showResult } = this.state
        
        booksToAdd.sort(sortBy('title'))

        return(
            <div>
                <div className='search-books'>
                    <div className='search-books-bar'>
                        <Link className = 'close-search' to='/' > 
                            Close
                        </Link>
                        <div className = 'search-books-input-wrapper'>
                            <input  type = 'text'
                                    placeholder= 'Whant new books to your shelves?'
                                    value= { this.state.query }
                                    onChange= { this.searchBooks }
                                    autoFocus = { true }
                            />
                        </div>
                    </div>
                    { 
                    //the search books results must only be displayed if query is not empty
                    showResult &&
                        <div className='search-books-results'>
                            <h3>{`Search has returned ${booksToAdd.length} books`}</h3>
                                <ol className="books-grid">
                                    { booksToAdd.map( book => 
                                        <div key={book.id}>
                                            <Books  book={book} books={books} key={book.id} onChangeShelf={onChangeShelf}
                                        />
                                        </div>    
                                    )}
                                </ol>
                        </div>
                    }
                </div>
            </div>
        )   
    }
}


export default FindBooks