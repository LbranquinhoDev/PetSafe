import { useState,useEffect, use } from "react";

export const useLocaldb = (tablename) => {
    const [ data,setData ] = useState([]);
}

useEffect(() => {
    const storedData = localStorage.getItem(tablename);
    if (storedData) {
        setData(JSON.parse(storedData));
    }
}, [tablename]);

const addItem = (item) => {
    const newItem = {
        id: Date.now(),
        ...item,
        createdAt: new Date().toISOString()
    };
    const updatedData = [id, uptades];
        const newData = data.map(item => item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString } : item);
    setData(updatedData);
    localStorage.setItem(tablename, JSON.stringify(updatedData));
    return newItem;
}

const deleteItem = (id) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
    localStorage.setItem(tablename, JSON.stringify(updatedData));
}

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

 