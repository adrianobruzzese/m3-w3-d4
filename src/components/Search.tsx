import React, { useState } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useFetchArticles from '../hooks/useFetchArticles';


// Interface per tipizzare i dati delle notizie
interface NewsItem {
    id: number;
    title: string;
    published_at: string;
    summary: string;
  }
  
  // Definisco SearchComponent con uso di React.FC per tipizzare il componente 
  const SearchComponent: React.FC = () => {
    //  useState per gestire la ricerca
    const [searchTerm, setSearchTerm] = useState('');
    // introduzione dell'hook per ottenere le notizie, lo stato di caricamento e gli errori
    const { data: news, loading, error } = useFetchArticles<NewsItem[]>(`https://api.spaceflightnewsapi.net/v3/articles`);
  
    // Funzione per aggiornare il termine di ricerca ogni volta che l'utente modifica l'input
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };
  
    // Filtro le notizie in base al termine di ricerca inserito
    const filteredNews = news ? news.filter(newsItem =>
      newsItem.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];
  
    // Rendering
    return (
      <Container className="text-start mt-4">
        <Row>
          <Col xs={12}>
            {/* Campo di input */}
            <Form.Control
              type="text"
              placeholder="Cerca notizie"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
        </Row>
        {/* Mostro un messaggio di caricamento o errore */}
        {loading && <p>Caricamento...</p>}
        {error && <p>Errore: {error}</p>}
        {/* Mappo le notizie filtrate per visualizzarle all'utente */}
        {filteredNews.map((newsItem) => (
          <Link key={newsItem.id} to={`/${newsItem.id}`} className="text-decoration-none">
            <div className="my-3 p-2 border rounded bg-light">
              <h3>{newsItem.title}</h3>
              <p>{newsItem.summary}</p>
            </div>
          </Link>
        ))}
      </Container>
    );
  };

export default SearchComponent;


