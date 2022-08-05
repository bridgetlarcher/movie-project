import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState, Suspense, useEffect } from 'react'

export interface MovieResult {
  Title: string;
  Poster: string;
  Year: string;
  imdbID: string;
  favorite: boolean;
}

const Home: NextPage<{ initialData: any }> = ({ initialData }) => {
  const [inputValue, setInputValue] = useState<string>('')
  let [searchData, setSearchData] = useState<Array<MovieResult>>([])
  const [hasSearched, setHasSearched] = useState<boolean>(false);


  function handleSearch() {
    // If we're searching from the home page without an input value,
    // just search for Star Wars since there's no initial value search
    const searchValue = inputValue !== '' ? inputValue : 'star wars'
    fetch('/api/search?title=' + searchValue)
      .then(results => results.json())
      .then(response => {
        if (response.status === "500") {
          setSearchData([]);
        } else {
          setSearchData(response.data);
        }
        setHasSearched(true);
      })
  }

  function handleFavorite(imdbID: string, toggleFavoriteFrom: boolean) {
    fetch('/api/favorites?omdb_id=' + imdbID + "&favorite=" + !toggleFavoriteFrom)
      .then(results => results.json())
      .then(response => {
        handleSearch(); // Get all results again
      })
  }

  function MovieList() {
    if (hasSearched === false) {
      searchData = initialData
    }
    if (searchData.length > 0) {
      return <>{
        searchData.map(function (result: MovieResult) {
          return (
            <div className="w-1/4 p-4" key={result.Title}>
              <div style={{ position: "relative", width: "100%", height: "300px" }}>
                <Image
                  src={result.Poster !== 'N/A' ? result.Poster : '/broken-img.png'} // Obviously this won't work in a real world scenario... ;)
                  layout="fill"
                  objectFit="contain"
                ></Image>
                <div className="absolute top-2 right-10">
                  <Image
                    src={`/heart-favorite-` + result.favorite + `.svg`}
                    width={30}
                    height={30}
                    onClick={() => handleFavorite(result.imdbID, result.favorite)}
                  ></Image>
                </div>
              </div>
              <div className="flex justify-center font-medium my-2 text-center">
                {result.Title}
              </div>
            </div>
          )
        })
      }</>

    } else {
      return <div className="flex p-4 text-center text-red-500 font-medium">No movies found!</div>
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-slate-100">
      <Head>
        <title>Movie Search</title>
      </Head>

      <main className="flex w-full flex-1 flex-col items-center p-20 align-top">
        <h1 className="text-5xl uppercase my-6">
          Movie Search
        </h1>
        <div className="relative w-3/5">
          <input type="search" onChange={(e) => setInputValue(e.target.value)} id="search-dropdown" className="block drop-shadow-xl p-4 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-full border-l-2 border border-gray-300 focus:ring-red-500 focus:border-red-500" placeholder="Search for a movie..." required></input>
          <button type="submit" onClick={handleSearch} className="absolute drop-shadow-xl top-0 right-0 p-4 text-sm text-white bg-red-500 rounded-r-full border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 uppercase">
            Search
          </button>
        </div>
        <div className="flex flex-row flex-wrap w-3/4 justify-center">
          <Suspense fallback={`Loading movies...`}><MovieList /></Suspense>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return axios.get('https://th-recruiting-moviesapi.herokuapp.com/search?title=star%20wars')
    .then(response => {
      return {
        props: {
          initialData: response.data
        }
      };
    });
}

export default Home
