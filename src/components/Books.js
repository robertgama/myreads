import React , {Component} from 'react'
import PropTypes from 'prop-types'
import BookHandler from './BookHandler';

class Books extends Component {

    /**
     * @PropTypes
     * @Props: book, books, onChangeShelf
    */
    PropTypes = {
        book: PropTypes.array.isRequired,
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
    }
    
    render() {

        const { book , onChangeShelf} = this.props  //book from bookshelf
        const {books} = this.props //books from Findbooks

        //defines a default image for books that don't heve a cover
        const bookCover = book.imageLinks ? book.imageLinks.thumbnail : 'http://i.imgur.com/sJ3CT4V.gif'
        
        return(
            <li>
                <div className='book'>
                    <div className='book-top'>
                    
                        <div className='book-cover' style= {{
                            backgroundImage: `url(${bookCover})`
                        }}/>
                        <BookHandler book={book} books={books} onChangeShelf={onChangeShelf}/>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        )
    }
}

export default Books
