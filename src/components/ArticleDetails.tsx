import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import useFetchArticles from '../hooks/useFetchArticles';

// Definisco un'interfaccia per tipizzare i dati dell'articolo dovrei ricevere
interface Article {
  title: string;
  published_at: string;
  image_url: string;
  summary: string;
  url: string;
}

// Definisco il componente ArticleDetail come una funzione che restituisce un JSX
const ArticleDetail: React.FC = () => {
  // Estraggo il parametro 'singleNew' dall'URL usando il hook useParams
  const { singleNew } = useParams<{ singleNew: string }>();
  // Utilizzo l'hook personalizzato per fetchare i dati dell'articolo specifico, passando l'URL con il parametro
  const { data: article, loading, error } = useFetchArticles<Article>(`https://api.spaceflightnewsapi.net/v3/articles/${singleNew}`);

  // Gestisco gli stati della chiamata: caricamento, errore e visualizzazione data
  if (loading) return <Container><p>Caricamento...</p></Container>;
  if (error) return <Container><p>Errore: {error}</p></Container>;
  if (!article) return <Container><p>Articolo non trovato!</p></Container>;

  // Se la chiamata va, mostro i dettagli dell'articolo
  return (
    <Container className="text-center mt-4">
      <Row>
        <Col xs={12} md={8} className="offset-md-2">
          <h1>{article.title}</h1> {/* Titolo dell'articolo */}
          <p>{article.published_at}</p> {/* Data di pubblicazione */}
          <img src={article.image_url} alt="Article" className="img-fluid rounded-4" /> {/* Immagine dell'articolo */}
          <p>{article.summary}</p> {/* Sommario dell'articolo */}
          <Button variant="primary" href={article.url} target="_blank">Leggi di più</Button> {/* Link per leggere l'articolo completo */}
        </Col>
      </Row>
    </Container>
  );
};

export default ArticleDetail;
