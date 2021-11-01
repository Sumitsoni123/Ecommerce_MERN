import React, { useState, useEffect } from 'react'

const Checkbox = ({ categories, handleFilters }) => {

    const [checked, setChecked] = useState([]);
    const handleToggle = c => () => {
        const currentCatId = checked.indexOf(c);
        const newCheckedCatId = [...checked];
        if (currentCatId === -1) {
            newCheckedCatId.push(c);
        } else {
            newCheckedCatId.splice(currentCatId, 1);
        }
        //console.log(newCheckedCatId);
        setChecked(newCheckedCatId);
        handleFilters(newCheckedCatId);
    }

    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type="checkbox" className="form-check-input" />
            <label className="form-check-label">{c.name}</label>
        </li>
    ));
};

export default Checkbox;