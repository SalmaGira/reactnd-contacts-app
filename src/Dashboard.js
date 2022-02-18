import React, { Component } from "react";
// import MovieCard from "./MovieCard";

class MovieCardsList extends Component {
  render() {
    const { profiles, users, movies, usersByMovie } = this.props;

    return (
      <ul>
        {Object.keys(movies).map((movieId) => {
          const usersForMovie = usersByMovie[movieId];
          const usersNames = usersForMovie
            ? usersForMovie.map(
                (singleUser) => `<li>${users[singleUser].name}</li>`
              )
            : `<p>No followers for this movie.</p>`;
          return `<h2>${
            movies[movieId].name
          }</h2><h3>liked by:</h3>${usersNames}`;
        })}
      </ul>
    );
  }
}

export default MovieCardsList;
