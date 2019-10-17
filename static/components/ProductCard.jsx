import React from 'react'

import '../style/theme.css'

/**
 * @author
 * Nathan Romriell - 10/16/2019
 *
 * @info
 * Functional Component - ProductCard
 *
 * @description
 * Render only component for displaying a product row
 *
 * @props
 * url                    - Link to product page
 * image                  - Object containing image information requires "href" attribute
 * name                   - Product name
 * price                  - Product price
 * description            - Product description
 *
 */
const ProductCard = (props) => {
    return (
    <a className="Card" href={props.url}>
        <div style={{backgroundImage:"url("+((props.image !== undefined && props.image !== null) ? props.image.href : "")+")"}} className="CardImage"/>
        <div className="CardTitle">{props.name}</div>
        <div className="CardPrice">{props.price}</div>
        <div className="CardDescription">{props.description}</div>
    </a>
    );
};

export default ProductCard;