import { useState, useEffect } from 'react';

//hook personalizzato con un tipo generico T. Questo mi permette di riutilizzare l'hook per fetch sia oggetti che array di oggetti
const useFetchArticles = <T extends {}>(url: string) => {
  const [data, setData] = useState<T | null>(null); // null perchè inizialmente, non ho dati
  const [loading, setLoading] = useState(true); // Comincio con lo stato di caricamento attivo
  const [error, setError] = useState<string | null>(null); // Nessun errore all'inizio

  // Utilizzo useEffect per effettuare la chiamata API non appena il componente viene montato o l'URL cambia
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Inizio il caricamento
      try {
        const response = await fetch(url); // Effettuo la chiamata 
        if (!response.ok) throw new Error(`Errore: ${response.status}`); // Se la risposta non torna ok, lancio un errore
        const data = await response.json(); // Estraggo i dati JSON dalla risposta
        setData(data); // Aggiorno lo stato
      } catch (error: any) {
        setError(error.toString()); // oppure in caso di errore, aggiorno lo stato dell'errore
      } finally {
        setLoading(false); // Termino il caricamento indipendentemente dall'esito della chiamata
      }
    };

    fetchData();
  }, [url]); 

  // Restituisco gli stati e la funzione per poterli come hook
  return { data, loading, error };
};

export default useFetchArticles;
