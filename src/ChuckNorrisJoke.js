import React, { useState, useEffect } from "react";
import axios from "axios";

const ChuckNorrisJoke = () => {
  const [joke, setJoke] = useState("");
  const [favourites, setFavourites] = useState([]);
  const getJoke = () => {
    axios
      .get("https://api.chucknorris.io/jokes/random")
      .then((response) => {
        setJoke(response.data.value);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getJoke();
  }, []);

  useEffect(() => {
    (async () => await Load())();
  }, []);
  async function Load() {
    const result = await axios.get("https://localhost:7244/api/FavouriteJokes");
    setFavourites(result.data);
    console.log(result.data);
  }
  async function save(event) {
    event.preventDefault();
    try{
      await axios.post("https://localhost:7244/api/FavouriteJokes/LikeJoke", {
      theJoke: joke,
      likedOn: Date.now()    
    });
    alert("Joke Like");  
    Load();
    }catch (err) {
      alert(err);
    }
  }
  async function DeleteJoke(id){
    await axios.delete("https://localhost:7244/api/FavouriteJokes/" + id);
    alert("Joke Deleted");
    setJoke("");
    Load();
  }



  return (
    <div class="container">
        <div class="row">
            <div class="col-lg-6 mx-auto">
                <header class="text-center pb-5">
                    <h1 class="h2">Chuck Norris Joke Generator</h1>
                    <p>"Chuck Norris jokes" are a popular type of humor that involves making exaggerated and humorous claims about the toughness and invincibility of the American actor and martial artist Chuck Norris.</p>
                </header>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6 mx-auto">          
                <blockquote class="blockquote blockquote-custom bg-white p-5 shadow rounded">
                    <div class="blockquote-custom-icon bg-danger shadow-sm"><button onClick={save}><i class="fa fa-heart text-white fa-lg"></i></button></div>
                    <p class="mb-0 mt-2 font-italic">{joke}</p>
                    <footer class="blockquote-footer pt-4 mt-4 border-top">
                      <button class="btn btn-primary" onClick={getJoke}>Chuck Norris can...</button>
                    </footer>
                </blockquote>
            </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div class="section-title">
          <h2>Favourite Jokes</h2>
        </div>
        <div class="row">
          <ul class="notes">  
            {favourites.map(function fn(Fav){
              return(
              <li>
                <div class="rotate-1 lazur-bg">
                  <small>{Fav.LikedOn}</small>
                  <h4>Chuck Norris Joke</h4>
                  <p>{Fav.TheJoke}</p>
                  <a href="#" onClick={() => DeleteJoke(Fav.Id)} class="text-danger pull-right"><i class="fa fa-trash-o"></i></a>
                </div>
              </li>
              );
            })}
          </ul>
        </div>


    </div>
  );
};

export default ChuckNorrisJoke;

