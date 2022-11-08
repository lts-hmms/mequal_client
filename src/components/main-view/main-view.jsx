import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
        constructor() {
                // 'registers' class MainView as a React Component
                super();
                // initializing state with starting values
                this.state = {
                        movies: [
                                {
                                        _id: 1,
                                        Title: 'Black Panther',
                                        Description:
                                                "After the death of his father, T'Challa returns home to the African nation of Wakanda to take his rightful place as king. When a powerful enemy suddenly reappears, T'Challa's mettle as king - and as Black Panther - gets tested when he's drawn into a conflict that puts the fate of Wakanda and the entire world at risk. Faced with treachery and danger, the young king must rally his allies and release the full power of Black Panther to defeat his foes and secure the safety of his people.",
                                        ImagePath: 'https://resizing.flixster.com/IaXbRF4gIPh9jireK_4VCPNfdKc=/200x0/v2/https://resizing.flixster.com/KBlur3LaA-y1U1yt6_Y2uO25ozA=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzMxOGI1YzBhLWMyMjEtNGUxMS1iM2Q0LWQ4OGMyYzQyZjQyYS53ZWJw',
                                },
                                {
                                        _id: 2,
                                        Title: 'The Big Sick',
                                        Description:
                                                'Kumail is a Pakistani comic, who meets an American graduate student named Emily at one of his stand-up shows. As their relationship blossoms, he soon becomes worried about what his traditional Muslim parents will think of her. When Emily suddenly comes down with an illness that leaves her in a coma, Kumail finds himself developing a bond with her deeply concerned mother and father.',
                                        ImagePath: 'https://resizing.flixster.com/IaXbRF4gIPh9jireK_4VCPNfdKc=/200x0/v2/https://resizing.flixster.com/hcSU__fyxWKySypL-9PjigD5Vc0=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2MzMjVhNWUxLWRmOGMtNGFiNS1hMTg2LTUxMTdmYjFkNjJkZi53ZWJw',
                                },
                                {
                                        _id: 3,
                                        Title: 'Get Out',
                                        Description:
                                                "Now that Chris and his girlfriend Rose have reached the meet-the-parents milestone of dating, she invites him for a weekend getaway with Missy and Dean. At first, Chris reads the family's overly accommodating behavior as nervous attempts to deal with their daughter's interracial relationship, but as the weekend progresses, a series of increasingly disturbing discoveries leads him to a truth that he never could have imagined.",
                                        ImagePath: 'https://resizing.flixster.com/IaXbRF4gIPh9jireK_4VCPNfdKc=/200x0/v2/https://resizing.flixster.com/6bGQjhmuW9IZuzfpCKoO5FgdkYc=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzNiZGVhNTVmLWQzOGUtNGMwZC1hYmZjLTIxZWE5NThkMTdjNS53ZWJw',
                                },
                        ],
                        selectedMovie: null,
                };
        }

        setSelectedMovie(newSelectedMovie) {
                this.setState({ selectedMovie: newSelectedMovie });
        }

        render() {
                const { movies, selectedMovie } = this.state;
                if (movies.length === 0) return <div className="main-view">The list is empty</div>;

                return (
                        <div className="main-view">
                                {selectedMovie ? (
                                        <MovieView
                                                movie={selectedMovie}
                                                onBackClick={(newSelectedMovie) => {
                                                        this.setSelectedMovie(newSelectedMovie);
                                                }}
                                        />
                                ) : (
                                        movies.map((movie) => (
                                                <MovieCard
                                                        key={movie._id}
                                                        movieData={movie}
                                                        onMovieClick={(movie) => {
                                                                this.setSelectedMovie(movie);
                                                        }}
                                                />
                                        ))
                                )}
                        </div>
                );
        }
}

export default MainView;
