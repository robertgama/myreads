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
    }

    updateQuery = (query) => {
        this.setState({query: query.trim()})
    }

    /**
     * @func: searchBooks
     * @param: event
    */
    searchBooks = event => {
        const query = event.target.value
        this.setState ({query})

        if(query) {
            BooksAPI.search(query.trim()).then( books => {
                //cheking if 'books' returns any entry
                //console.log(books)
                if ( books.length > 0 ) {
                    
                    this.setState({ booksToAdd: books })    
                   
                } else {
                    this.setState({booksToAdd: []})
                }
            })
        }
    }

    render(){

        const {onChangeShelf, books} = this.props
        const { booksToAdd} = this.state
        
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
                    booksToAdd.length > 0 &&
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