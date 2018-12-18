import React, {Component} from 'react'
import PropTypes from 'prop-types'

class BookHandler extends Component {
   
    /**
     * @PropTypes
     * @Props: book, books, onChangeShelf
    */
    PropTypes = {
        book: PropTypes.array.isRequired,
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
    }

    render(){
        const { book, books, onChangeShelf } = this.props
        
        //defining 'move' as a default shelf so that I can omit this option on books that aren't on a shelf
        //If I define as 'none' these books will assume the "currentlyReading" as a default shelf and user 
        //will be unable to select the currentReading rigth away.
        let currentShelf = 'none'

        for ( let [ , value] of Object.entries(books) ){
            //console.log(value.id)
            if ( value.id === book.id ){
                //console.log('on shelf', value.shelf)
                currentShelf = value.shelf
            }  
        }

        return(
            <div key={book.id}>
                <div className='book-shelf-changer' >
                <div className='menu-list'>
                    <select className='menu-list-items' defaultValue={currentShelf} onChange={ event => onChangeShelf( book, event.target.value )}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading" >Currently Reading</option>
                        <option value="wantToRead"  >Want to Read</option>
                        <option value="read"  >Read</option>
                        <option value="none"  >None</option> 
                        {/* 
                            // if the book is not on shelf then the 'remove' option should be omitted
                            //current value should be initialized with "move" to work, and the line above (with None) should be removed
                            currentShelf !== "move" &&
                            <option value="none"  >None</option> 
                        */}
                    </select>
                    {
                        //loging books values to ensure that it has only books that are already in a shelf
                        //console.log(books)
                    }
                </div>
            </div>
        </div>
        )

    }

}

export default BookHandler