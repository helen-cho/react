import React from 'react'
import BookModal from './BookModal';

const Book = ({book}) => {
    const {title, thumbnail, price, authors} = book;
    return (
        <tr>
            <td><img src={thumbnail ? thumbnail:"http://via.placeholder.com/170x250"} width={30}/></td>
            <td>{title}</td>
            <td>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td>{authors}</td>
            <td><BookModal book={book}/></td>
        </tr>    
    )
}

export default Book