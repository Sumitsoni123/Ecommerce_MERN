import React, { useState, useEffect } from 'react'

const Radiobox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0);
    const handleChange = (e) => {
        handleFilters(e.target.value);
        setValue(e.target.value);
    };

    return prices.map((p, i) => (
        <div key={i}>
            <input onChange={handleChange} name={p} value={`${p.id}`} type="radio" className="ml-4 mr-2" />
            <label className="form-check-label">{p.name}</label>
        </div>
    ));
};

export default Radiobox;