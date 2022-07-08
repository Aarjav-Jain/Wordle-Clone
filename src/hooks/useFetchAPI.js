import { useState, useEffect } from "react";
import axios from "axios";

const useFetchAPI = (url) => {
  const [randomWord, setRandomWord] = useState("");
  const [allWords, setAllWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    axios
      .all([
        axios.get("https://random-word-api.herokuapp.com/word?length=5", {
          signal: signal,
        }),
        axios.get("https://random-word-api.herokuapp.com/all", {
          signal: signal,
        }),
      ])
      .then((res) => {
        setRandomWord(...res[0].data);
        setAllWords(res[1].data.filter((data) => data.length === 5));
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          setError(err.message);
        }
      });

    return () => controller.abort();
  }, []);

  return { randomWord, allWords, error, loading };
};

export default useFetchAPI;
