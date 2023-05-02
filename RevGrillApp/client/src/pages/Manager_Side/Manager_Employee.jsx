import React, { Component } from 'react';
import './manager.css';
import { useEffect, useState } from 'react';
import JsonToMenu from './Display_Menu';

export default function Manager_Employee() {

    const [itemNum, setItemNum] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemCat, setItemCat] = useState('');
    const [itemIngs, setItemIngs] = useState('');
    const [menu, setMenu] = useState('No Data - Menu');

    const getMenu = () => {
      fetch("http://localhost:9000/server_side/get_menu")
        .then(r => r.text())
        .then(r => {
            setMenu(JsonToMenu("item_number", "item_name", "price", "category", "ingredients", "Item Number", "Item Name", "Price", "Category", "Ingredients", r))
        });  
    }

    useEffect(() => {
        getMenu()
    }, [])

    const numChange = (event) => {
        setItemNum(Number(event.target.value));
    };

    const nameChange = (event) => {
        setItemName(event.target.value);
    };

    const priceChange = (event) => {
        try {
            setItemPrice(parseFloat(event.target.value));
        } catch (error) {
            setItemPrice('')
        }
    };

    const catChange = (event) => {
        setItemCat(event.target.value);
    };

    const ingsChange = (event) => {
        setItemIngs(event.target.value);
    };

    const handleRemove = () => {
        if (itemNum != "") {
            let requestOptions = {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ item: itemNum })
            };
            fetch("http://localhost:9000/manager_side/remove_item", requestOptions);
        }
        else {
            window.alert("Please enter an item number to delete an item.")
        }

        // window.location.reload();
    };

    const handleAdd = () => {
        
        if (itemName == "" || itemPrice == "" || itemCat == "" || itemIngs == "") {
            window.alert("Please enter an item name, price, category, and ingredient list to add an item.")
        }
        else {  
            let requestOptions = {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                // body: JSON.stringify({ name: "Pumpkin Pie", price: 10.59, category: "Dessert", ingredients: "1 pumpkin, 10 sugar, 1 bread"})
                body: JSON.stringify({ name: itemName, price: itemPrice, category: itemCat, ingredients: itemIngs})
            };
            fetch("http://localhost:9000/manager_side/add_item", requestOptions);
        }
    }

    const handleEdit = () => {
        if (itemNum != "") {
            let requestOptions = {}
            if (itemPrice == "") {
                requestOptions = {
                    method: 'POST',
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                    // body: JSON.stringify({ item: itemNum, newName: "Vanilla Cake", newPrice: 10.11, newCategory: itemCat, newIngredients: itemIngs})
                    body: JSON.stringify({ item: itemNum, newName: itemName, newPrice: -1, newCategory: itemCat, newIngredients: itemIngs})
                };               
            }
            else {
                requestOptions = {
                    method: 'POST',
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                    // body: JSON.stringify({ item: itemNum, newName: "Vanilla Cake", newPrice: 10.11, newCategory: itemCat, newIngredients: itemIngs})
                    body: JSON.stringify({ item: itemNum, newName: itemName, newPrice: itemPrice, newCategory: itemCat, newIngredients: itemIngs})
                };
            }
            fetch("http://localhost:9000/manager_side/edit_item", requestOptions);
        }
        else {
            window.alert("Please enter an item name or number to edit an item.")
        }
    }

    return(
        <div>
        <body>
            <div className="header">
                <ul className="nav nav-ls">
                    <div className="nav-home">
                        <li><a className="nav-link link-home" href="">Rev's Grill</a></li>
                    </div>
                    <div className="nav-item">
                        <li><a className="nav-link" href="Manager_Inventory.html">Inventory</a></li>
                    </div>
                    <div className="nav-item">
                        <li><a className="nav-link nav-curr" href="Manager_Employee.html">Menu</a></li>
                    </div>
                    <div className="nav-item">
                        <li><a className="nav-link" href="Manager_Sales.html">Sales</a></li>
                    </div>
                </ul>
            </div>
        
            <div className="ms-grid">
                <div className="m-form">
                    <h2>Update Menu</h2>
                    <form>
                        <table>
                            <tr>
                                <td><label for="item_num">Item number:</label></td>
                                <td><input type="number" id="item_num" name="item_num" onChange={numChange} placeholder="to edit/remove"/></td>
                            </tr>
                            <tr>
                                <td><label for="item_name">Item name:</label></td>
                                <td><input type="text" id="item_name" name="item_name" onChange={nameChange}/></td>
                            </tr>
                            <tr>
                                <td><label for="item_price">Item price:</label></td>
                                <td><input type="number" step="0.01" id="item_price" name="item_price" onChange={priceChange}/></td>
                            </tr>
                            <tr>
                                <td><label for="item_category">Item category:</label></td>
                                <td><input type="text" id="item_category" name="item_category" onChange={catChange}/></td>
                            </tr>
                            <tr>
                                <td><label for="ing_list">Ingredient list:</label></td>
                                <td><input type="text" id="ing_list" name="ing_list" onChange={ingsChange} placeholder="<# Ingredient, # Ingredient, ...>"/></td>
                            </tr>
                        </table>
                        <div className="button-div">
                            <button onClick = { handleAdd }>Add Item</button>
                            <button onClick = { handleEdit }>Edit Item</button>
                            <button onClick = { handleRemove }>Remove Item</button>
                        </div>
                    </form>
                </div>
                <div className="ms-display">
                    <h2>Display Menu</h2>
                    <p> { menu } </p>
                </div>
            </div>
        </body>
        <footer>
            Made with 🤍 by CSCE 315 Team 51
        </footer>
        
        
        </div>        
    
    )

}

