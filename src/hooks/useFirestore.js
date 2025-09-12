import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useFirestore = (collectionName, conditions = []) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q = collection(db, collectionName);
    
    if (conditions.length > 0) {
      q = query(q, ...conditions);
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDocuments(docs);
      setLoading(false);
    });

    return unsubscribe;
  }, [collectionName, conditions]);

  return { documents, loading };
};