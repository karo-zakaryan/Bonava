import React, { useState, useEffect } from 'react'
import { Col } from "react-bootstrap";
import Sortable from 'react-sortablejs';
import Element from '../../presentational/Element/Element';

const Elements = ({ data }) => {
    const [items, setItems] = useState([]);

    const elements = items.map(item => (
        <Element key={item.id} {...item} />
    ));

    useEffect(() => {
        setItems(data)
    }, [data]);

    return (
        <Col xs={12} md={12} className="top-item">
            <Sortable className="Laminate-content" onChange={(order, sortable, evt) => {
                const arr = order.map(ord => data.find(el => el.id === +ord))

                setItems(arr);
            }}>
                {elements}
            </Sortable>
        </Col>)
}

export default Elements;