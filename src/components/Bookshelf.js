import React , {Component} from 'react'
import Books from './Books'
import PropTypes from 'prop-types'

class Bookshelf extends Component {

    /**
     * @PropTypes
     * @Props: books, onChangeShelf
    */
    PropTypes = {
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
    }
        
    render(){

        let shelfLable = [
            {shelf: 'currentlyReading', lable: 'Currently Reading' },
            {shelf: 'wantToRead', lable: 'Want to Read' },
            {shelf: 'read', lable: 'Already Read' }
        ]

        const { books, onChangeShelf } =  this.props
        
        return (
            <div>
                {shelfLable.map ( (shelf, index) => 
                    <div className="bookshelf" key={index}>
                        <div>
                            <h2 className="bookshelf-title"> {shelf.lable} </h2>   
                            <div className="bookshelf-books"> 
                                <ol className='books-grid'>
                                    {books
                                        .filter( (book) => book.shelf === shelf.shelf)
                                        .map( (book) => 
                                            <div key={book.id}>
                                                <Books 
                                                    books={books}
                                                    book={book}
                                                    key={book.id}
                                                    onChangeShelf={onChangeShelf} 
                                                />
                                            </div>
                                    )}
                                </ol>
                            </div>
                        </div>
                    </div>)}
            </div>
        )
    }
}

export default Bookshelf    