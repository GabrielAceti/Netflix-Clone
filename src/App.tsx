import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRow from './components/MovieRow/Index'
import FeaturedMovie from "./components/FeaturedMovie/Index";
import './App.css'
import Header from './components/Header/Index'

export default () => {
  const [movieList, setMovieList] = useState<any[]>([]);
  const [featuredData, setFeaturedData] = useState<any>(null);
  const [blackHeader, setBlackHeader] = useState<boolean>(false)

  useEffect(() => {
    const loadAll = async () => {
      //Getting total list from tmdb
      let list = await Tmdb.getHomeList();
      setMovieList(list)

      //Getting Featured
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 30) {
        setBlackHeader(true);
      }
      else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }

  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />
      {
        featuredData && <FeaturedMovie item={featuredData} />
      }
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        All Credits to Netflix<br />
        Data from Themoviedb.org
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando" />
        </div>
      }
      
    </div>
  )
}