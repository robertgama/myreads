import React , {Component} from 'react'
import Bookshelf from './Bookshelf'
import PropTypes from 'prop-types'

class Bookshelves extends Component {

    /**
     * @PropTypes
     * @Props: books, onChangeShelf
    */
    PropTypes = {
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
    }
    
    render(){
    
        const { books, onChangeShelf } = this.props

        return(
            <div>
                <div className='list-books'>
                    <div className='list-books-title'> 
                        <h1>MyReads</h1>
                    </div>
                    <div className='list-books-content'>
                        <Bookshelf books={books} onChangeShelf={onChangeShelf}/>
                    </div>
                </div>
            </div>
        )   
    }
}

export default Bookshelves