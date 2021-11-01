import React, { useState, useEffect } from 'react';
import { getCategories, list } from './ApiCore';
import Card from './Card';
import Layout from './Layout'

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({ ...data, categories: data });
            }
        })
    };

    useEffect(() => {
        loadCategories();
    }, [])

    const searchData = () => {
        // console.log(search, category);
        if (search) {
            list({ search: search || undefined, category: category }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }
    };

    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false })
    };

    const SearchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange('category')}>
                            <option value="All">pick category</option>
                            {categories.map((c, i) => (<option key={i} value={c._id} >{c.name}</option>))}
                        </select>
                    </div>
                    <input type="search" className="form-control" placeholder="search by name" onChange={handleChange('search')} />
                </div>
                <div className="input-group-append" style={{ border: 'none' }}>
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    );

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`;
        }
        if (searched && results.length < 1) {
            return `No products found`;
        }
    };

    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2>
                <div className="row">
                    {results.map((product, i) => (
                        <Card key={i} product={product} />
                    ))}
                </div>
            </div>

        );
    }

    return (
        <div className="row mb-3">
            <div className="container">
                {SearchForm()}
            </div>
            <div className="container-fluid">
                {searchedProducts(results)}
            </div>
        </div>
    );
};

export default Search;