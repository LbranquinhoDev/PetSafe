// src/hooks/useLocaldb.js - DEVE CONTER APENAS ISSO:
import { useState, useEffect } from "react";

export const useLocaldb = (tableName) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem(tableName);
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, [tableName]);

    const addItem = (item) => {
        const newItem = {
            id: Date.now(),
            ...item,
            createdAt: new Date().toISOString()
        };
        
        const newData = [...data, newItem];
        setData(newData);
        localStorage.setItem(tableName, JSON.stringify(newData));
        return newItem;
    };

    const updateItem = (id, updates) => {
        const newData = data.map(item => 
            item.id === id 
                ? { ...item, ...updates, updatedAt: new Date().toISOString() } 
                : item
        );
        setData(newData);
        localStorage.setItem(tableName, JSON.stringify(newData));
    };

    const deleteItem = (id) => {
        const newData = data.filter(item => item.id !== id);
        setData(newData);
        localStorage.setItem(tableName, JSON.stringify(newData));
    };

    const getItem = (id) => {
        return data.find(item => item.id === id);
    };

    return {
        data,
        addItem,
        updateItem,
        deleteItem,
        getItem
    };
};