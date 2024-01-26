import axios from 'axios';
import {useState, useEffect} from 'react';

const Home = () => {
    const [user, setUser] = useState(null);
    const [articles, setArticles] = useState([]);
  
    useEffect(() => {
      // Fonction pour récupérer les articles du lien fournit 
      const fetchArticles = async () => {
        try {
          const response = await axios.get('/api/users/articles', { withCredentials: true });
          setArticles(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des articles:', error.message);
        }
      };
      fetchArticles();
    }, []);

    








    
}  

