import { BehaviorSubject } from "rxjs";

export enum WatchStatus{
    Watched="ნანახი",
    NotWatched="მოგვიანებით სანახავი",
    Select="select status..."
}

export interface AddMovieBody{
    review:string;
    rating:number;
    status:WatchStatus;
    imdbID:string;
    uid:string;
    time:string ;
};

export interface MovieResult{
    Title:string;
    Actors:string;
    Director:string;
    Country:string;
    imdbRating:string;
    Plot:string;
    Poster:string;
    Runtime:string;
    imdbID:string;
}

export interface Movie{
    title:string;
    actors:string;
    director:string;
    country:string;
    imdbRating:string;
    plot:string;
    poster:string;
    runTime:string;
    imdbID:string;
    countrys:CountryResult[];
}

interface Flags{
    svg:string;
    png:string;
}

export interface CountryResult{
    population:number;
    flags:Flags;
}

export interface ListMovieBody{
    plot: string;
    poster: string;
    title: string;
    director:string;
    time:string;
    movieId:string;
    imdbRating:string;
    status:WatchStatus;
}

export type DetailsMovieBody= Movie & {
    review:string;
    rating:number;
    status:WatchStatus;
    time:string;
};

